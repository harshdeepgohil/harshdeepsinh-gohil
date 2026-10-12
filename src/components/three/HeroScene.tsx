"use client";

import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, type ComponentRef } from "react";
import * as THREE from "three";

type DistortMat = ComponentRef<typeof MeshDistortMaterial>;

/** Window-level pointer (the hero text overlays the canvas, so R3F events never fire). */
const pointer = { x: 0, y: 0, energy: 0 };
function usePointer() {
  useEffect(() => {
    let lx = 0;
    let ly = 0;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.energy = Math.min(1, pointer.energy + Math.hypot(x - lx, y - ly) * 2);
      pointer.x = lx = x;
      pointer.y = ly = y;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

function Blob() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useRef<DistortMat>(null);
  const { viewport } = useThree();

  // Sit to the right on wide screens, centred behind the text on narrower ones.
  const wide = viewport.width > 7;
  const baseX = wide ? viewport.width * 0.25 : 0;
  const scale = wide ? Math.min(1.5, viewport.width * 0.11) : 1.15;

  usePointer();

  useFrame((_, delta) => {
    if (!mesh.current || !mat.current) return;
    const { x, y } = pointer;
    pointer.energy *= Math.pow(0.04, delta);
    const damp = 1 - Math.pow(0.001, delta);
    mesh.current.rotation.y += (x * 0.6 - mesh.current.rotation.y) * damp * 0.6;
    mesh.current.rotation.x += (-y * 0.4 - mesh.current.rotation.x) * damp * 0.6;
    mesh.current.position.x += (baseX + x * 0.35 - mesh.current.position.x) * damp * 0.5;
    mesh.current.position.y += (y * 0.25 - mesh.current.position.y) * damp * 0.5;
    const targetDistort = 0.42 + pointer.energy * 0.3;
    mat.current.distort += (targetDistort - mat.current.distort) * damp * 0.4;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.9}>
      <mesh
        ref={mesh}
        scale={scale}
        position={[baseX, 0, 0]}
      >
        <icosahedronGeometry args={[1, 28]} />
        <MeshDistortMaterial
          ref={mat}
          color="#9aa8ff"
          roughness={0.06}
          metalness={0.45}
          clearcoat={1}
          clearcoatRoughness={0.08}
          iridescence={1}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[200, 1100]}
          envMapIntensity={1.4}
          distort={0.38}
          speed={1.8}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 700 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.025;
    points.current.rotation.x += (pointer.y * 0.08 - points.current.rotation.x) * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#a5b4fc" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} color="#c7d2fe" />
        <pointLight position={[-4, -2, 2]} intensity={18} color="#8b5cf6" />
        <Blob />
        <Particles />
        {/* Procedural environment — no HDR download needed */}
        <Environment resolution={128} frames={1}>
          <Lightformer form="ring" intensity={3} color="#3b82f6" position={[-4, 2, -3]} scale={4} />
          <Lightformer form="rect" intensity={4} color="#8b5cf6" position={[4, -1, -2]} scale={[6, 3, 1]} />
          <Lightformer form="rect" intensity={2.5} color="#ffffff" position={[0, 5, 2]} rotation-x={Math.PI / 2} scale={[8, 2, 1]} />
          <Lightformer form="circle" intensity={2} color="#ec4899" position={[2, -4, 3]} scale={3} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
