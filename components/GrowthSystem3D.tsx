"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type GrowthNode = {
  id: string;
  label: string;
  description: string;
  href: string;
  position: [number, number, number];
  progress: number;
};

const NODE_DETAILS = [
  {
    id: "growth",
    label: "Consumer Growth",
    description: "Funnels, loops, activation, retention, and measurable behavior change.",
    href: "/week/6",
    position: [-1.8, 1.2, 0.4] as [number, number, number],
    weeks: [5, 6],
  },
  {
    id: "ai",
    label: "AI-Native Product",
    description: "Product systems where AI changes the workflow, metrics, and user behavior.",
    href: "/week/8",
    position: [1.7, 1.25, -0.2] as [number, number, number],
    weeks: [8],
  },
  {
    id: "experimentation",
    label: "Experimentation",
    description: "Hypotheses, test design, prioritization, and learning velocity.",
    href: "/week/6",
    position: [2.15, -0.75, 0.25] as [number, number, number],
    weeks: [6, 7],
  },
  {
    id: "strategy",
    label: "Product Strategy",
    description: "Turning market context and product judgment into a focused direction.",
    href: "/week/3",
    position: [0.25, -1.55, -0.35] as [number, number, number],
    weeks: [3, 7],
  },
  {
    id: "founder",
    label: "Founder Experience",
    description: "Translating end-to-end ownership into evidence industry teams recognize.",
    href: "/about",
    position: [-2.05, -0.7, -0.25] as [number, number, number],
    weeks: [1, 10],
  },
  {
    id: "research",
    label: "User Research",
    description: "Finding real needs and using evidence to shape product decisions.",
    href: "/week/2",
    position: [-0.1, 0.05, 0.55] as [number, number, number],
    weeks: [2, 4],
  },
];

function GrowthSystemFallback({ nodes }: { nodes: GrowthNode[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 h-full content-center">
      {nodes.map((node) => (
        <Link
          key={node.id}
          href={node.href}
          className="border border-line rounded-md bg-paper/70 px-3 py-2 hover:border-forest transition-colors"
        >
          <span className="block font-mono text-[0.58rem] text-terracotta uppercase tracking-wider">
            {node.progress}% explored
          </span>
          <span className="font-display text-xs font-semibold">{node.label}</span>
        </Link>
      ))}
    </div>
  );
}

export default function GrowthSystem3D({
  completedTasks,
  weekTaskIds,
}: {
  completedTasks: Record<string, string>;
  weekTaskIds: Record<number, string[]>;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef("research");
  const [activeId, setActiveId] = useState("research");
  const [webglAvailable, setWebglAvailable] = useState(true);

  const nodes = useMemo<GrowthNode[]>(
    () =>
      NODE_DETAILS.map((node) => {
        const taskIds = node.weeks.flatMap((week) => weekTaskIds[week] ?? []);
        const completed = taskIds.filter((id) => completedTasks[id]).length;
        return {
          ...node,
          progress: taskIds.length ? Math.round((completed / taskIds.length) * 100) : 0,
        };
      }),
    [completedTasks, weekTaskIds]
  );

  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0];

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      window.setTimeout(() => setWebglAvailable(false), 0);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const styles = getComputedStyle(document.documentElement);
    const forest = new THREE.Color(styles.getPropertyValue("--color-forest").trim());
    const terracotta = new THREE.Color(
      styles.getPropertyValue("--color-terracotta").trim()
    );
    const line = new THREE.Color(styles.getPropertyValue("--color-line").trim());

    const nodeMeshes: THREE.Mesh[] = [];
    nodes.forEach((node, index) => {
      const size = 0.22 + node.progress * 0.0015 + (node.id === "research" ? 0.08 : 0);
      const geometry = new THREE.IcosahedronGeometry(size, 2);
      const material = new THREE.MeshStandardMaterial({
        color: index % 3 === 1 ? terracotta : forest,
        emissive: index % 3 === 1 ? terracotta : forest,
        emissiveIntensity: 0.08,
        roughness: 0.48,
        metalness: 0.12,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...node.position);
      mesh.userData.nodeId = node.id;
      nodeMeshes.push(mesh);
      root.add(mesh);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(size * 1.65, 16, 16),
        new THREE.MeshBasicMaterial({
          color: index % 3 === 1 ? terracotta : forest,
          transparent: true,
          opacity: 0.06 + node.progress * 0.001,
          depthWrite: false,
        })
      );
      halo.position.copy(mesh.position);
      root.add(halo);
    });

    const lineMaterial = new THREE.LineBasicMaterial({
      color: line,
      transparent: true,
      opacity: 0.72,
    });
    const center = nodes.find((node) => node.id === "research")!;
    nodes
      .filter((node) => node.id !== center.id)
      .forEach((node) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...center.position),
          new THREE.Vector3(...node.position),
        ]);
        root.add(new THREE.Line(geometry, lineMaterial));
      });

    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const keyLight = new THREE.PointLight(forest, 14, 20);
    keyLight.position.set(3, 3, 5);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(terracotta, 9, 20);
    fillLight.position.set(-4, -2, 4);
    scene.add(fillLight);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(0, 0);
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isVisible = true;
    let animationFrame = 0;
    const limitMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const intersectNode = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(nodeMeshes)[0]?.object as THREE.Mesh | undefined;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      targetRotationY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.3;
      targetRotationX = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.2;
      const hit = intersectNode(event);
      renderer.domElement.style.cursor = hit ? "pointer" : "grab";
      if (hit?.userData.nodeId) {
        activeIdRef.current = hit.userData.nodeId;
        setActiveId(hit.userData.nodeId);
      }
    };

    const handlePointerLeave = () => {
      targetRotationX = 0;
      targetRotationY = 0;
      renderer.domElement.style.cursor = "grab";
    };

    const handlePointerDown = (event: PointerEvent) => {
      const hit = intersectNode(event);
      if (hit?.userData.nodeId) {
        activeIdRef.current = hit.userData.nodeId;
        setActiveId(hit.userData.nodeId);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };

    const clock = new THREE.Clock();
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      root.rotation.x += (targetRotationX - root.rotation.x) * 0.035;
      root.rotation.y +=
        (targetRotationY + (limitMotion ? 0 : elapsed * 0.035) - root.rotation.y) *
        0.025;
      nodeMeshes.forEach((mesh, index) => {
        if (!limitMotion) {
          mesh.position.y =
            nodes[index].position[1] + Math.sin(elapsed * 0.7 + index) * 0.055;
        }
        const selected = mesh.userData.nodeId === activeIdRef.current;
        const scale = selected ? 1.22 : 1;
        mesh.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08);
      });
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("visibilitychange", handleVisibility);
    resize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [nodes]);

  const selectNode = (id: string) => {
    activeIdRef.current = id;
    setActiveId(id);
  };

  return (
    <section
      aria-labelledby="growth-system-title"
      className="relative h-full min-h-[28rem] overflow-hidden rounded-xl border border-line bg-card"
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4">
        <div>
          <p className="font-mono text-[0.6rem] text-terracotta uppercase tracking-[0.18em]">
            Interactive portfolio map
          </p>
          <h2 id="growth-system-title" className="font-display text-sm font-semibold mt-1">
            The Growth System
          </h2>
        </div>
        <span className="font-mono text-[0.55rem] text-ink/60 uppercase tracking-wider">
          <span className="hidden sm:inline">Hover to explore</span>
          <span className="sm:hidden">Tap to explore</span>
        </span>
      </div>

      {webglAvailable ? (
        <div ref={mountRef} aria-hidden="true" className="absolute inset-0 growth-system-canvas" />
      ) : (
        <GrowthSystemFallback nodes={nodes} />
      )}

      <div className="absolute inset-x-4 bottom-4 z-10 rounded-lg border border-line bg-paper/90 p-3 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-sm font-semibold text-forest">
              {activeNode.label}
            </p>
            <p className="text-xs text-ink/70 mt-1 leading-relaxed">
              {activeNode.description}
            </p>
          </div>
          <Link
            href={activeNode.href}
            className="shrink-0 font-mono text-[0.6rem] uppercase tracking-wider text-forest hover:underline"
          >
            Explore →
          </Link>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3" aria-label="Growth system topics">
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => selectNode(node.id)}
              aria-pressed={node.id === activeId}
              className={`rounded-full border px-2 py-1 font-mono text-[0.55rem] uppercase tracking-wide transition-colors ${
                node.id === activeId
                  ? "border-forest bg-forest text-paper"
                  : "border-line text-ink/65 hover:border-forest hover:text-forest"
              }`}
            >
              {node.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
