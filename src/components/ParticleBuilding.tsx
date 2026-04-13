import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Building wireframe vertices - architectural blueprint shape
const generateBuildingPoints = (count: number) => {
  const points: number[] = [];
  
  // Main tower
  for (let i = 0; i < count * 0.4; i++) {
    const x = (Math.random() - 0.5) * 2;
    const y = Math.random() * 5 - 1;
    const z = (Math.random() - 0.5) * 2;
    // Constrain to building edges
    const edge = Math.random();
    if (edge < 0.3) {
      points.push(x > 0 ? 1 : -1, y, z);
    } else if (edge < 0.6) {
      points.push(x, y, z > 0 ? 1 : -1);
    } else {
      points.push(x, y, z);
    }
  }
  
  // Horizontal floors
  for (let floor = 0; floor < 8; floor++) {
    const y = floor * 0.7 - 1;
    for (let i = 0; i < count * 0.05; i++) {
      points.push((Math.random() - 0.5) * 2, y, (Math.random() - 0.5) * 2);
    }
  }
  
  // Base/foundation wider
  for (let i = 0; i < count * 0.2; i++) {
    const x = (Math.random() - 0.5) * 3;
    const z = (Math.random() - 0.5) * 3;
    points.push(x, -1 + Math.random() * 0.3, z);
  }

  return new Float32Array(points);
};

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const count = 1500; // Reduced from 3000 for better performance
  const progressRef = useRef(0);
  const frameSkip = useRef(0);
  // Cache color objects to avoid GC pressure inside useFrame
  const cobaltColor = useMemo(() => new THREE.Color("hsl(222, 68%, 33%)"), []);
  const orangeColor = useMemo(() => new THREE.Color("hsl(20, 100%, 58%)"), []);

  const { positions, targetPositions, colors, initialPositions } = useMemo(() => {
    const target = generateBuildingPoints(count);
    const initial = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const cobalt = new THREE.Color("hsl(222, 68%, 33%)");
    const orange = new THREE.Color("hsl(20, 100%, 58%)");
    
    for (let i = 0; i < count; i++) {
      // Start scattered
      initial[i * 3] = (Math.random() - 0.5) * 20;
      initial[i * 3 + 1] = (Math.random() - 0.5) * 20;
      initial[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      pos[i * 3] = initial[i * 3];
      pos[i * 3 + 1] = initial[i * 3 + 1];
      pos[i * 3 + 2] = initial[i * 3 + 2];
      
      col[i * 3] = cobalt.r;
      col[i * 3 + 1] = cobalt.g;
      col[i * 3 + 2] = cobalt.b;
    }
    
    return { positions: pos, targetPositions: target, colors: col, initialPositions: initial };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Throttle: skip every other frame to reduce main-thread work
    frameSkip.current = (frameSkip.current + 1) % 2;
    if (frameSkip.current !== 0) return;
    
    progressRef.current = Math.min(progressRef.current + delta * 0.3, 1);
    const p = progressRef.current;
    const eased = 1 - Math.pow(1 - p, 3);
    
    const posArr = meshRef.current.geometry.attributes.position.array as Float32Array;
    const colArr = meshRef.current.geometry.attributes.color.array as Float32Array;
    
    const cobalt = cobaltColor;
    const orange = orangeColor;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const targetX = targetPositions[i3];
      const targetY = targetPositions[i3 + 1];
      const targetZ = targetPositions[i3 + 2];
      
      // Lerp toward target
      posArr[i3] += (initialPositions[i3] + (targetX - initialPositions[i3]) * eased - posArr[i3]) * 0.05;
      posArr[i3 + 1] += (initialPositions[i3 + 1] + (targetY - initialPositions[i3 + 1]) * eased - posArr[i3 + 1]) * 0.05;
      posArr[i3 + 2] += (initialPositions[i3 + 2] + (targetZ - initialPositions[i3 + 2]) * eased - posArr[i3 + 2]) * 0.05;
      
      // Mouse distortion
      if (eased > 0.5) {
        const dx = mouseRef.current.x * viewport.width * 0.5 - posArr[i3];
        const dy = mouseRef.current.y * viewport.height * 0.5 - posArr[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3) {
          const force = (3 - dist) * 0.02;
          posArr[i3] += dx * force * 0.1;
          posArr[i3 + 1] += dy * force * 0.1;
        }
      }
      
      // Orange sweep based on Y position
      const sweepProgress = Math.max(0, eased - 0.6) / 0.4;
      const normalizedY = (targetY + 1) / 6;
      const isOrange = normalizedY < sweepProgress;
      
      const color = isOrange ? orange : cobalt;
      colArr[i3] += (color.r - colArr[i3]) * 0.05;
      colArr[i3 + 1] += (color.g - colArr[i3 + 1]) * 0.05;
      colArr[i3 + 2] += (color.b - colArr[i3 + 2]) * 0.05;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
    
    // Gentle rotation
    meshRef.current.rotation.y += delta * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleBuilding() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
