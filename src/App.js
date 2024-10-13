import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Planete from './components/Planete';
import { PlaneteModel } from './components/PlaneteModel';
import * as THREE from 'three';

function Scene() {
  // Créer les planètes avec un rayon pour l'orbite
  const Soleil = new PlaneteModel("Soleil", 20, [0, 0, 0], "textures/soleil.jpg", "Le Soleil", 0);
  const Mercure = new PlaneteModel("Mercure", 5, [30, 0, 0], "textures/mercure.jpg", "Mercure", 30);
  const Venus = new PlaneteModel("Venus", 6, [50, 0, 0], "textures/venus.jpg", "Vénus", 50);
  const Terre = new PlaneteModel("Terre", 7, [70, 0, 0], "textures/terre.jpg", "La Terre", 70);
  const Mars = new PlaneteModel("Mars", 6, [90, 0, 0], "textures/mars.jpg", "Mars", 90);
  const Jupiter = new PlaneteModel("Jupiter", 12, [130, 0, 0], "textures/jupiter.jpg", "Jupiter", 130);
  const Saturne = new PlaneteModel("Saturne", 11, [160, 0, 0], "textures/saturne.jpg", "Saturne", 160);
  const Uranus = new PlaneteModel("Uranus", 10, [180, 0, 0], "textures/uranus.jpg", "Uranus", 180);

  const planeteList = [Mercure, Venus, Terre, Mars, Jupiter, Saturne, Uranus];

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />
      <OrbitControls />
      <Planete
        nom={Soleil.nom}
        taille={Soleil.taille}
        position={Soleil.position}
        texture={Soleil.texture}
        titre={Soleil.titre}
      />
      {planeteList.map((planete, idx) => (
        <Planete
          key={idx}
          nom={planete.nom}
          taille={planete.taille}
          texture={planete.texture}
          rayon={planete.rayon} // Utiliser le rayon pour définir l'orbite
          vitesse={1 / (planete.rayon)} // Vitesse en fonction du rayon, plus c'est proche, plus c'est rapide
        />
      ))}
    </Canvas>
  );
}

function App() {
  return (
    <Scene />
  );
}

export default App;
