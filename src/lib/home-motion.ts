import { gsap } from 'gsap';
import { bindThemeToggle } from './theme';

function overlay() {
  if (!import.meta.env.DEV) return;
  const root = document.querySelector<HTMLElement>('[data-ref-overlay]');
  if (!root) return;

  const apply = (on: boolean) => {
    document.body.classList.toggle('ref-on', on);
    root.hidden = !on;
    root.setAttribute('aria-hidden', on ? 'false' : 'true');
  };

  apply(false);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'R' && event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      event.preventDefault();
      apply(!document.body.classList.contains('ref-on'));
    }
  });
}

function reduce() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function reveals() {
  const nodes = document.querySelectorAll<HTMLElement>('.clone [data-reveal]');
  if (reduce() || window.matchMedia('(max-width: 768px)').matches || !('IntersectionObserver' in window)) {
    nodes.forEach((el) => el.classList.add('is-on'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-on');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  );
  nodes.forEach((el) => io.observe(el));
}

function heroMotion() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const back = document.querySelector<HTMLElement>('[data-sculpt-back]');
  const rear = document.querySelector<HTMLElement>('[data-sculpt]');
  const front = document.querySelector<HTMLElement>('[data-sculpt-front]');
  if (!hero) return;

  requestAnimationFrame(() => hero.classList.add('is-ready'));
  window.setTimeout(() => hero.classList.add('is-settled'), 1200);

  if (reduce()) return;

  const tilt = (el: HTMLElement | null, x: number, y: number, amount: number) => {
    if (!el) return;
    el.style.transform = `rotateY(${x * amount}deg) rotateX(${-y * amount * 0.75}deg)`;
  };

  hero.addEventListener(
    'pointermove',
    (event) => {
      const r = hero.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      tilt(back, x, y, 2);
      tilt(rear, x, y, 3.2);
      tilt(front, x, y, 4);
    },
    { passive: true },
  );

  const onScroll = () => {
    const rect = hero.getBoundingClientRect();
    const y = Math.min(64, Math.max(0, -rect.top * 0.22));
    hero.style.setProperty('--hs', `${y}px`);
    hero.style.setProperty('--hsf', `${y * 0.5}px`);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function aboutField() {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-about-field]');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const mulberry = (seed: number) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const gauss = (rng: () => number) => {
    const u = rng() || 1e-6;
    const v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(Math.PI * 2 * v);
  };

  type Pt = { x: number; y: number; z: number; hot: number; phase: number };
  let pts: Pt[] = [];
  let links: Array<[number, number]> = [];
  let routes: Array<{ x: number; y: number }[]> = [];
  let w = 1;
  let h = 1;

  const build = () => {
    const rng = mulberry(0xa12a2);
    pts = [];
    routes = [];
    const push = (x: number, y: number, z: number, hot: number) => {
      pts.push({
        x: Math.min(0.985, Math.max(0.015, x)),
        y: Math.min(0.985, Math.max(0.015, y)),
        z,
        hot,
        phase: rng() * Math.PI * 2,
      });
    };

    const cluster = (cx: number, cy: number, sx: number, sy: number, n: number, hotP: number) => {
      for (let i = 0; i < n; i++) {
        push(cx + gauss(rng) * sx, cy + gauss(rng) * sy, 0.2 + rng() * 0.8, rng() < hotP ? 1 : 0);
      }
    };

    const bridge = (a: [number, number], b: [number, number], n: number, spread: number, hotP: number) => {
      const route: { x: number; y: number }[] = [];
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        const lift = Math.sin(t * Math.PI) * 0.06 * (a[1] < b[1] ? -1 : 1);
        const x = a[0] + (b[0] - a[0]) * t + gauss(rng) * spread * 0.15;
        const y = a[1] + (b[1] - a[1]) * t + lift + gauss(rng) * spread * 0.15;
        push(x, y, 0.35 + rng() * 0.5, rng() < hotP ? 1 : 0);
        if (i % 8 === 0) route.push({ x, y });
      }
      routes.push(route);
    };

    cluster(0.3, 0.38, 0.13, 0.16, 1100, 0.03);
    cluster(0.52, 0.46, 0.1, 0.12, 720, 0.08);
    cluster(0.68, 0.6, 0.09, 0.1, 860, 0.7);
    cluster(0.18, 0.7, 0.08, 0.09, 380, 0.06);
    cluster(0.78, 0.26, 0.07, 0.08, 320, 0.05);

    bridge([0.3, 0.38], [0.52, 0.46], 180, 0.035, 0.08);
    bridge([0.52, 0.46], [0.68, 0.6], 220, 0.03, 0.45);
    bridge([0.3, 0.38], [0.18, 0.7], 140, 0.04, 0.05);
    bridge([0.52, 0.46], [0.78, 0.26], 120, 0.04, 0.04);

    for (let i = 0; i < 280; i++) {
      push(rng(), rng(), rng() * 0.35, rng() < 0.015 ? 1 : 0);
    }

    const cols = 32;
    const rows = 22;
    const bins: number[][] = Array.from({ length: cols * rows }, () => []);
    pts.forEach((p, i) => {
      const cx = Math.min(cols - 1, Math.floor(p.x * cols));
      const cy = Math.min(rows - 1, Math.floor(p.y * rows));
      bins[cy * cols + cx].push(i);
    });

    const linkRng = mulberry(0x51f1e);
    links = [];
    const tryLink = (a: number, b: number) => {
      if (a === b) return;
      const dx = pts[a].x - pts[b].x;
      const dy = pts[a].y - pts[b].y;
      if (dx * dx + dy * dy < 0.0045) links.push([a, b]);
    };
    bins.forEach((bin, idx) => {
      const cx = idx % cols;
      const cy = Math.floor(idx / cols);
      const neighbors = [bin];
      if (cx + 1 < cols) neighbors.push(bins[cy * cols + cx + 1]);
      if (cy + 1 < rows) neighbors.push(bins[(cy + 1) * cols + cx]);
      for (const cell of neighbors) {
        for (let i = 0; i < bin.length; i++) {
          if (linkRng() > 0.62) continue;
          const other = cell[Math.floor(linkRng() * cell.length)];
          if (other !== undefined) tryLink(bin[i], other);
        }
      }
    });
  };

  const size = () => {
    const rect = canvas.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width));
    h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (t: number) => {
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);

    ctx.lineWidth = 0.7;
    ctx.strokeStyle = 'rgba(214,210,202,0.09)';
    for (const route of routes) {
      if (route.length < 2) continue;
      ctx.beginPath();
      ctx.moveTo(route[0].x * w, route[0].y * h);
      for (let i = 1; i < route.length; i++) ctx.lineTo(route[i].x * w, route[i].y * h);
      ctx.stroke();
    }

    ctx.lineWidth = 0.55;
    for (const [i, j] of links) {
      const a = pts[i];
      const b = pts[j];
      const depth = Math.min(a.z, b.z);
      const hot = a.hot && b.hot;
      ctx.strokeStyle = hot
        ? `rgba(227,28,18,${0.16 + depth * 0.28})`
        : `rgba(214,210,202,${0.05 + depth * 0.12})`;
      ctx.beginPath();
      ctx.moveTo(a.x * w, a.y * h);
      ctx.lineTo(b.x * w, b.y * h);
      ctx.stroke();
    }

    for (const p of pts) {
      const dx = Math.sin(t * 0.32 + p.phase) * 0.5;
      const dy = Math.cos(t * 0.26 + p.phase * 1.2) * 0.4;
      const pulse = p.hot ? 0.2 + Math.sin(t * 0.7 + p.phase) * 0.14 : 0;
      const s = p.hot ? 1.8 + p.z * 0.7 : p.z > 0.7 ? 1.55 : p.z > 0.4 ? 1.2 : 1;
      ctx.fillStyle = p.hot
        ? `rgba(227,28,18,${0.45 + p.z * 0.45 + pulse})`
        : `rgba(232,228,220,${0.16 + p.z * 0.55})`;
      ctx.fillRect(p.x * w + dx, p.y * h + dy, s, s);
    }
  };

  size();
  build();
  draw(0);

  const ro = new ResizeObserver(() => {
    size();
    draw(0);
  });
  ro.observe(canvas);

  if (reduce()) return;

  let playing = false;
  let start = 0;
  const tick = (now: number) => {
    if (!playing) return;
    draw((now - start) / 1000);
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        playing = entry.isIntersecting;
        if (playing) {
          start = performance.now();
          requestAnimationFrame(tick);
        }
      });
    },
    { threshold: 0.12 },
  );
  io.observe(canvas);
}

function services() {
  const root = document.querySelector<HTMLElement>('[data-services]');
  if (!root) return;
  const items = [...root.querySelectorAll<HTMLAnchorElement>('[data-service]')];
  const stage = root.querySelector<HTMLElement>('.home-services__stage');
  const visual = root.querySelector<HTMLElement>('.home-services__visual');
  const scenes = [...root.querySelectorAll<HTMLElement>('[data-service-scene]')];
  const connector = root.querySelector<SVGSVGElement>('[data-service-connector]');
  const connectorPath = connector?.querySelector<SVGPathElement>('[data-service-connector-path]');
  const signal = connector?.querySelector<SVGCircleElement>('[data-service-signal]');
  let activeId = items.find((item) => item.classList.contains('is-on'))?.dataset.service || '0';
  let sceneTween: gsap.core.Timeline | null = null;
  let connectorTween: gsap.core.Tween | null = null;
  let signalTween: gsap.core.Tween | null = null;
  const desktop = () => !window.matchMedia('(max-width: 768px)').matches;
  const motionOk = () => !reduce() && desktop();

  const positionConnector = (animate = true) => {
    if (!stage || !visual || !connector || !connectorPath || !signal || !desktop()) return;

    const selected = items.find((item) => item.dataset.service === activeId);
    if (!selected) return;

    const stageRect = stage.getBoundingClientRect();
    const itemRect = selected.getBoundingClientRect();
    const markRect = selected.querySelector<HTMLElement>('.home-services__mark')?.getBoundingClientRect();
    const visualRect = visual.getBoundingClientRect();
    const startX = markRect
      ? markRect.left - stageRect.left + markRect.width / 2
      : itemRect.right - stageRect.left - 4;
    const startY = markRect
      ? markRect.top - stageRect.top + markRect.height / 2
      : itemRect.top - stageRect.top + itemRect.height / 2;
    const endX = visualRect.left - stageRect.left - 8;
    const endY = visualRect.top - stageRect.top + visualRect.height / 2;
    const bend = Math.max(14, (endX - startX) * 0.48);

    connector.setAttribute('viewBox', `0 0 ${stageRect.width} ${stageRect.height}`);
    connectorPath.setAttribute(
      'd',
      `M ${startX} ${startY} C ${startX + bend} ${startY} ${endX - bend} ${endY} ${endX} ${endY}`,
    );

    const length = connectorPath.getTotalLength();
    connectorTween?.kill();
    signalTween?.kill();

    if (!animate || !motionOk()) {
      gsap.set(connectorPath, { strokeDasharray: length, strokeDashoffset: 0 });
      const end = connectorPath.getPointAtLength(length);
      gsap.set(signal, { attr: { cx: end.x, cy: end.y }, opacity: 1 });
      connector.classList.remove('is-updating');
      return;
    }

    gsap.set(connectorPath, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(signal, { attr: { cx: startX, cy: startY }, opacity: 0.35 });
    connectorTween = gsap.to(connectorPath, {
      strokeDashoffset: 0,
      duration: 0.32,
      ease: 'power2.out',
      onComplete: () => connector.classList.remove('is-updating'),
    });

    const travel = { t: 0 };
    signalTween = gsap.to(travel, {
      t: 1,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: () => {
        const point = connectorPath.getPointAtLength(travel.t * length);
        gsap.set(signal, { attr: { cx: point.x, cy: point.y }, opacity: 0.35 + travel.t * 0.65 });
      },
    });
  };

  const markScene = (id: string) => {
    scenes.forEach((scene) => {
      const on = scene.dataset.serviceScene === id;
      scene.classList.toggle('is-on', on);
      scene.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
  };

  const showScene = (id: string, animate: boolean) => {
    const next = scenes.find((scene) => scene.dataset.serviceScene === id);
    const prev = scenes.find((scene) => scene.classList.contains('is-on') && scene !== next);
    sceneTween?.kill();
    if (!next) return;

    if (!animate || !motionOk() || !prev) {
      markScene(id);
      gsap.set(scenes, { autoAlpha: 0, y: 0 });
      gsap.set(next, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(next, { autoAlpha: 0, y: 16 });
    markScene(id);
    sceneTween = gsap.timeline({ defaults: { duration: 0.26, ease: 'power2.out' } });
    sceneTween.to(prev, { autoAlpha: 0, y: 10 }, 0);
    sceneTween.to(next, { autoAlpha: 1, y: 0 }, 0.06);
  };

  const activate = (id: string, animate = true) => {
    const changed = id !== activeId;
    activeId = id;
    items.forEach((item) => {
      const on = item.dataset.service === id;
      item.classList.toggle('is-on', on);
      item.setAttribute('aria-expanded', on ? 'true' : 'false');
      if (on) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
    showScene(id, animate && changed);
    root.dataset.activeService = id;
    requestAnimationFrame(() => positionConnector(animate && changed));
  };

  items.forEach((item, i) => {
    const id = () => item.dataset.service || '0';
    item.setAttribute('aria-expanded', item.classList.contains('is-on') ? 'true' : 'false');
    item.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) activate(id());
    });
    item.addEventListener('focus', () => activate(id()));
    item.addEventListener('click', (event) => {
      if (!window.matchMedia('(max-width: 768px)').matches) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest('.home-services__go')) return;
      event.preventDefault();
      activate(id());
    });
    item.addEventListener('keydown', (event) => {
      const last = items.length - 1;
      let next = i;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = i === last ? 0 : i + 1;
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;
      else return;
      event.preventDefault();
      items[next].focus();
    });
  });

  activate(activeId, false);
  requestAnimationFrame(() => positionConnector(false));
  window.addEventListener('resize', () => positionConnector(false), { passive: true });
  if ('ResizeObserver' in window && stage) {
    const observer = new ResizeObserver(() => positionConnector(false));
    observer.observe(stage);
    items.forEach((item) => observer.observe(item));
  }
}

function processWorkflow() {
  const root = document.querySelector<HTMLElement>('[data-process]');
  if (!root || root.dataset.processBound === 'true') return;
  root.dataset.processBound = 'true';
  const steps = [...root.querySelectorAll<HTMLElement>('[data-process-step]')];
  const scenes = [...root.querySelectorAll<HTMLElement>('[data-process-scene]')];
  if (!steps.length) return;

  let activeId = steps.find((step) => step.classList.contains('is-on'))?.dataset.processStep || '0';
  let sceneTween: gsap.core.Timeline | null = null;
  const desktop = () => !window.matchMedia('(max-width: 768px)').matches;
  const motionOk = () => !reduce() && desktop();

  const activate = (id: string, animate = true) => {
    const changed = id !== activeId;
    activeId = id;
    steps.forEach((step) => {
      const on = step.dataset.processStep === id;
      step.classList.toggle('is-on', on);
      step.setAttribute('aria-expanded', on ? 'true' : 'false');
    });

    const next = scenes.find((scene) => scene.dataset.processScene === id);
    const cards = next ? [...next.querySelectorAll<HTMLElement>('.process-flow__card')] : [];
    sceneTween?.kill();

    scenes.forEach((scene) => {
      const on = scene.dataset.processScene === id;
      scene.classList.toggle('is-on', on);
      scene.setAttribute('aria-hidden', on ? 'false' : 'true');
    });

    if (!next) return;
    if (!animate || !changed || !motionOk()) {
      gsap.set(root.querySelectorAll<HTMLElement>('.process-flow__card'), { clearProps: 'opacity,visibility,transform' });
      return;
    }

    gsap.set(cards, { autoAlpha: 0, y: 10 });
    sceneTween = gsap.timeline({ defaults: { duration: 0.22, ease: 'power2.out' } });
    sceneTween.to(cards, { autoAlpha: 1, y: 0, stagger: 0.045 }, 0);
  };

  steps.forEach((step, i) => {
    const id = () => step.dataset.processStep || String(i);
    step.addEventListener('mouseenter', () => {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) activate(id());
    });
    step.addEventListener('focus', () => activate(id()));
    step.addEventListener('click', () => activate(id()));
    step.addEventListener('keydown', (event) => {
      const last = steps.length - 1;
      let next = i;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = i === last ? 0 : i + 1;
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;
      else return;
      event.preventDefault();
      steps[next].focus();
    });
  });

  activate(activeId, false);
}

export function mountProcessMotion() {
  processWorkflow();
}

function hub() {
  const root = document.querySelector<HTMLElement>('[data-hub]');
  if (!root) return;
  const items = root.querySelectorAll<HTMLElement>('[data-hub-item]');
  const lines = root.querySelectorAll('line');
  const core = root.querySelector<HTMLElement>('[data-hub-core]');

  const set = (index: number | null) => {
    root.classList.toggle('is-live', index !== null);
    items.forEach((item, i) => item.classList.toggle('is-on', i === index));
    lines.forEach((line, i) => line.classList.toggle('is-on', i === index));
    if (core) {
      if (index === null) core.removeAttribute('data-state');
      else core.dataset.state = String(index);
    }
  };

  items.forEach((item, i) => {
    item.addEventListener('mouseenter', () => set(i));
    item.addEventListener('focus', () => set(i));
  });
  root.addEventListener('mouseleave', () => set(null));
}

function counters() {
  const nums = document.querySelectorAll<HTMLElement>('[data-count]');
  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count || '0');
    if (reduce()) {
      el.textContent = String(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target as HTMLElement);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  nums.forEach((el) => io.observe(el));
}

function ctaMove() {
  const panel = document.querySelector<HTMLElement>('[data-cta]');
  const art = panel?.querySelector<HTMLElement>('.c-cta__art');
  if (!panel || !art || reduce() || window.matchMedia('(max-width: 768px)').matches) return;
  panel.addEventListener('pointermove', (event) => {
    const r = panel.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    art.style.transform = `translate3d(${x * 20}px, 0, 0)`;
  }, { passive: true });
}

function meshFields() {
  if (reduce() || window.matchMedia('(max-width: 768px)').matches) return;
  const canvases = document.querySelectorAll<HTMLCanvasElement>('[data-mesh]');
  canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const count = 2600;
    const pts = Array.from({ length: count }, (_, i) => {
      const seed = i * 12.9898;
      const rand = (n: number) => {
        const v = Math.sin(seed * n) * 43758.5453;
        return v - Math.floor(v);
      };
      return {
        x: rand(1) * 2 - 1,
        y: rand(2) * 2 - 1,
        z: rand(3) * 2 - 1,
      };
    });

    const draw = (t: number) => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, w, h);
      for (const p of pts) {
        const wave = Math.sin(p.x * 3.2 + p.z * 1.4 + t) * 0.16;
        const z = p.z + wave;
        const scale = 1.7 / (2.25 + z);
        const sx = w * 0.5 + p.x * 460 * scale;
        const sy = h * 0.52 + (p.y * 0.52 + z * 0.22) * 400 * scale;
        const r = Math.max(0.45, 2.1 * scale);
        const hot = p.x * p.y + z > 0.32;
        ctx.fillStyle = hot
          ? `rgba(227,28,18,${0.22 + scale * 0.5})`
          : `rgba(214,210,202,${0.1 + scale * 0.38})`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    draw(0);
    if (reduce()) return;

    let playing = false;
    let start = 0;
    const tick = (now: number) => {
      if (!playing) return;
      draw((now - start) / 5200);
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        playing = entry.isIntersecting;
        if (playing) {
          start = performance.now();
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.12 });
    io.observe(canvas);
  });
}

export function mountHomeMotion() {
  bindThemeToggle();
  overlay();
  reveals();
  heroMotion();
  services();
  hub();
  counters();
  ctaMove();
  meshFields();
}
