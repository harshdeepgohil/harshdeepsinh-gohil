"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { getIcon, type IconKey } from "@/lib/icons";
import type { Skill } from "@/data/portfolio";

const RADIUS = 2.4;

/** Draws a brand logo onto a round glass badge and returns it as a texture. */
function makeBadgeTexture(icon: IconKey) {
  const def = getIcon(icon);
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;

  const r = size / 2 - 6;
  const grad = ctx.createLinearGradient(0, 0, size, size);
  grad.addColorStop(0, "rgba(59,130,246,0.9)");
  grad.addColorStop(1, "rgba(139,92,246,0.9)");
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(16,16,26,0.92)";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = grad;
  ctx.stroke();

  const iconSize = 120;
  ctx.save();
  ctx.translate((size - iconSize) / 2, (size - iconSize) / 2);
  ctx.scale(iconSize / 24, iconSize / 24);
  ctx.fillStyle = def.hex;
  ctx.fill(new Path2D(def.path), def.fillRule ?? "nonzero");
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Evenly distributes N points on a sphere (Fibonacci lattice). */
function fibonacciSphere(n: number, radius: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return pts;
}

function Badge({
  skill,
  position,
  texture,
  hovered,
  setHovered,
}: {
  skill: Skill;
  position: THREE.Vector3;
  texture: THREE.Texture;
  hovered: boolean;
  setHovered: (name: string | null) => void;
}) {
  const ref = useRef<THREE.Sprite>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = hovered ? 0.95 : 0.66;
    const s = THREE.MathUtils.damp(ref.current.scale.x, target, 10, delta);
    ref.current.scale.setScalar(s);
  });

  return (
    <sprite
      ref={ref}
      position={position}
      scale={0.66}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(skill.name);
      }}
      onPointerOut={() => setHovered(null)}
    >
      <spriteMaterial map={texture} transparent depthWrite={false} />
      {hovered && (
        <Html center position={[0, -0.75, 0]} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
          <span className="glass block rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap text-fg">
            {skill.name}
          </span>
        </Html>
      )}
    </sprite>
  );
}

function Cloud({ skills }: { skills: Skill[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const positions = useMemo(() => fibonacciSphere(skills.length, RADIUS), [skills.length]);
  const textures = useMemo(() => skills.map((s) => makeBadgeTexture(s.icon)), [skills]);

  useEffect(() => () => textures.forEach((t) => t.dispose()), [textures]);

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [hovered]);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.96, 24, 16]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.07} />
      </mesh>
      {skills.map((s, i) => (
        <Badge
          key={s.name}
          skill={s}
          position={positions[i]}
          texture={textures[i]}
          hovered={hovered === s.name}
          setHovered={setHovered}
        />
      ))}
    </group>
  );
}

export default function TechSphere({ skills, active }: { skills: Skill[]; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
    >
      <Suspense fallback={null}>
        <Cloud skills={skills} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
          rotateSpeed={0.55}
          enableDamping
          dampingFactor={0.08}
        />
      </Suspense>
    </Canvas>
  );
}
