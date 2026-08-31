export function mountHeroWebgl(root: HTMLElement) {
  const canvas = root.querySelector<HTMLCanvasElement>('[data-hero-canvas]');
  if (!canvas) return () => undefined;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isNarrow = window.matchMedia('(max-width: 768px)').matches;
  if (reduce) return () => undefined;

  let disposed = false;
  let renderer: import('three').WebGLRenderer | undefined;
  let frame = 0;
  let visible = true;

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries.some((e) => e.isIntersecting);
    },
    { threshold: 0.05 },
  );
  io.observe(root);

  const start = async () => {
    let THREE: typeof import('three');
    try {
      THREE = await import('three');
    } catch {
      return;
    }
    if (disposed) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
    camera.position.set(0, 0.15, 6.4);

    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isNarrow,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const silver = new THREE.MeshPhysicalMaterial({
      color: 0xe8e4db,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    });
    const ceramic = new THREE.MeshPhysicalMaterial({
      color: 0xf4f1ea,
      metalness: 0.08,
      roughness: 0.32,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
    });
    const graphite = new THREE.MeshPhysicalMaterial({
      color: 0x1a1a18,
      metalness: 0.85,
      roughness: 0.35,
    });
    const acrylic = new THREE.MeshPhysicalMaterial({
      color: 0xf7f4ee,
      metalness: 0.05,
      roughness: 0.08,
      transmission: 0.55,
      thickness: 0.6,
      transparent: true,
      opacity: 0.92,
      ior: 1.4,
    });
    const core = new THREE.MeshStandardMaterial({
      color: 0xe85a32,
      emissive: 0xe85a32,
      emissiveIntensity: 2.4,
      roughness: 0.35,
      metalness: 0.2,
    });

    const group = new THREE.Group();
    group.rotation.x = 0.28;
    group.rotation.y = -0.45;

    const torus = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.22, 28, isNarrow ? 64 : 120), silver);
    torus.rotation.x = Math.PI / 2.4;
    group.add(torus);

    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.07, 16, 64), graphite);
    torus2.rotation.y = 0.7;
    torus2.rotation.x = 0.4;
    group.add(torus2);

    const shell = new THREE.Mesh(new THREE.SphereGeometry(0.72, 32, 32), acrylic);
    group.add(shell);

    const inner = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), core);
    group.add(inner);

    const cap = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 1.35, 8, 16), ceramic);
    cap.rotation.z = 0.55;
    cap.position.set(0.15, 0.05, 0);
    group.add(cap);

    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 48), graphite);
    disc.rotation.x = Math.PI / 2;
    disc.position.set(-0.15, -0.35, 0.2);
    group.add(disc);

    const rodGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.8, 12);
    for (let i = 0; i < 3; i += 1) {
      const rod = new THREE.Mesh(rodGeo, silver);
      rod.rotation.z = (i * Math.PI) / 3 + 0.3;
      rod.position.set(Math.cos(i) * 0.12, Math.sin(i) * 0.08, 0);
      group.add(rod);
    }

    scene.add(group);

    scene.add(new THREE.HemisphereLight(0xf3f1ea, 0x2a2018, 1.05));
    const key = new THREE.DirectionalLight(0xffffff, 1.8);
    key.position.set(4, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffe8dc, 0.7);
    rim.position.set(-5, 1, -3);
    scene.add(rim);
    const glow = new THREE.PointLight(0xe85a32, 6, 8, 2);
    glow.position.set(0.1, 0, 0.2);
    group.add(glow);

    const pointer = { x: 0, y: 0 };
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.35;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.2;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const setSize = () => {
      if (!renderer) return;
      const { clientWidth: w, clientHeight: h } = root;
      const dpr = Math.min(window.devicePixelRatio || 1, isNarrow ? 1.25 : 1.6);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(root);

    canvas.classList.add('is-ready');

    const clock = new THREE.Clock();
    const tick = () => {
      if (disposed) return;
      frame = requestAnimationFrame(tick);
      if (!visible || document.hidden || !renderer) return;
      const t = clock.getElapsedTime();
      group.rotation.y = -0.45 + t * 0.12 + pointer.x;
      group.rotation.x = 0.28 + Math.sin(t * 0.35) * 0.06 + pointer.y;
      inner.scale.setScalar(1 + Math.sin(t * 2.2) * 0.04);
      renderer.render(scene, camera);
    };
    tick();

    const cleanup = () => {
      disposed = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      silver.dispose();
      ceramic.dispose();
      graphite.dispose();
      acrylic.dispose();
      core.dispose();
      torus.geometry.dispose();
      torus2.geometry.dispose();
      shell.geometry.dispose();
      inner.geometry.dispose();
      cap.geometry.dispose();
      disc.geometry.dispose();
      rodGeo.dispose();
      renderer?.dispose();
      renderer = undefined;
    };

    (root as HTMLElement & { __heroCleanup?: () => void }).__heroCleanup = cleanup;
  };

  void start();

  return () => {
    disposed = true;
    io.disconnect();
    const extra = (root as HTMLElement & { __heroCleanup?: () => void }).__heroCleanup;
    extra?.();
  };
}
