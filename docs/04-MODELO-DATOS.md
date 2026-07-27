# 04 · Modelo de datos

> **BD elegida: Realtime Database** (2026-07-27). El árbol real está en la sección **"Variante Realtime Database"** al final de este documento — ese es el que implementamos.
>
> Las "colecciones" que se describen justo debajo son la **descripción conceptual de cada entidad y sus campos** (sirve igual para RTDB). Piensa en cada `coleccion/{id}` como un nodo `/coleccion/{id}` del árbol JSON. Los nombres son provisionales; se confirman en la fase 3.

## Entidades principales

- **users** — cuentas y rol global.
- **campaigns** — cada versión del mundo (incluida `base-phaingea`).
- **memberships** — relación usuario↔campaña (rol en esa campaña + permisos).
- **characters** — personajes (siempre dentro de una campaña).
- **sessions** — sesiones de una campaña (con experiencia).
- **images** — galería (con tags).
- **imageRequests** — propuestas de imágenes pendientes.
- **comments** — comentarios reutilizables (con `target`).
- **categories** — config de cada categoría por campaña (herencia, permisos, tipo).
- **notifications** — por usuario/campaña.
- **logs** — acciones importantes.

## Colecciones (Firestore)

### `users/{uid}`
```
username: string            // el que teclea el jugador (p.ej. "didilon")
displayName: string         // nombre visible
photoInitial: string        // inicial para avatar por defecto
role: "owner" | "master" | "player" | "guest"   // rol GLOBAL base
settings: { sound: bool, ... }
createdAt: timestamp
```
> ⚠️ **Aquí NO hay contraseña.** La contraseña la gestiona Firebase Auth (cifrada), fuera de la base de datos. El `uid` es el que asigna Firebase Auth al crear la cuenta; internamente el email es `username@phaingea.local`.
> El rol **por campaña** vive en `memberships`, no aquí. Aquí solo el rol global (owner vs resto).

### `campaigns/{campaignId}`
```
name: string
isBase: bool                // true solo en base-phaingea
planetIcon: string          // ref a imagen/asset
titleFont: string
colorPrimary: string
colorOutline: string
description: string
worldMap: string            // ref al mapamundi
status: "active" | "finished" | "archived" | "private"
xpProgression: "fast" | "medium" | "slow"
dialOrder: number           // orden en el dial
createdAt: timestamp
```

### `campaigns/{campaignId}/categories/{categoryKey}`
`categoryKey` ∈ `deities | regions | characters | gallery | sessions` (en Base: `legends`, `events`).
```
type: "pdf" | "dynamic"
inherit: { enabled: bool, sourceCampaignId: string | null }  // herencia sincronizada
pdfRef: string | null       // si type=pdf
comments: {
  scope: "general" | "per-page" | "per-entry",
  requireApproval: bool,
  approvers: ["owner","master","author"],
  maxPerPlayer: number | null
}
visibleTo: [...]             // reglas de visibilidad (ver permisos)
```

### `campaigns/{campaignId}/memberships/{uid}`
```
roleInCampaign: "master" | "player" | "guest"
permissions: {
  viewCampaign: bool,
  participate: bool,
  viewCategory: { deities: bool, regions: bool, ... },
  comment: bool,
  proposeImages: bool,
  manageContent: bool
}
joinedAt: timestamp
```

### `campaigns/{campaignId}/characters/{characterId}`
```
ownerUid: string            // jugador que lo controla
name, age, race, sex: ...
description: string
image: string
sheetPdf: string | null     // ficha en PDF
status: "active" | "deceased" | "delegated"
hidden: bool                // privacidad (barras negras)
xpGeneral: number
xpExtra: number
level: number               // derivado (se puede calcular al vuelo)
createdAt: timestamp
```
> Regla: un jugador solo **1 personaje activo** por campaña. Los antiguos se conservan (deceased/delegated).

### `campaigns/{campaignId}/sessions/{sessionId}`
```
number: number
title: string               // por defecto "Sesión {number}"
subtitle: string | null
xpGeneral: number
xpPerCharacter: { [characterId]: number }
description: string | null
createdAt: timestamp
createdBy: uid
```

### `campaigns/{campaignId}/images/{imageId}`
```
url: string
authorUid: string
tags: [string]
relatedCharacterId: string | null
orientation: "h" | "v" | "square" | "special"
createdAt: timestamp
```

### `campaigns/{campaignId}/imageRequests/{requestId}`
```
authorUid, url, tags, status: "pending"|"approved"|"denied"
```
> Máx. 5 pendientes por jugador (se valida en reglas/consulta).

### `comments/{commentId}`  (colección global con target)
```
target: { type: "session"|"character"|"category"|"image", campaignId, refId }
authorUid: string
authorSnapshot: { characterName?: string, playerName: string }  // "Personaje (Jugador) — Fecha"
text: string
status: "published" | "pending"
reactions: { "👍": [uid...], ... }
createdAt, editedAt
```

### `notifications/{uid}/items/{notifId}`
```
campaignId, type, text, read: bool, createdAt
```

### `logs/{logId}`
```
campaignId | null, type, actorUid, summary, createdAt
```

## Relaciones clave

- **Usuario ↔ Campaña:** vía `memberships` (rol + permisos por campaña). Un usuario puede estar en varias campañas con personaje distinto en cada una.
- **Herencia de categorías:** `categories.inherit.sourceCampaignId` apunta a la campaña origen (por defecto `base-phaingea` para `deities` y `regions`). Al leer una categoría heredada, se leen los datos del origen. "Sincronizada" = no se copia, se referencia.
- **Experiencia:** `character.xpGeneral/xpExtra` se recalcula sumando las sesiones (`sessions.xpGeneral` + `xpPerCharacter[charId]`) + ajustes manuales. El nivel sale de aplicar la tabla de Pathfinder 1e según `campaign.xpProgression`.

## Consultas y denormalización (Realtime Database)

RTDB solo ordena/filtra por **un** campo (`orderByChild`), así que:

- `sessions/{campaignId}` → `orderByChild('number')`. ✅ directo.
- `notifications/{uid}` → `orderByChild('createdAt')`. ✅ directo.
- `comments` → guardarlos **anidados bajo su target** (p. ej. `comments/{campaignId}/{targetType}/{refId}/{commentId}`) para leerlos de un tirón sin consulta compuesta. ✅
- **Galería** con filtros combinados (tags + autor + campaña): RTDB no lo hace en una query. Soluciones:
  - Traer las imágenes de la campaña y **filtrar en cliente** (bien si el volumen es moderado). 
  - O **denormalizar índices**: nodos tipo `imagesByTag/{campaignId}/{tag}/{imageId}: true` para leer directamente por tag.
- Definir `".indexOn"` en `database.rules.json` para cada campo por el que se ordene (rendimiento).

## Variante Realtime Database (árbol que implementamos)

Árbol JSON anidado:
```
/users/{uid}
/campaigns/{campaignId}/{...campos}
/campaigns/{campaignId}/categories/{key}
/memberships/{campaignId}/{uid}
/characters/{campaignId}/{characterId}
/sessions/{campaignId}/{sessionId}
/images/{campaignId}/{imageId}
/comments/{campaignId}/{targetType}/{refId}/{commentId}
/notifications/{uid}/{notifId}
/logs/{logId}
```
Recordatorio: los filtros combinados de la galería se resuelven en cliente o con nodos denormalizados (ver sección anterior). Las reglas de seguridad viven en `database.rules.json`.
