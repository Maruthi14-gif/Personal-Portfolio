import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Float, Html } from "@react-three/drei";
import CanvasLoader from "../Loader";

const HackerTerminal = ({ isMobile }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={[0, isMobile ? -1 : -0.5, 0]} rotation={[0, 0, 0]} scale={isMobile ? 0.7 : 1.2}>
        {/* Screen Bezel */}
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
        
        {/* Terminal Screen glow */}
        <mesh position={[0, 0, 0.11]}>
          <planeGeometry args={[3.8, 2.3]} />
          <meshBasicMaterial color="#001100" />
        </mesh>

        {/* HTML Terminal Content */}
        <Html 
          transform 
          position={[0, 0, 0.12]} 
          scale={0.1}
          className="w-[380px] h-[230px] flex flex-col p-4 text-[#00ff00] font-mono text-sm overflow-hidden"
          style={{ backgroundColor: '#001100', border: '2px solid #00ff00', boxShadow: '0 0 15px #00ff0055', borderRadius: '5px' }}
        >
          <div className="flex flex-col h-full opacity-90">
            <p>root@maruthi:~$ init_system --override</p>
            <p className="mt-1 text-gray-400">[OK] Kernel loaded...</p>
            <p className="mt-1 text-gray-400">[OK] Cybersecurity protocols engaged...</p>
            <p className="mt-1 text-gray-400">[OK] DSA modules compiled...</p>
            <p className="mt-2 text-[#00ff00]">Establishing secure connection...</p>
            <p className="mt-1 text-[#00ff00]">Access Granted.</p>
            <p className="mt-2 animate-pulse">root@maruthi:~$ _</p>
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

const HackerTerminalCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2.5}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <HackerTerminal isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default HackerTerminalCanvas;
