import { useEffect, useRef } from 'react';

// Fondo de estrellas animadas (canvas 2D). Adaptado de un componente shadcn/Tailwind
// a JS + estilos inline (este proyecto no usa Tailwind ni TS).
// Props útiles:
//  · speedMultiplier -> velocidad de rotación (1 = original; usamos ~0.4, más lento)
//  · maxStars, hue, brightness, twinkleIntensity, transparent, paused
export function StarsCanvas({
  transparent = false,
  maxStars = 1200,
  hue = 217,
  brightness = 10,
  speedMultiplier = 1,
  twinkleIntensity = 20,
  className = '',
  paused = false,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let stars = [];
    let count = 0;

    // --- texturas de estrella cacheadas (una por tono) ---
    // La guía pide estrellas con color además del blanco: mayoría blanco-azuladas
    // y una minoría doradas, rojizas y violetas. `peso` = probabilidad relativa.
    const PALETA = [
      { hue, sat: 61, peso: 70 }, // blanco-azulado (tono base)
      { hue: 45, sat: 70, peso: 12 }, // dorado
      { hue: 12, sat: 65, peso: 8 }, // rojizo
      { hue: 285, sat: 60, peso: 6 }, // violeta
      { hue: 175, sat: 55, peso: 4 }, // turquesa
    ];

    function crearSprite({ hue: h, sat }) {
      const c = document.createElement('canvas');
      c.width = c.height = 100;
      const x = c.getContext('2d');
      const half = c.width / 2;
      const g = x.createRadialGradient(half, half, 0, half, half, half);
      g.addColorStop(0.025, '#fff'); // núcleo siempre blanco
      g.addColorStop(0.1, `hsl(${h}, ${sat}%, 45%)`); // halo de color
      g.addColorStop(0.25, `hsl(${h}, ${sat}%, 8%)`);
      g.addColorStop(1, 'transparent');
      x.fillStyle = g;
      x.beginPath();
      x.arc(half, half, half, 0, Math.PI * 2);
      x.fill();
      return c;
    }

    const sprites = PALETA.map(crearSprite);
    // Ruleta de pesos: índice de sprite para cada estrella nueva.
    const pesoTotal = PALETA.reduce((s, p) => s + p.peso, 0);
    function spriteAleatorio() {
      let r = Math.random() * pesoTotal;
      for (let i = 0; i < PALETA.length; i++) {
        r -= PALETA[i].peso;
        if (r <= 0) return i;
      }
      return 0;
    }

    const random = (min, max) => {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      if (min > max) [min, max] = [max, min];
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const maxOrbit = (x, y) => {
      const max = Math.max(x, y);
      const diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
    };

    class Star {
      constructor() {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = (random(this.orbitRadius) / 50000) * speedMultiplier;
        this.alpha = (random(2, 10) / 10) * brightness;
        this.sprite = sprites[spriteAleatorio()]; // tono de esta estrella
        count++;
        stars[count] = this;
      }

      draw() {
        const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        const twinkle = random(twinkleIntensity);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.sprite, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
      }
    }

    // Las órbitas se calculan a partir del tamaño del lienzo, así que si este
    // cambia (o montamos con el viewport aún sin medir) hay que regenerarlas.
    function generarEstrellas() {
      stars = [];
      count = 0;
      for (let i = 0; i < maxStars; i++) new Star();
    }
    generarEstrellas();

    const animate = () => {
      if (paused) return;

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = transparent ? 'hsla(217, 64%, 6%, 0)' : 'hsla(217, 64%, 6%, 1)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      for (let i = 1; i < stars.length; i++) {
        stars[i].draw();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    let tRedim;
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      clearTimeout(tRedim);
      tRedim = setTimeout(generarEstrellas, 150); // reparte las órbitas al tamaño nuevo
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(tRedim);
      window.removeEventListener('resize', handleResize);
    };
  }, [transparent, maxStars, hue, brightness, speedMultiplier, twinkleIntensity, paused]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        display: 'block',
      }}
    />
  );
}

export default StarsCanvas;
