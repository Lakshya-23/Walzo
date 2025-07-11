import React, { useRef, useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function SofaModel({ color }) {
  const { nodes, materials } = useGLTF('/sofa.glb');
  const meshRef = useRef();

  // This effect runs once to set up the material properly
  useLayoutEffect(() => {
    // Clone the material to ensure we don't modify the original
    // in a way that affects other instances. This is best practice.
    meshRef.current.material = materials['01___Default'].clone();
  }, [materials]);

  // This effect runs ONLY when the color prop changes
  useLayoutEffect(() => {
    if (meshRef.current && meshRef.current.material) {
      // Set the color on the CLONED material.
      // This preserves all other properties like textures, roughness maps, etc.
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
        // We assign the original material here, but our effects will override it
        material={materials['01___Default']} 
        position={[0, -1, 0]}
        scale={1.5}
      />
    </group>
  );
}

useGLTF.preload('/sofa.glb');