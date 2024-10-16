import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Planete from './components/Planete';
import { PlaneteModel } from './components/PlaneteModel';
import * as THREE from 'three';
import { useRef, useState } from 'react';


function generateRandomSpeed(min = 0.001, max = 0.01) {
  return Math.random() * (max - min) + min;
}

// Composant pour la caméra qui suit une planète sélectionnée
function CameraControls({ selectedPlanetRef }) {
  useFrame((state) => {
    if (selectedPlanetRef && selectedPlanetRef.current) {
      const planetPosition = selectedPlanetRef.current.position.clone();
      const cameraPosition = new THREE.Vector3(
        planetPosition.x,
        planetPosition.y + 50, // Caméra 50 unités plus haut que la planète
        planetPosition.z + 50  // Caméra légèrement derrière la planète (modifie cette valeur selon ton besoin)
      );

      // Déplacement progressif de la caméra vers la position cible
      state.camera.position.lerp(cameraPosition, 0.1);
      state.camera.lookAt(planetPosition); // Fixer le regard sur la planète
    }
  });

  return null;
}
function Scene() {
  const Soleil = new PlaneteModel("Soleil", 20, [0, 0, 0], "textures/soleil.png", "Soleil", 0, generateRandomSpeed());
  const Mercure = new PlaneteModel("Mercure", 5, [30, 0, 0], "textures/mercure.jpg", "Mercure", 30, generateRandomSpeed());
  const Venus = new PlaneteModel("Venus", 6, [50, 0, 0], "textures/venus.jpg", "Vénus", 50, generateRandomSpeed());
  const Terre = new PlaneteModel("Terre", 7, [70, 0, 0], "textures/terre.jpg", "La Terre", 70, generateRandomSpeed());
  const Mars = new PlaneteModel("Mars", 6, [90, 0, 0], "textures/mars.jpg", "Mars", 90, generateRandomSpeed());
  const Jupiter = new PlaneteModel("Jupiter", 12, [130, 0, 0], "textures/jupiter.jpg", "Jupiter", 130, generateRandomSpeed());
  const Saturne = new PlaneteModel("Saturne", 11, [160, 0, 0], "textures/saturne.jpg", "Saturne", 160, generateRandomSpeed());
  const Uranus = new PlaneteModel("Uranus", 10, [180, 0, 0], "textures/uranus.jpg", "Uranus", 180, generateRandomSpeed());

  const planeteList = [Soleil, Mercure, Venus, Terre, Mars, Jupiter, Saturne, Uranus];
  const selectedPlanetRef = useRef(null);

  return (
    <Canvas camera={{ position: [-30, 120, 300], fov: 60 }}>
      <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <OrbitControls enableRotate={true} enablePan={false} enableZoom={true} />

      {/* Dessiner les orbites */}
      {planeteList.map((planete, idx) => (
        <mesh key={`orbit-${idx}`} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planete.rayon - 0.5, planete.rayon, 64]} />
          <meshBasicMaterial color="#555555" wireframe={true} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Planètes */}
      {planeteList.map((planete, idx) => (
        <Planete
          key={idx}
          nom={planete.nom}
          taille={planete.taille}
          texture={planete.texture}
          rayon={planete.rayon}
          vitesse={planete.vitesse}
        />
      ))}

      {/* Caméra qui suit la planète */}
      <CameraControls selectedPlanetRef={selectedPlanetRef} />
    </Canvas>
  );
}

function App() {


  return (
    <>
      <Scene />
    </>
  );
}

export default App;
