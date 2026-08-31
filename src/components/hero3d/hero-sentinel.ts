import type { MeshStandardMaterial, Object3D, Texture, WebGLRenderer } from 'three';
import {
  createHeroMotion,
  heroFrame,
  HERO_BLUE,
  type HeroQuality,
  type HeroTweak,
} from './hero-sentinel-motion';

const MODEL_URL = '/models/aizaz-sentinel.glb';

type ThreeNS = typeof import('three');

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function quality(): HeroQuality {
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const cores = navigator.hardwareConcurrency || 8;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mobile && (cores <= 4 || (mem !== undefined && mem <= 4))) return 'low';
  if (mobile) return 'mid';
  return 'high';
}

function inspectModel(
  THREE: ThreeNS,
  root: Object3D,
  extras: { animations: string[]; fileBytes: number },
) {
  const nodes: string[] = [];
  const meshes: string[] = [];
  const materials: Array<Record<string, unknown>> = [];
  const textures = new Set<Texture>();
  let meshCount = 0;

  root.traverse((obj) => {
    const indent = (() => {
      let d = 0;
      let p: Object3D | null = obj.parent;
      while (p) {
        d += 1;
        p = p.parent;
      }
      return d;
    })();
    nodes.push(`${'  '.repeat(Math.max(0, indent - 1))}${obj.type} ${obj.name || '(unnamed)'}`);
    const mesh = obj as import('three').Mesh;
    if (mesh.isMesh) {
      meshCount += 1;
      meshes.push(mesh.name || '(unnamed mesh)');
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        const mat = m as MeshStandardMaterial;
        if (mat.map) textures.add(mat.map);
        if (mat.normalMap) textures.add(mat.normalMap);
        if (mat.roughnessMap) textures.add(mat.roughnessMap);
        if (mat.metalnessMap) textures.add(mat.metalnessMap);
        if (mat.emissiveMap) textures.add(mat.emissiveMap);
        materials.push({
          name: mat.name,
          type: mat.type,
          color: mat.color?.getHexString?.(),
          metalness: mat.metalness,
          roughness: mat.roughness,
          emissive: mat.emissive?.getHexString?.(),
          emissiveIntensity: mat.emissiveIntensity,
          hasMap: Boolean(mat.map),
          hasNormal: Boolean(mat.normalMap),
          hasRoughness: Boolean(mat.roughnessMap),
          hasEmissiveMap: Boolean(mat.emissiveMap),
        });
      });
    }
  });

  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  return {
    fileMB: +(extras.fileBytes / 1024 / 1024).toFixed(2),
    fileBytes: extras.fileBytes,
    hierarchy: nodes,
    meshNames: meshes,
    meshCount,
    separateParts: {
      head: false,
      visor: false,
      neck: false,
      shoulders: false,
      torso: false,
    },
    materials,
    emissiveMaterials: materials.filter(
      (m) => Number(m.emissiveIntensity) > 0.05 || (typeof m.emissive === 'string' && m.emissive !== '000000'),
    ),
    textureCount: textures.size,
    animations: extras.animations,
    boundingBox: {
      min: box.min.toArray().map((n) => +n.toFixed(4)),
      max: box.max.toArray().map((n) => +n.toFixed(4)),
      size: size.toArray().map((n) => +n.toFixed(4)),
      center: center.toArray().map((n) => +n.toFixed(4)),
    },
  };
}

function extractBlueEmissive(THREE: ThreeNS, map: Texture) {
  const img = map.image as { width: number; height: number } | undefined;
  if (!img?.width || !img?.height) return null;
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  ctx.drawImage(img as CanvasImageSource, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size);
  const px = data.data;
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const blue = b - Math.max(r, g);
    if (blue > 16 && b > 70) {
      px[i] = 48;
      px[i + 1] = 130;
      px[i + 2] = 230;
      px[i + 3] = 255;
    } else {
      px[i] = 0;
      px[i + 1] = 0;
      px[i + 2] = 0;
      px[i + 3] = 0;
    }
  }
  ctx.putImageData(data, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = map.flipY;
  tex.needsUpdate = true;
  return tex;
}

function createRings(THREE: ThreeNS, bg: import('three').Group, fg: import('three').Group, q: HeroQuality) {
  const pts = q === 'low' ? 48 : 96;
  const make = (radius: number, start: number, length: number, color: number, opacity: number) => {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius, start, start + length, false, 0);
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(pts));
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    const line = new THREE.Line(geo, mat);
    line.rotation.x = Math.PI / 2;
    return line;
  };

  bg.add(make(2.35, 0.28, Math.PI * 1.42, 0x1a1a18, 0.18));
  bg.add(make(2.35, -0.12, 0.52, HERO_BLUE, 0.4));
  bg.add(make(2.95, -0.5, Math.PI * 1.05, 0x141412, 0.1));
  const ticks = new THREE.Group();
  const tickN = q === 'low' ? 7 : 12;
  for (let i = 0; i < tickN; i++) {
    const a = (i / tickN) * Math.PI * 1.35 + 0.35;
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Math.cos(a) * 2.22, 0, Math.sin(a) * 2.22),
      new THREE.Vector3(Math.cos(a) * 2.42, 0, Math.sin(a) * 2.42),
    ]);
    ticks.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x111110, transparent: true, opacity: 0.2 })));
  }
  bg.add(ticks);

  const mid = make(1.72, 0.7, Math.PI * 1.05, 0x222220, 0.12);
  mid.position.z = 0.2;
  bg.add(mid);

  const fgArc = make(0.82, 0.55, 0.95, 0x1c1c1a, 0.18);
  fgArc.rotation.x = 0.55;
  fg.add(fgArc);
  fg.renderOrder = 5;
}

function createParticles(THREE: ThreeNS, count: number) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.32) * 5.5;
    pos[i * 3 + 1] = (Math.random() - 0.42) * 3.1;
    pos[i * 3 + 2] = (Math.random() - 0.72) * 3.6;
    const blue = i % 11 === 0;
    col[i * 3] = blue ? 0.32 : 0.62;
    col[i * 3 + 1] = blue ? 0.52 : 0.62;
    col[i * 3 + 2] = blue ? 0.86 : 0.6;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.011,
    transparent: true,
    opacity: 0.26,
    depthWrite: false,
    sizeAttenuation: true,
    vertexColors: true,
  });
  const pts = new THREE.Points(geo, mat);
  pts.position.set(0.45, 0.18, -1.15);
  return pts;
}

function fitModel(THREE: ThreeNS, root: Object3D, targetHeight: number) {
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  root.position.sub(center);
  const s = targetHeight / Math.max(size.y, 0.001);
  root.scale.setScalar(s);
  root.position.multiplyScalar(s);
  return {
    height: size.y * s,
    width: size.x * s,
    depth: size.z * s,
    head: new THREE.Vector3(0, -size.y * 0.5 + size.y * 0.82, -size.z * 0.22),
    helmet: new THREE.Vector3(0, size.y * 0.48, -size.z * 0.08),
    shoulder: new THREE.Vector3(size.x * 0.38, -size.y * 0.5 + size.y * 0.48, 0),
    chest: new THREE.Vector3(0, -size.y * 0.5 + size.y * 0.22, size.z * 0.1),
  };
}

export type HeroSentinelHandle = {
  dispose: () => void;
  live: boolean;
};

export async function mountHeroSentinel(hero: HTMLElement): Promise<HeroSentinelHandle> {
  const canvas = hero.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  const poster = hero.querySelector<HTMLElement>('[data-hero-poster]');
  const loadEl = hero.querySelector<HTMLElement>('[data-hero-load]');
  const empty: HeroSentinelHandle = { dispose() {}, live: false };
  if (!canvas || !poster) return empty;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const debug = import.meta.env.DEV && new URLSearchParams(location.search).has('heroDebug');
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  const q = quality();
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const showPosterFallback = () => {
    poster.hidden = false;
    poster.classList.remove('is-hidden');
    loadEl?.setAttribute('hidden', '');
    hero.classList.remove('is-loading');
    hero.classList.add('is-fallback');
  };

  const fallback = (reason: string, err?: unknown) => {
    console.warn(`[hero3d] fallback: ${reason}`, err ?? '');
    showPosterFallback();
    hero.dataset.hero3dState = 'fallback';
    return empty;
  };

  /* Reduced motion / save-data / no WebGL / narrow viewports: poster only. */
  if (reduced || saveData || narrow || !hasWebGL()) {
    showPosterFallback();
    hero.dataset.hero3dState = 'fallback';
    if (!narrow && !reduced && !saveData) {
      console.warn('[hero3d] fallback: capability', { reduced, saveData, narrow, webgl: hasWebGL() });
    }
    return empty;
  }

  hero.classList.add('is-loading');
  hero.dataset.hero3dState = 'loading';
  loadEl?.removeAttribute('hidden');
  poster.hidden = true;
  poster.classList.add('is-hidden');

  let THREE: ThreeNS;
  try {
    THREE = await import('three');
  } catch (err) {
    try {
      await new Promise((r) => setTimeout(r, 300));
      THREE = await import('three');
    } catch (err2) {
      return fallback('three', err2 ?? err);
    }
  }

  let GLTFLoaderCtor: typeof import('three/addons/loaders/GLTFLoader.js').GLTFLoader;
  try {
    ({ GLTFLoader: GLTFLoaderCtor } = await import('three/addons/loaders/GLTFLoader.js'));
  } catch (err) {
    return fallback('loader', err);
  }

  const loader = new GLTFLoaderCtor();
  let gltf: { scene: import('three').Group; animations: import('three').AnimationClip[] };
  let fileBytes = 2837492;
  try {
    gltf = await loader.loadAsync(`${MODEL_URL}?v=2`);
  } catch (err) {
    try {
      const file = await fetch(`${MODEL_URL}?v=2`, { cache: 'no-store' });
      if (!file.ok) throw new Error(`glb ${file.status}`);
      const modelBuffer = await file.arrayBuffer();
      fileBytes = modelBuffer.byteLength;
      gltf = await new Promise((resolve, reject) => {
        loader.parse(modelBuffer, '/models/', (parsed) => resolve(parsed as typeof gltf), reject);
      });
    } catch (err2) {
      return fallback('load', err2 ?? err);
    }
  }

  let renderer: WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: q === 'high',
      powerPreference: 'default',
      stencil: false,
      depth: true,
    });
  } catch (err) {
    return fallback('renderer', err);
  }

  const scene = new THREE.Scene();
  const frame = heroFrame(hero.clientWidth || window.innerWidth);
  const camera = new THREE.PerspectiveCamera(frame.fov, 1, 0.05, 40);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.68;
  renderer.shadowMap.enabled = false;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, q === 'high' ? 1.5 : 1.25));

  const hemi = new THREE.HemisphereLight(0xf6f2ea, 0x8a867e, 0.52);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xfff7ee, 0.9);
  key.position.set(-3.1, 2.4, 1.6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xe7eef4, 0.18);
  fill.position.set(2.6, 0.5, 1.5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xa8c4de, 0.2);
  rim.position.set(1.5, 1.5, -2.3);
  scene.add(rim);

  try {
    const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.28;
    pmrem.dispose();
  } catch {
    /* optional */
  }

  const ringsBg = new THREE.Group();
  const ringsFg = new THREE.Group();
  createRings(THREE, ringsBg, ringsFg, q);
  scene.add(ringsBg);
  scene.add(ringsFg);

  const particles = q === 'high' ? createParticles(THREE, 72) : q === 'mid' ? createParticles(THREE, 36) : undefined;
  if (particles) scene.add(particles);

  const modelRoot = new THREE.Group();
  const model = gltf.scene;
  const bounds = fitModel(THREE, model, frame.height);
  modelRoot.add(model);
  const accent = new THREE.PointLight(HERO_BLUE, 0.2, 5.2, 1.8);
  accent.position.copy(bounds.head);
  modelRoot.add(accent);
  scene.add(modelRoot);

  let report: ReturnType<typeof inspectModel>;
  try {
    report = inspectModel(THREE, model, {
      animations: (gltf.animations || []).map((a) => a.name || '(unnamed)'),
      fileBytes,
    });
    if (import.meta.env.DEV) console.info('[hero3d] inspect', JSON.stringify(report, null, 2));
  } catch (err) {
    console.warn('[hero3d] inspect failed', err);
    report = {
      fileMB: +(fileBytes / 1024 / 1024).toFixed(2),
      fileBytes,
      hierarchy: [],
      meshNames: [],
      meshCount: 0,
      separateParts: { head: false, visor: false, neck: false, shoulders: false, torso: false },
      materials: [],
      emissiveMaterials: [],
      textureCount: 0,
      animations: [],
      boundingBox: { min: [], max: [], size: [], center: [] },
    };
  }

  const visor: Array<{ intensity: number }> = [];
  model.traverse((obj) => {
    const mesh = obj as import('three').Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach((m) => {
      const mat = m as MeshStandardMaterial;
      if (!mat?.color) return;
      if (mat.map) {
        try {
          const glowMap = extractBlueEmissive(THREE, mat.map);
          if (glowMap) {
            mat.emissive = new THREE.Color(HERO_BLUE);
            mat.emissiveMap = glowMap;
            mat.emissiveIntensity = 0.15;
            visor.push({
              get intensity() {
                return mat.emissiveIntensity;
              },
              set intensity(value: number) {
                mat.emissiveIntensity = value;
              },
            });
          }
        } catch {
          /* baked atlas may not yield a glow map */
        }
      }
    });
  });

  const motion = createHeroMotion(
    {
      model: modelRoot,
      visor,
      ringsBg,
      ringsFg,
      particles,
      camera,
      key,
      rim,
      fill,
      accent,
      setExposure: (v) => {
        renderer.toneMappingExposure = v;
      },
    },
    { reduced, pointer: fine && !reduced, frame },
  );

  const resize = () => {
    const w = Math.max(1, canvas.clientWidth || hero.clientWidth);
    const h = Math.max(1, canvas.clientHeight || hero.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  resize();

  let visible = true;
  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0.04 },
  );
  io.observe(hero);

  const onPointer = (event: PointerEvent) => {
    const r = hero.getBoundingClientRect();
    motion.setPointer((event.clientX - r.left) / r.width - 0.5, (event.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => motion.setPointer(0, 0);
  if (fine && !reduced) {
    hero.addEventListener('pointermove', onPointer, { passive: true });
    hero.addEventListener('pointerleave', onLeave, { passive: true });
  }

  const onScroll = () => {
    const r = hero.getBoundingClientRect();
    motion.setScroll(Math.min(1, Math.max(0, -r.top / Math.max(1, r.height))));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', resize);
  onScroll();

  let debugEl: HTMLDivElement | undefined;
  const tweak: HeroTweak = {};
  const screenOf = (local: import('three').Vector3) => {
    const v = local.clone();
    model.updateWorldMatrix(true, false);
    v.applyMatrix4(model.matrixWorld);
    v.project(camera);
    return { x: (v.x * 0.5 + 0.5) * 100, y: (-v.y * 0.5 + 0.5) * 100 };
  };

  if (debug) {
    debugEl = document.createElement('div');
    debugEl.className = 'hero3d-debug';
    debugEl.innerHTML = `<pre data-hero-debug-log></pre>
<label>posX <input type="range" min="0.6" max="3.8" step="0.02" value="${frame.home.x}" data-tw="posX"></label>
<label>posY <input type="range" min="-2.2" max="0.4" step="0.02" value="${frame.home.y}" data-tw="posY"></label>
<label>posZ <input type="range" min="-1" max="1.4" step="0.02" value="${frame.home.z}" data-tw="posZ"></label>
<label>scale <input type="range" min="0.7" max="1.6" step="0.02" value="1" data-tw="scale"></label>
<label>rotY <input type="range" min="-50" max="40" step="0.5" value="5" data-tw="rotY"></label>
<label>fov <input type="range" min="24" max="48" step="0.5" value="${frame.fov}" data-tw="fov"></label>
<label>camX <input type="range" min="-1.2" max="1.2" step="0.02" value="${frame.cam1.x}" data-tw="camX"></label>
<label>camY <input type="range" min="-0.4" max="1.4" step="0.02" value="${frame.cam1.y}" data-tw="camY"></label>
<label>camZ <input type="range" min="3.2" max="6.4" step="0.02" value="${frame.cam1.z}" data-tw="camZ"></label>
<label>lookX <input type="range" min="-0.4" max="2.2" step="0.02" value="${frame.look.x}" data-tw="lookX"></label>
<label>lookY <input type="range" min="-0.6" max="1.2" step="0.02" value="${frame.look.y}" data-tw="lookY"></label>`;
    hero.appendChild(debugEl);
    debugEl.querySelectorAll<HTMLInputElement>('input[data-tw]').forEach((input) => {
      const key = input.dataset.tw as keyof HeroTweak;
      const apply = () => {
        tweak[key] = Number(input.value);
        motion.setTweak(tweak);
      };
      input.addEventListener('input', apply);
    });
  }

  let raf = 0;
  let last = 0;
  let frames = 0;
  let fpsWindow = 0;
  let fps = 60;
  let disposed = false;
  let revealed = false;

  const dispose = () => {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', resize);
    hero.removeEventListener('pointermove', onPointer);
    hero.removeEventListener('pointerleave', onLeave);
    debugEl?.remove();
    scene.traverse((obj) => {
      const mesh = obj as import('three').Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material;
      if (Array.isArray(mat)) mat.forEach((item) => item.dispose());
      else if (mat) (mat as import('three').Material).dispose();
    });
    renderer.dispose();
  };

  const tick = (now: number) => {
    if (disposed) return;
    raf = requestAnimationFrame(tick);
    const entering = motion.debug.elapsed < 1.8;
    if (!visible && revealed && !entering) return;
    const dt = last === 0 ? 1 / 60 : Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    motion.update(dt);
    renderer.render(scene, camera);

    if (!revealed) {
      revealed = true;
      hero.classList.remove('is-loading');
      loadEl?.setAttribute('hidden', '');
      poster.hidden = true;
      poster.classList.add('is-hidden');
      hero.classList.add('is-webgl');
      hero.dataset.hero3dState = 'live';
    }

    frames += 1;
    fpsWindow += dt;
    if (fpsWindow >= 1) {
      fps = frames / fpsWindow;
      frames = 0;
      fpsWindow = 0;
    }

    if (debugEl) {
      const d = motion.debug;
      const helmet = screenOf(bounds.helmet);
      const head = screenOf(bounds.head);
      const shoulder = screenOf(bounds.shoulder);
      const chest = screenOf(bounds.chest);
      const log = debugEl.querySelector('[data-hero-debug-log]');
      if (log) {
        log.textContent = [
          `fps ${fps.toFixed(0)}  live  t ${d.elapsed.toFixed(2)}s`,
          `rotY ${((d.rotation.y * 180) / Math.PI).toFixed(1)}  entry ${d.entryDeg.toFixed(0)} → final ${d.finalDeg.toFixed(0)}`,
          `pos ${d.position.x.toFixed(2)} ${d.position.y.toFixed(2)} ${d.position.z.toFixed(2)}`,
          `cam ${d.camera.x.toFixed(2)} ${d.camera.y.toFixed(2)} ${d.camera.z.toFixed(2)}  fov ${d.fov.toFixed(1)}`,
          `look ${d.look.x.toFixed(2)} ${d.look.y.toFixed(2)} ${d.look.z.toFixed(2)}`,
          `HELM ${helmet.x.toFixed(0)}% ${helmet.y.toFixed(0)}%   HEAD ${head.x.toFixed(0)}% ${head.y.toFixed(0)}%`,
          `CHEST ${chest.x.toFixed(0)}% ${chest.y.toFixed(0)}%   SH ${shoulder.x.toFixed(0)}% ${shoulder.y.toFixed(0)}%`,
          `box ${bounds.width.toFixed(2)} × ${bounds.height.toFixed(2)} × ${bounds.depth.toFixed(2)}`,
          `target head 82–86% x / 38–43% y   helm top 19–24%`,
        ].join('\n');
      }
    }
  };

  hero.classList.remove('is-webgl');
  requestAnimationFrame(tick);
  return { dispose, live: true };
}
