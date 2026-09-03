import type { DirectionalLight, Group, Object3D, PerspectiveCamera, PointLight, Points } from 'three';

export const HERO_BLUE = 0x4e92d8;

export type HeroQuality = 'high' | 'mid' | 'low';

export type HeroParts = {
  model: Object3D;
  visor: Array<{ intensity: number }>;
  ringsBg: Group;
  ringsFg: Object3D;
  particles?: Points;
  camera: PerspectiveCamera;
  key: DirectionalLight;
  rim: DirectionalLight;
  fill: DirectionalLight;
  accent?: PointLight;
  setExposure: (value: number) => void;
};

export type HeroFrame = {
  height: number;
  fov: number;
  home: { x: number; y: number; z: number };
  cam0: { x: number; y: number; z: number };
  cam1: { x: number; y: number; z: number };
  look: { x: number; y: number; z: number };
};

export type HeroTweak = Partial<{
  posX: number;
  posY: number;
  posZ: number;
  scale: number;
  rotY: number;
  fov: number;
  camX: number;
  camY: number;
  camZ: number;
  lookX: number;
  lookY: number;
  lookZ: number;
}>;

const rad = (deg: number) => (deg * Math.PI) / 180;
const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));
const linear = (t: number, a: number, b: number) => clamp((t - a) / Math.max(0.0001, b - a), 0, 1);
const easeOutQuint = (t: number) => 1 - (1 - clamp(t, 0, 1)) ** 5;
const easeInOutCubic = (t: number) => {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
};
const windowOut = (t: number, a: number, b: number) => easeOutQuint(linear(t, a, b));
const windowTurn = (t: number, a: number, b: number) => easeInOutCubic(linear(t, a, b));

/**
 * Native GLB faces -Z at rotationY = 0 (front to camera).
 * Negative Y looks toward the right / outside of the page.
 * Small positive Y looks slightly toward the headline.
 */
export const ENTRY_ROTATION_Y = rad(-30);
export const FINAL_ROTATION_Y = rad(5);
const ENTRY_PITCH = rad(-1.2);
const PTR_YAW = rad(2);
const PTR_PITCH = rad(0.85);
const IDLE_YAW = rad(0.3);

export function heroFrame(width: number): HeroFrame {
  /* Frames assume the canvas is the right-hand visual zone, not the full page. */
  if (width < 768) {
    return {
      height: 2.42,
      fov: 32,
      home: { x: 0.12, y: -0.72, z: 0.06 },
      cam0: { x: 0.04, y: 0.18, z: 4.55 },
      cam1: { x: 0.06, y: 0.12, z: 4.2 },
      look: { x: 0.1, y: 0.06, z: 0 },
    };
  }
  if (width < 1100) {
    return {
      height: 2.72,
      fov: 30,
      home: { x: 0.16, y: -0.7, z: 0.05 },
      cam0: { x: 0.06, y: 0.2, z: 4.48 },
      cam1: { x: 0.1, y: 0.14, z: 4.08 },
      look: { x: 0.14, y: 0.1, z: 0 },
    };
  }
  if (width < 1400) {
    return {
      height: 2.92,
      fov: 29,
      home: { x: 0.2, y: -0.66, z: 0.04 },
      cam0: { x: 0.08, y: 0.22, z: 4.42 },
      cam1: { x: 0.12, y: 0.16, z: 4.02 },
      look: { x: 0.16, y: 0.12, z: 0 },
    };
  }
  return {
    height: 3.08,
    fov: 28,
    home: { x: 0.22, y: -0.62, z: 0.04 },
    cam0: { x: 0.08, y: 0.24, z: 4.36 },
    cam1: { x: 0.12, y: 0.18, z: 3.96 },
    look: { x: 0.16, y: 0.14, z: 0 },
  };
}

export function createHeroMotion(
  parts: HeroParts,
  opts: { reduced: boolean; pointer: boolean; frame: HeroFrame },
) {
  const frame = opts.frame;
  const look = { ...frame.look };
  parts.camera.fov = frame.fov;
  parts.camera.updateProjectionMatrix();
  parts.camera.position.set(frame.cam0.x, frame.cam0.y, frame.cam0.z);
  parts.camera.lookAt(look.x, look.y, look.z);

  const startX = frame.home.x + 0.08;
  const startZ = frame.home.z + 0.1;

  parts.model.rotation.set(opts.reduced ? 0 : ENTRY_PITCH, opts.reduced ? FINAL_ROTATION_Y : ENTRY_ROTATION_Y, 0);
  parts.model.position.set(opts.reduced ? frame.home.x : startX, frame.home.y, opts.reduced ? frame.home.z : startZ);
  parts.setExposure(opts.reduced ? 1.06 : 0.68);
  parts.ringsBg.scale.setScalar(opts.reduced ? 1 : 0.86);
  parts.visor.forEach((v) => {
    v.intensity = opts.reduced ? 0.42 : 0.1;
  });

  let elapsed = 0;
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;
  let scroll = 0;
  let scrollT = 0;
  let tweak: HeroTweak = {};

  return {
    setPointer(nx: number, ny: number) {
      if (!opts.pointer || opts.reduced) return;
      tx = clamp(nx, -0.5, 0.5);
      ty = clamp(ny, -0.5, 0.5);
    },
    setScroll(progress: number) {
      scrollT = clamp(progress, 0, 1);
    },
    setTweak(next: HeroTweak) {
      tweak = next;
    },
    update(dt: number) {
      elapsed += dt;
      const t = elapsed * 1000;
      const entryDone = opts.reduced || t >= 1600;
      px = damp(px, opts.reduced || !entryDone ? 0 : tx, 2.8, dt);
      py = damp(py, opts.reduced || !entryDone ? 0 : ty, 2.8, dt);
      scroll = damp(scroll, opts.reduced ? 0 : scrollT, 2.1, dt);

      const blue = opts.reduced ? 1 : windowOut(t, 0, 250);
      const turn = opts.reduced ? 1 : windowTurn(t, 180, 1580);
      const dolly = opts.reduced ? 1 : windowOut(t, 200, 1500);
      const shift = opts.reduced ? 1 : windowOut(t, 300, 1500);
      const rings = opts.reduced ? 1 : windowOut(t, 500, 1600);

      parts.setExposure(lerp(0.68, 1.08, lerp(blue, 1, dolly)));

      let visor = lerp(0.1, 0.34, blue);
      visor = lerp(visor, 0.82, windowOut(t, 180, 900));
      visor = lerp(visor, 0.4, windowOut(t, 900, 1550));
      const idleGlow = entryDone && !opts.reduced ? Math.sin(elapsed * 0.32) * 0.02 : 0;
      parts.visor.forEach((v) => {
        v.intensity = visor + idleGlow;
      });

      const yaw = lerp(ENTRY_ROTATION_Y, FINAL_ROTATION_Y, turn);
      const pitch = lerp(ENTRY_PITCH, 0, turn);
      const posX = lerp(startX, frame.home.x, shift);
      const posZ = lerp(startZ, frame.home.z, shift);

      const sHold = scroll < 0.35 ? 0 : scroll < 0.65 ? (scroll - 0.35) / 0.3 : 1;
      const sPast = scroll < 0.65 ? 0 : scroll < 0.85 ? (scroll - 0.65) / 0.2 : 1;
      const sOut = scroll < 0.85 ? 0 : (scroll - 0.85) / 0.15;
      const scrollMix = entryDone ? 1 : 0;

      const drift = opts.reduced || !entryDone ? 0 : Math.sin(elapsed * 0.18) * IDLE_YAW;
      const liveYaw = tweak.rotY !== undefined ? rad(tweak.rotY) : yaw;
      const homeX = tweak.posX ?? posX;
      const homeY = tweak.posY ?? frame.home.y;
      const homeZ = tweak.posZ ?? posZ;

      parts.model.rotation.y = liveYaw + px * PTR_YAW + sHold * rad(2) * scrollMix + drift;
      parts.model.rotation.x = pitch + py * -PTR_PITCH;
      const pointerX = clamp(px, -0.18, 0.5) * 0.016;
      parts.model.position.x = Math.max(
        frame.home.x - 0.02,
        homeX + pointerX + (sPast * 0.08 + sOut * 0.28) * scrollMix,
      );
      parts.model.position.y = homeY + py * 0.012 + sOut * 0.08 * scrollMix;
      parts.model.position.z = homeZ + (sOut * 0.42) * scrollMix;
      if (tweak.scale !== undefined) parts.model.scale.setScalar(tweak.scale);

      const camX = tweak.camX ?? lerp(frame.cam0.x, frame.cam1.x, dolly);
      const camY = tweak.camY ?? lerp(frame.cam0.y, frame.cam1.y, dolly);
      const camZ = tweak.camZ ?? lerp(frame.cam0.z, frame.cam1.z, dolly);
      const breathe = entryDone && !opts.reduced ? Math.sin(elapsed * 0.22) * camZ * 0.008 : 0;
      parts.camera.position.x = camX + clamp(px, -0.18, 0.5) * 0.02 + (sPast * 0.1 + sOut * 0.22) * scrollMix;
      parts.camera.position.y = camY + py * 0.02 + sOut * 0.08 * scrollMix;
      parts.camera.position.z = camZ - sHold * 0.28 * scrollMix + sOut * 0.55 * scrollMix + breathe;
      look.x = (tweak.lookX ?? frame.look.x) + sPast * 0.08 * scrollMix;
      look.y = (tweak.lookY ?? frame.look.y) + sOut * 0.06 * scrollMix;
      look.z = tweak.lookZ ?? 0;
      parts.camera.lookAt(look.x, look.y, look.z);
      if (tweak.fov !== undefined && parts.camera.fov !== tweak.fov) {
        parts.camera.fov = tweak.fov;
        parts.camera.updateProjectionMatrix();
      }

      parts.key.position.set(lerp(-2.05, -3.2, turn), lerp(1.7, 2.85, turn), lerp(2.4, 1.45, turn));
      parts.key.intensity = lerp(0.82, 1.36, lerp(blue, turn, 0.55));
      parts.rim.position.set(lerp(2.6, 3.25, turn), lerp(1.05, 1.35, turn), lerp(-0.85, -0.25, turn));
      parts.rim.intensity = lerp(0.22, 0.7, turn);
      parts.fill.intensity = lerp(0.12, 0.24, blue);
      if (parts.accent) parts.accent.intensity = lerp(0.12, 0.72, visor) + idleGlow * 4;

      const ringSpin = opts.reduced ? 0 : elapsed * 0.01;
      parts.ringsBg.scale.setScalar(lerp(0.86, 1, rings));
      parts.ringsBg.rotation.y = ringSpin - scroll * 0.22 * scrollMix - px * 0.04;
      parts.ringsBg.position.set(parts.model.position.x + 0.22, parts.model.position.y + 0.78, parts.model.position.z - 0.68 - sHold * 0.18);
      parts.ringsFg.rotation.z = (opts.reduced ? 0 : elapsed * -0.007) + px * 0.04;
      parts.ringsFg.position.set(
        parts.model.position.x + 0.28 + sOut * 0.08,
        parts.model.position.y - 0.18,
        parts.model.position.z + 1.05 + sPast * 0.12,
      );

      if (parts.particles) {
        parts.particles.rotation.y = opts.reduced ? 0 : elapsed * 0.005 - px * 0.02;
        parts.particles.position.set(parts.model.position.x - 0.85, parts.model.position.y + 0.35, -1.05 - scroll * 0.3);
      }
    },
    get debug() {
      return {
        elapsed,
        pointer: { x: px, y: py },
        scroll,
        camera: parts.camera.position.clone(),
        look: { ...look },
        rotation: parts.model.rotation,
        position: parts.model.position.clone(),
        fov: parts.camera.fov,
        entryDeg: (ENTRY_ROTATION_Y * 180) / Math.PI,
        finalDeg: (FINAL_ROTATION_Y * 180) / Math.PI,
      };
    },
  };
}
