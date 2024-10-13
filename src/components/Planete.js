import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

function Planete({ nom, taille, texture, rayon, vitesse }) {
    const textureMap = useLoader(THREE.TextureLoader, texture);

    // Utiliser useRef pour garder une référence à la planète
    const planetRef = useRef();

    // Utiliser useFrame pour animer la planète
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        const angle = elapsedTime * vitesse;

        // Calcul de la position circulaire autour du soleil
        const x = rayon * Math.cos(angle);
        const z = rayon * Math.sin(angle);

        // Mise à jour de la position de la planète
        if (planetRef.current) {
            planetRef.current.position.set(x, 0, z);
        }
    });

    return (
        <mesh ref={planetRef}>
            <sphereGeometry args={[taille, 32, 32]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    );
}

export default Planete;
