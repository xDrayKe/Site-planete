import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

function Planete({ nom, taille, texture, rayon, vitesse }) {
    const meshRef = useRef(); // Référence à la planète pour pouvoir la manipuler

    // Variable pour garder trace de l'angle de la planète
    const angleRef = useRef(Math.random() * Math.PI * 2); // Angle initial aléatoire

    useFrame(() => {
        angleRef.current += vitesse;

        const x = rayon * Math.cos(angleRef.current);
        const z = rayon * Math.sin(angleRef.current);

        meshRef.current.position.set(x, 0, z);

    });

    return (
        <mesh ref={meshRef} position={[rayon, 0, 0]}>
            <sphereGeometry args={[taille, 32, 32]} />
            <meshStandardMaterial map={new THREE.TextureLoader().load(texture)} />
        </mesh>
    );
}

export default Planete;
