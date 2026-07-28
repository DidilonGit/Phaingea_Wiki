# 05 · Roles y permisos

> **Nota (prototipo):** el rol **`admin`** es un alias de **`owner`** (mismos permisos globales). En código lo tratan igual los helpers `esOwner` / `esMasterOOwner` de `src/stores/user.js`.

## Los cuatro roles

| Rol | Alcance | Puede |
|-----|---------|-------|
| **Invitado** | Solo lo que se le comparte | Ver contenido autorizado. No participa ni tiene personaje. |
| **Jugador** | Una o varias campañas | Participar, tener 1 personaje activo por campaña, comentar, proponer contenido, recibir XP, ver notificaciones. Puede existir sin campaña activa. |
| **Máster** | Solo sus campañas | Gestionar contenido, sesiones, XP, aprobar propuestas, gestionar personajes, moderar comentarios, gestionar permisos **de su campaña**. |
| **Owner** | Global | Todo lo del máster en todas las campañas + crear/eliminar campañas, asignar másteres, gestionar usuarios, config global, logs, orden del dial, administrar Base de Phaingea. |

> El rol se evalúa en **dos niveles**: global (`users.role`, básicamente owner vs. el resto) y **por campaña** (`memberships.roleInCampaign` + `permissions`). Tener acceso visual a una campaña **no** implica participar en ella.

## Matriz de permisos (resumen)

| Acción | Invitado | Jugador | Máster (su campaña) | Owner |
|--------|:---:|:---:|:---:|:---:|
| Ver categoría (si tiene permiso) | ◦ | ✅ | ✅ | ✅ |
| Comentar | — | ✅ | ✅ | ✅ |
| Proponer imagen | — | ✅ (máx 5 pend.) | ✅ | ✅ |
| Subir imagen directa | — | — | ✅ | ✅ |
| Crear/editar sesión | — | — | ✅ | ✅ |
| Asignar XP | — | — | ✅ | ✅ |
| Aprobar propuestas | — | — | ✅ | ✅ |
| Gestionar personajes (estado) | — | propio (limitado) | ✅ | ✅ |
| Moderar comentarios | — | propio | ✅ | ✅ |
| Gestionar permisos | — | — | ✅ (su campaña) | ✅ |
| Crear/eliminar campaña | — | — | — | ✅ |
| Asignar másteres | — | — | — | ✅ |
| Config global / orden dial / Base | — | — | — | ✅ |

`◦` = solo si tiene el permiso de visibilidad concreto sobre esa categoría.

## Reglas de negocio importantes

- **1 personaje activo por campaña.** Para crear otro, el anterior debe estar `deceased` o `delegated` (lo marca el máster). No se sobrescriben (son recuerdo de la campaña).
- **Comentarios:** aprobación configurable por categoría. El autor edita el suyo; máster/owner editan y borran (borrado con **doble confirmación**). Reacciones con emoji, sin respuestas anidadas.
- **Propuestas de imagen:** máx. 5 pendientes por jugador; deja de contar al aprobar/denegar.
- **Privacidad de personaje:** el jugador puede ocultarlo (barras negras / máscara común); máster y owner siguen viéndolo completo.
- **XP:** el jugador nunca modifica su XP. La manual exige motivo; la de sesión usa el título de la sesión como motivo automático.
- **Moderación:** botón contextual oculto para quien no tiene permiso; solo administra el elemento abierto.
- **Bookmarks bloqueados:** si no tienes acceso a una categoría, el bookmark aparece en gris y no interactuable. Moderación solo visible para máster/owner.
- **Acciones destructivas:** doble confirmación (eliminar campaña, borrar comentario, etc.).

## Seguridad real (Security Rules)

La UI oculta cosas por comodidad, pero **la barrera de verdad son las reglas del servidor**. Principios:

1. **Nadie escribe su propio rol/XP.** `users.role`, `xpGeneral`, etc. solo modificables por owner/máster según corresponda.
2. **Lectura por membership:** para leer datos de una campaña, el usuario debe tener `memberships/{campaignId}/{uid}` con el permiso adecuado.
3. **Escritura por rol en campaña:** crear sesión / asignar XP → solo `roleInCampaign == master` de esa campaña u `owner`.
4. **Owner global:** un check de `users/{uid}.role == 'owner'` habilita todo.
5. **Validación de forma:** las reglas validan que los campos escritos son los permitidos (que un jugador no se cuele subiendo `role: owner`).

Las reglas se escriben en **`database.rules.json`** (Realtime Database), se versionan en el repo y se despliegan con Firebase CLI. Se detallan y prueban en la **fase 3** del roadmap. Ejemplo de intención (reglas RTDB):

```json
{
  "rules": {
    "sessions": {
      "$cid": {
        ".read":  "root.child('memberships/'+$cid+'/'+auth.uid).exists()",
        ".write": "root.child('users/'+auth.uid+'/role').val() === 'owner' || root.child('memberships/'+$cid+'/'+auth.uid+'/roleInCampaign').val() === 'master'",
        "$sid": { ".indexOn": ["number"] }
      }
    }
  }
}
```

Claves del enfoque en RTDB:
- **Validación de forma con `.validate`** para impedir que un jugador escriba campos prohibidos (p. ej. subirse el rol o la XP).
- **`newData`** para comprobar lo que se intenta escribir; **`root.child(...)`** para leer roles/memberships.
- Owner global: `root.child('users/'+auth.uid+'/role').val() === 'owner'`.
