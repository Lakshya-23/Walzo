import React, { useRef, useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function SofaModel({ color }) {
  const { nodes, materials } = useGLTF('/sofa.glb');
  const meshRef = useRef();

  
  useLayoutEffect(() => {
    
    
    meshRef.current.material = materials['01___Default'].clone();
  }, [materials]);

  
  useLayoutEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      
      
      meshRef.current.material.color.set(new THREE.Color(color));
    }
  }, [color]);

  return (
    <group dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.defaultMaterial.geometry}
        
        material={materials['01___Default']} 
        position={[0, -1, 0]}
        scale={1.5}
      />
    </group>
  );
}

useGLTF.preload('/sofa.glb');