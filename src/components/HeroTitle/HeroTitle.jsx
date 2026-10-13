import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';
import './HeroTitle.css';

const IDLE_MS = 3000;
const WALL = 400;

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const rand = (min, max) => min + Math.random() * (max - min);

function createPlayground({ wrap, layer, hero }) {
  const { Engine, Bodies, Body, Composite } = Matter;
  const engine = Engine.create();
  engine.gravity.y = 1.2;

  const heroRect = hero.getBoundingClientRect();
  const H = hero.clientHeight;

  const tag = wrap.querySelector('.hero__title-tag');
  const tagRect = tag.getBoundingClientRect();
  const chars = [...wrap.querySelectorAll('[data-char]')];

  const place = (l) => {
    const { x, y } = l.body.position;
    l.el.style.transform = `translate(${x - l.cx}px, ${y - l.cy}px) rotate(${l.body.angle}rad)`;
  };

  const rootStyle = getComputedStyle(document.documentElement);
  const homeColor = rootStyle.getPropertyValue('--evergreen').trim() || '#082d0f';
  const flyColor = rootStyle.getPropertyValue('--lime').trim() || '#cbe896';
  const probe = document.createElement('canvas').getContext('2d');

  const letters = chars.map((el) => {
    const r = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const fontSize = parseFloat(style.fontSize);
    probe.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const m = probe.measureText(el.textContent.toUpperCase());
    const ascent = m.fontBoundingBoxAscent ?? fontSize * 0.9;
    const capH = m.actualBoundingBoxAscent || fontSize * 0.72;
    const w = r.width;
    const h = tagRect.height;
    const cx = w / 2;
    const cy = ascent - capH / 2;
    const home = { x: r.left - heroRect.left + cx, y: tagRect.top - heroRect.top + cy };

    const node = document.createElement('span');
    node.className = 'hero-title__piece';
    node.textContent = el.textContent;
    node.style.width = `${w}px`;
    node.style.height = `${h}px`;
    node.style.fontSize = style.fontSize;
    node.style.transformOrigin = `${cx}px ${cy}px`;
    node.style.color = homeColor;
    layer.appendChild(node);

    const body = Bodies.rectangle(home.x, home.y, w * 0.86, capH, {
      restitution: 0.3,
      friction: 0.4,
      frictionAir: 0.015,
      chamfer: { radius: 3 },
    });
    Body.setStatic(body, true);
    Composite.add(engine.world, body);

    const letter = { el: node, body, home, w, h, cx, cy, state: 'home' };
    place(letter);
    return letter;
  });

  const minX = -heroRect.left;
  const maxX = Math.max(
    document.documentElement.clientWidth - heroRect.left,
    ...letters.map((l) => l.home.x + l.w / 2 + 2)
  );
  const span = maxX - minX;
  const midX = (minX + maxX) / 2;
  Composite.add(engine.world, [
    Bodies.rectangle(midX, H + WALL / 2, span + WALL * 2, WALL, { isStatic: true }),
    Bodies.rectangle(midX, -WALL / 2, span + WALL * 2, WALL, { isStatic: true }),
    Bodies.rectangle(minX - WALL / 2, H / 2, WALL, H + WALL * 2, { isStatic: true }),
    Bodies.rectangle(maxX + WALL / 2, H / 2, WALL, H + WALL * 2, { isStatic: true }),
  ]);

  let drag = null;
  let idle = 0;

  const scheduleReturn = () => {
    clearTimeout(idle);
    idle = setTimeout(goHome, IDLE_MS);
  };

  const release = (l, vx, vy) => {
    gsap.killTweensOf(l.el);
    l.el.style.opacity = 1;
    gsap.to(l.el, { color: flyColor, duration: 0.25 });
    l.state = 'free';
    Body.setStatic(l.body, false);
    Body.setVelocity(l.body, { x: vx, y: vy });
    Body.setAngularVelocity(l.body, rand(-0.25, 0.25));
    scheduleReturn();
  };

  function goHome() {
    if (drag) {
      scheduleReturn();
      return;
    }
    letters
      .filter((l) => l.state === 'free')
      .forEach((l, i) => {
        l.state = 'returning';
        gsap.to(l.el, {
          opacity: 0,
          duration: 0.35,
          delay: i * 0.05,
          onComplete: () => {
            Body.setStatic(l.body, true);
            Body.setPosition(l.body, l.home);
            Body.setAngle(l.body, 0);
            l.state = 'home';
            l.el.style.color = homeColor;
            place(l);
            gsap.to(l.el, { opacity: 1, duration: 0.5 });
          },
        });
      });
  }

  const local = (e) => {
    const r = hero.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const listeners = [];
  const on = (el, type, fn) => {
    el.addEventListener(type, fn);
    listeners.push([el, type, fn]);
  };

  letters.forEach((l) => {
    on(l.el, 'pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || l.state !== 'home' || drag) return;
      release(l, rand(-4, 4), rand(-12, -7));
    });

    on(l.el, 'pointerdown', (e) => {
      e.preventDefault();
      l.el.setPointerCapture(e.pointerId);
      if (l.state !== 'free') release(l, 0, 0);
      clearTimeout(idle);
      const p = local(e);
      drag = {
        l,
        start: p,
        last: p,
        t: performance.now(),
        v: { x: 0, y: 0 },
        target: { x: l.body.position.x, y: l.body.position.y },
        offset: { x: l.body.position.x - p.x, y: l.body.position.y - p.y },
      };
      l.el.classList.add('is-grabbed');
    });

    on(l.el, 'pointermove', (e) => {
      if (!drag || drag.l !== l) return;
      const p = local(e);
      const now = performance.now();
      const dt = Math.max(now - drag.t, 1);
      drag.v = {
        x: drag.v.x * 0.4 + ((p.x - drag.last.x) / dt) * 16.7 * 0.6,
        y: drag.v.y * 0.4 + ((p.y - drag.last.y) / dt) * 16.7 * 0.6,
      };
      drag.last = p;
      drag.t = now;
      drag.target = {
        x: clamp(p.x + drag.offset.x, minX + l.w / 2, maxX - l.w / 2),
        y: clamp(p.y + drag.offset.y, l.h / 2, H - l.h / 2),
      };
    });

    const end = () => {
      if (!drag || drag.l !== l) return;
      const moved = Math.hypot(drag.last.x - drag.start.x, drag.last.y - drag.start.y);
      const v =
        moved < 6
          ? { x: rand(-4, 4), y: rand(-16, -11) }
          : { x: clamp(drag.v.x, -45, 45), y: clamp(drag.v.y, -45, 45) };
      Body.setVelocity(l.body, v);
      l.el.classList.remove('is-grabbed');
      drag = null;
      scheduleReturn();
    };
    on(l.el, 'pointerup', end);
    on(l.el, 'pointercancel', end);
  });

  const tick = () => {
    if (drag) {
      Body.setPosition(drag.l.body, drag.target);
      Body.setVelocity(drag.l.body, { x: 0, y: 0 });
    }
    Engine.update(engine, 1000 / 60);
    letters.forEach((l) => {
      if (l.state !== 'home') place(l);
    });
  };
  gsap.ticker.add(tick);

  return () => {
    gsap.ticker.remove(tick);
    clearTimeout(idle);
    listeners.forEach(([el, type, fn]) => el.removeEventListener(type, fn));
    letters.forEach((l) => gsap.killTweensOf(l.el));
    Matter.Engine.clear(engine);
    layer.replaceChildren();
  };
}

export default function HeroTitle() {
  const wrapRef = useRef(null);
  const layerRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const layer = layerRef.current;
    const hero = wrap?.closest('.hero');
    if (!wrap || !layer || !hero) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let cancelled = false;
    let teardown = () => {};
    let timer = 0;
    let lastWidth = window.innerWidth;

    const start = async () => {
      await document.fonts.ready;
      if (cancelled) return;
      teardown();
      teardown = createPlayground({ wrap, layer, hero });
      setActive(true);
    };

    const onResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(timer);
      timer = setTimeout(start, 200);
    };

    start();
    window.addEventListener('resize', onResize);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      teardown();
    };
  }, []);

  return (
    <div ref={wrapRef} className={`hero-title${active ? ' is-active' : ''}`}>
      <h1 className="hero__title" aria-label="ManaSota Tech Network">
        <span className="hero-title__line">ManaSota</span>
        <span className="hero-title__line">
          Tech
          <span className="hero__title-tag">
            {[...'Network'].map((ch, i) => (
              <span key={i} className="hero-title__char" data-char="">
                {ch}
              </span>
            ))}
          </span>
        </span>
      </h1>
      <div ref={layerRef} className="hero-title__layer" aria-hidden="true" />
    </div>
  );
}
