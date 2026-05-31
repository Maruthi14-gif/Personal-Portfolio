import React, { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload, Float } from "@react-three/drei";
import * as THREE from "three";

// Procedural Eyeball texture helper
const createEyeballTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  // Sclera (White base)
  ctx.fillStyle = "#fafafa";
  ctx.fillRect(0, 0, 512, 512);

  // Subtle veins
  ctx.strokeStyle = "rgba(220, 38, 38, 0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 22; i++) {
    ctx.beginPath();
    ctx.moveTo(256 + (Math.random() - 0.5) * 80, 256 + (Math.random() - 0.5) * 80);
    let x = 256;
    let y = 256;
    const angle = Math.random() * Math.PI * 2;
    for (let j = 0; j < 6; j++) {
      x += Math.cos(angle) * 35 + (Math.random() - 0.5) * 20;
      y += Math.sin(angle) * 35 + (Math.random() - 0.5) * 20;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Iris (Deep indigo/teal gradient)
  const irisRadius = 140;
  const irisGrad = ctx.createRadialGradient(256, 256, 25, 256, 256, irisRadius);
  irisGrad.addColorStop(0, "#4f46e5"); // Indigo
  irisGrad.addColorStop(0.3, "#06b6d4"); // Cyan
  irisGrad.addColorStop(0.7, "#0d9488"); // Teal
  irisGrad.addColorStop(1, "#09090b"); // Dark edge
  ctx.fillStyle = irisGrad;
  ctx.beginPath();
  ctx.arc(256, 256, irisRadius, 0, Math.PI * 2);
  ctx.fill();

  // Iris radial lines for realistic texture
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 1.2;
  for (let a = 0; a < 360; a += 2) {
    const rad = (a * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(rad) * 40, 256 + Math.sin(rad) * 40);
    ctx.lineTo(256 + Math.cos(rad) * (80 + Math.random() * 45), 256 + Math.sin(rad) * (80 + Math.random() * 45));
    ctx.stroke();
  }

  // Pupil (Dark black)
  ctx.fillStyle = "#010103";
  ctx.beginPath();
  ctx.arc(256, 256, 42, 0, Math.PI * 2);
  ctx.fill();

  // Specular Highlights (reflection)
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.beginPath();
  ctx.arc(215, 215, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.beginPath();
  ctx.arc(195, 235, 8, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const Eyeball = ({ position, scrollProgress, texture, isRight = false, mouse }) => {
  const eyeRef = useRef();
  const groupRef = useRef();
  const topEyelidRef = useRef();
  const bottomEyelidRef = useRef();
  
  const blinkTimer = useRef(0);
  const blinkState = useRef("open");
  const blinkVal = useRef(0);

  const currentLook = useRef(new THREE.Vector3(0, 0, 4));

  useFrame((state, delta) => {
    const p = typeof scrollProgress === "number" ? scrollProgress : (scrollProgress?.get ? scrollProgress.get() : 0);

    // Update eyeball group position dynamically on scroll (split eyes horizontally)
    if (groupRef.current) {
      const offsetX = p * 7.5;
      groupRef.current.position.x = position[0] + (isRight ? offsetX : -offsetX);
    }

    // Smooth cursor look-at tracking (fades out as we scroll deep through portal)
    const factor = Math.max(0, 1 - p * 1.8);
    const targetX = mouse.current.x * 2.8 * factor + position[0];
    const targetY = mouse.current.y * 1.8 * factor + position[1];
    const targetZ = 3.5;

    currentLook.current.x = THREE.MathUtils.lerp(currentLook.current.x, targetX, 0.08);
    currentLook.current.y = THREE.MathUtils.lerp(currentLook.current.y, targetY, 0.08);
    currentLook.current.z = THREE.MathUtils.lerp(currentLook.current.z, targetZ, 0.08);

    if (eyeRef.current) {
      eyeRef.current.lookAt(currentLook.current);
    }

    // Blink animation
    blinkTimer.current += delta;
    if (blinkState.current === "open" && blinkTimer.current > 3 + Math.random() * 4) {
      blinkState.current = "closing";
      blinkTimer.current = 0;
    }

    if (blinkState.current === "closing") {
      blinkVal.current = Math.min(1, blinkVal.current + delta * 15);
      if (blinkVal.current === 1) {
        blinkState.current = "opening";
      }
    } else if (blinkState.current === "opening") {
      blinkVal.current = Math.max(0, blinkVal.current - delta * 10);
      if (blinkVal.current === 0) {
        blinkState.current = "open";
      }
    }

    // Eyelid rotation closure offsets
    if (topEyelidRef.current) {
      topEyelidRef.current.rotation.x = -Math.PI / 2 + (Math.PI / 2) * blinkVal.current;
    }
    if (bottomEyelidRef.current) {
      bottomEyelidRef.current.rotation.x = Math.PI / 2 - (Math.PI / 2) * blinkVal.current;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 3D Eyeball */}
      <mesh ref={eyeRef} castShadow receiveShadow>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.05} 
          metalness={0.0}
        />
      </mesh>

      {/* Top Eyelid */}
      <mesh ref={topEyelidRef} castShadow>
        <sphereGeometry args={[0.765, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#020205" roughness={0.7} />
      </mesh>

      {/* Bottom Eyelid */}
      <mesh ref={bottomEyelidRef} castShadow>
        <sphereGeometry args={[0.765, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#020205" roughness={0.7} />
      </mesh>
    </group>
  );
};

const SceneContent = ({ scrollProgress }) => {
  const portalRef = useRef();
  const envRef = useRef();
  const particlesRef = useRef();

  const { camera } = useThree();

  // Eyeball texture generated once and cached
  const texture = useMemo(() => createEyeballTexture(), []);

  // Window-level mouse position listener
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas texture generator for floating icons
  const drawIconTexture = (name, color) => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    
    // Glassmorphic translucent backing
    ctx.fillStyle = "rgba(10, 10, 20, 0.7)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(64, 64, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Emissive outline glow circle
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(64, 64, 52, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // Tech label text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, 64, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  const icons = useMemo(() => [
    { name: "React", color: "#61dafb", pos: [-1.8, 1.3, -4] },
    { name: "NodeJS", color: "#68a063", pos: [2.0, -1.0, -3.5] },
    { name: "Python", color: "#ffde57", pos: [-2.2, -1.2, -4.8] },
    { name: "AWS", color: "#ff9900", pos: [2.0, 1.2, -4.2] },
    { name: "Tailwind", color: "#38bdf8", pos: [0, 1.8, -5.5] },
    { name: "ThreeJS", color: "#ff007f", pos: [-1.0, -2.0, -5.2] }
  ], []);

  // Custom textures for icons, compiled once
  const iconTextures = useMemo(() => {
    return icons.map(i => drawIconTexture(i.name, i.color));
  }, [icons]);

  // Ambient particles
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(250 * 3);
    for (let i = 0; i < 250 * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const p = typeof scrollProgress === "number" ? scrollProgress : (scrollProgress?.get ? scrollProgress.get() : 0);

    // Scroll mapping camera pushing
    // Starts at Z=5, passes portal at Z=0, and enters the tech dimension down to Z=-5
    const camZ = THREE.MathUtils.lerp(5.0, -5.0, p);
    camera.position.z = camZ;

    // Cursor-based camera parallax offsets
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.35, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.25, 0.05);
    camera.lookAt(0, 0, camZ - 5);

    // Portal geometry scale and opacity control
    if (portalRef.current) {
      // Scales from 0 to 5.5
      const portalScale = p * 5.5;
      portalRef.current.scale.set(portalScale, portalScale, portalScale);

      const mat = portalRef.current.material;
      if (mat) {
        // Fade in as eyes split, fade out as camera flies past
        mat.opacity = p < 0.4
          ? p * 2.5
          : Math.max(0, 1 - (p - 0.4) * 2);
      }
    }

    // Rotate elements
    if (envRef.current) {
      envRef.current.rotation.y = state.clock.getElapsedTime() * 0.05 + mouse.current.x * 0.1;
      envRef.current.rotation.x = mouse.current.y * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 3, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 1]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[0, 0, -2]} intensity={2.0} color="#06b6d4" />

      {/* 1. Left/Right Eye Group (separate and scale down on scroll) */}
      <Eyeball 
        position={[-1.25, 0, 0]} 
        scrollProgress={scrollProgress} 
        texture={texture}
        isRight={false}
        mouse={mouse}
      />
      <Eyeball 
        position={[1.25, 0, 0]} 
        scrollProgress={scrollProgress} 
        texture={texture}
        isRight={true}
        mouse={mouse}
      />

      {/* 2. Portal Ring */}
      <mesh ref={portalRef} position={[0, 0, -0.6]} scale={[0, 0, 0]}>
        <torusGeometry args={[1.0, 0.07, 16, 100]} />
        <meshStandardMaterial 
          color="#9065ff" 
          emissive="#a855f7" 
          emissiveIntensity={2.5} 
          transparent 
          opacity={0}
        />
      </mesh>

      {/* 3. Futuristic Floating Tech Logos */}
      <group ref={envRef} position={[0, 0, -1]}>
        {icons.map((icon, idx) => (
          <Float key={idx} speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
            <mesh position={icon.pos}>
              <planeGeometry args={[0.9, 0.9]} />
              <meshBasicMaterial 
                map={iconTextures[idx]} 
                transparent 
                side={THREE.DoubleSide} 
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* 4. Glowing Particle Field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={250}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.05} 
          color="#8b5cf6" 
          transparent 
          opacity={0.5} 
          sizeAttenuation 
        />
      </points>
    </>
  );
};

const PortalHeroCanvas = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none bg-black">
      <Canvas 
        shadows
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <SceneContent scrollProgress={scrollProgress} />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default PortalHeroCanvas;
