'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const whiteColor = new THREE.Color('#ffffff');
    const starBlueColor = new THREE.Color('#e0f2fe');
    const goldColor = new THREE.Color('#f5a623');
    const palette = [whiteColor, whiteColor, whiteColor, starBlueColor, goldColor]; // More white stars for realism

    for (let i = 0; i < count; i++) {
      // Wider spread for starfield
      const r = 2 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.03;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function FloatingOrb({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

function SpanishFlag() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const flagTexture = useTexture('/spain-flag.png');

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: flagTexture },
    }),
    [flagTexture]
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }
    if (meshRef.current) {
      // Moving right to left and up down
      meshRef.current.position.x = Math.sin(t * 0.4) * 5.0; // Left to right sweeping
      meshRef.current.position.y = Math.cos(t * 0.25) * 3.0; // Up and down drifting
      meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.15; // Gentle rocking
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec3 pos = position;
      // Enhanced waving effect moving right to left
      pos.z += sin(pos.x * 2.5 + uTime * 4.0) * 0.8;
      pos.z += sin(pos.y * 2.0 + uTime * 2.5) * 0.4;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform sampler2D uTexture;
    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      float shadow = sin(vUv.x * 2.5 + uTime * 4.0) * 0.15 + 0.85;
      
      // Soft edges so we don't see the hard boundary of the plane when it moves
      float alpha = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x) * 
                    smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
                    
      gl_FragColor = vec4(texColor.rgb * shadow, alpha * 0.3); // Slightly more visible
    }
  `;

  return (
    // Scale made much larger so it fills the screen even when moving left/right
    <mesh ref={meshRef} position={[0, 0, -6]} scale={[30, 20, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#f5a623" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a78bfa" />
      <SpanishFlag />
      <ParticleField />
      <FloatingOrb position={[-4, 2, -2]} color="#f5a623" scale={1.5} />
      <FloatingOrb position={[4, -2, -3]} color="#a78bfa" scale={2} />
      <FloatingOrb position={[0, -3, -1]} color="#38bdf8" scale={1} />
    </Canvas>
  );
}
