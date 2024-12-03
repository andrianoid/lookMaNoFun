import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Kart, KartControls } from './mechanics/Kart';
import { KartController } from './mechanics/KartController';

interface GameCanvasProps {
  width?: number;
  height?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ 
  width = window.innerWidth, 
  height = window.innerHeight 
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const cameraRef = useRef<THREE.PerspectiveCamera>(new THREE.PerspectiveCamera(60, width / height, 0.1, 1000));
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const kartRef = useRef<Kart | null>(null);
  const controllerRef = useRef<KartController | null>(null);
  const lastTimeRef = useRef<number>(0);
  const cameraTargetRef = useRef(new THREE.Vector3());
  const cameraLookAtRef = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize scene
    const scene = sceneRef.current;
    scene.background = new THREE.Color(0x87ceeb); // Sky blue

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Set up camera
    const camera = cameraRef.current;
    camera.position.set(0, 5, -10);
    camera.lookAt(0, 0, 0);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    scene.add(directionalLight);

    // Create track
    const trackWidth = 10;
    const trackRadius = 30;
    const trackShape = new THREE.Shape();
    trackShape.absarc(0, 0, trackRadius + trackWidth, 0, Math.PI * 2);
    trackShape.absarc(0, 0, trackRadius - trackWidth, 0, Math.PI * 2, true);

    const trackGeometry = new THREE.ShapeGeometry(trackShape);
    const trackMaterial = new THREE.MeshStandardMaterial({
      color: 0x666666,
      roughness: 0.9,
      metalness: 0.1,
    });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = -Math.PI / 2;
    track.receiveShadow = true;
    scene.add(track);

    // Add track borders
    const borderGeometry = new THREE.TorusGeometry(trackRadius, 0.5, 16, 100);
    const borderMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.7,
      metalness: 0.3,
    });
    const outerBorder = new THREE.Mesh(borderGeometry, borderMaterial);
    outerBorder.position.y = 0.5;
    outerBorder.rotation.x = Math.PI / 2;
    outerBorder.castShadow = true;
    scene.add(outerBorder);

    const innerBorder = outerBorder.clone();
    innerBorder.scale.set(0.6, 0.6, 0.6);
    scene.add(innerBorder);

    // Add ground (visible outside track)
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x33aa33,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.position.y = -0.1; // Slightly below track to prevent z-fighting
    scene.add(ground);

    // Initialize kart and controller
    kartRef.current = new Kart();
    scene.add(kartRef.current.mesh);
    kartRef.current.reset();
    kartRef.current.mesh.position.set(trackRadius, 0.5, 0); // Start on track

    controllerRef.current = new KartController();

    // Animation loop
    const animate = (time: number) => {
      requestAnimationFrame(animate);

      // Calculate delta time (clamped to prevent large jumps)
      const deltaTime = Math.min((time - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = time;

      if (kartRef.current && controllerRef.current) {
        // Update kart physics
        kartRef.current.update(deltaTime, controllerRef.current.getControls());

        // Update camera position to follow kart
        const kartPos = kartRef.current.mesh.position;
        
        // Calculate ideal camera position based on kart's orientation
        const idealOffset = new THREE.Vector3(0, 4, -10);
        const kartRotation = kartRef.current.mesh.rotation.y;
        idealOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), kartRotation);

        // Update camera target position with smoother lerp
        const targetPos = kartPos.clone().add(idealOffset);
        cameraTargetRef.current.lerp(targetPos, deltaTime * 3);
        camera.position.copy(cameraTargetRef.current);

        // Update look-at target with smoother lerp
        const lookAtTarget = kartPos.clone().add(new THREE.Vector3(0, 1, 0));
        cameraLookAtRef.current.lerp(lookAtTarget, deltaTime * 4);
        camera.lookAt(cameraLookAtRef.current);
      }

      renderer.render(scene, camera);
    };

    animate(0);

    // Cleanup
    return () => {
      if (rendererRef.current) {
        const domElement = rendererRef.current.domElement;
        domElement.parentNode?.removeChild(domElement);
        rendererRef.current.dispose();
      }
      if (controllerRef.current) {
        controllerRef.current.dispose();
      }
    };
  }, [width, height]);

  return <div ref={canvasRef} />;
};

export default GameCanvas; 