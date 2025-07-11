import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { SofaModel } from './SofaModel';

const SofaScene = ({ color }) => {
  return (
    <Canvas 
      shadows 
      dpr={[1, 2]}
      camera={{ fov: 35 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Stage environment="city" intensity={9}>
          <SofaModel color={color} />
        </Stage>
      </Suspense>
      {/* THE FIX: All interactions are now disabled. The model will not rotate or move. */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        enableRotate={false} 
      />
    </Canvas>
  );
};

export default SofaScene;