import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const ParticleCloud = ({ isMobile }) => {
  const ref = useRef();
  
  // Create 5000 points in a sphere. 
  // Float32Array length should be number_of_points * 3.
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 2.5 }), []);

  useFrame((state, delta) => {
    // Base continuous rotation
    ref.current.rotation.y -= delta / 15;
    ref.current.rotation.x -= delta / 20;
    
    // Interactive mouse rotation - making the cluster react to mouse position!
    const { x, y } = state.pointer;
    // We smooth it out so it feels nice and fluid
    ref.current.rotation.y += x * 0.05;
    ref.current.rotation.x += y * 0.05;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#915EFF"
          size={isMobile ? 0.03 : 0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const HeroParticlesCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 4] }}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ParticleCloud isMobile={isMobile} />
      <Preload all />
    </Canvas>
  );
};

export default HeroParticlesCanvas;
