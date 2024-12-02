// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const GlowingQ3D = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//     camera.position.z = 5;

//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(300, 300);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create the "Q" Shape
//     const textLoader = new THREE.FontLoader();
//     textLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
//       const textGeometry = new THREE.TextGeometry('Q', {
//         font: font,
//         size: 1,
//         height: 0.5,
//         curveSegments: 12,
//       });

//       const textMaterial = new THREE.MeshPhongMaterial({
//         color: 0x4fcaff,
//         emissive: 0x7b65ff,
//         emissiveIntensity: 0.6,
//         shininess: 100,
//       });

//       const textMesh = new THREE.Mesh(textGeometry, textMaterial);
//       textMesh.position.set(-0.6, -0.4, 0); // Adjust position for centering
//       scene.add(textMesh);

//       // Glow Effect
//       const glowMaterial = new THREE.MeshBasicMaterial({ color: 0x7b65ff, transparent: true, opacity: 0.4 });
//       const glowMesh = new THREE.Mesh(textGeometry, glowMaterial);
//       glowMesh.scale.set(1.2, 1.2, 1.2); // Slightly larger for the glow
//       scene.add(glowMesh);
//     });

//     // Lighting
//     const light = new THREE.PointLight(0xffffff, 1, 100);
//     light.position.set(2, 2, 5);
//     scene.add(light);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };
//     animate();

//     return () => mountRef.current.removeChild(renderer.domElement);
//   }, []);

//   return <div ref={mountRef} />;
// };

// export default GlowingQ3D;
