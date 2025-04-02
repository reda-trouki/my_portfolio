import React, { useRef, useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

// Constants
const TEXTURES = {
  map: '/textures/earth-map.jpg',
  bump: '/textures/earth-bump.jpg',
  specular: '/textures/earth-specular.jpg',
  clouds: '/textures/earth-clouds.jpg',
} as const;

const DESTINATIONS = [
  { lat: 51.5074, lon: -0.1278, name: 'London' },
  { lat: 35.6762, lon: 139.6503, name: 'Tokyo' },
  { lat: -33.8688, lon: 151.2093, name: 'Sydney' },
  { lat: 48.8566, lon: 2.3522, name: 'Paris' },
  { lat: 37.7749, lon: -122.4194, name: 'San Francisco' },
  { lat: 39.9526, lon: 116.3588, name: 'Beijing' },
  { lat: 40.7128, lon: -74.0060, name: 'New York' },
  { lat: 35.7542, lon: 139.6917, name: 'Osaka' },
  { lat: 43.6532, lon: -79.3832, name: 'Toronto' },
  { lat: 25.1351, lon: 55.2463, name: 'Dubai' },
  { lat: -22.9068, lon: -43.1729, name: 'Rio de Janeiro' },
  { lat: 55.7558, lon: 37.6173, name: 'Moscow' },
  { lat: 1.3521, lon: 103.8198, name: 'Singapore' },
  { lat: 31.2304, lon: 121.4737, name: 'Shanghai' },
  { lat: -1.2921, lon: 36.8219, name: 'Nairobi' },
] as const;

const CENTRAL_POINT = { lat: 32.2994, lon: 9.2372, name: 'Safi' }; // Safi, Morocco

// Utility functions
const createNetworkLine = (start: { lat: number; lon: number }, 
                         end: { lat: number; lon: number }, 
                         size: number) => {
  const points = [];
  const segments = 50;
  const maxHeight = 0.3 + Math.random() * 0.4;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const lat = start.lat + (end.lat - start.lat) * t;
    const lon = start.lon + (end.lon - start.lon) * t;
    const latRad = THREE.MathUtils.degToRad(lat);
    const lonRad = THREE.MathUtils.degToRad(lon);
    const radius = 2 + Math.sin(Math.PI * t) * maxHeight;

    points.push(
      radius * Math.cos(latRad) * Math.cos(lonRad),
      radius * Math.sin(latRad),
      radius * Math.cos(latRad) * Math.sin(lonRad)
    );
  }

  const geometry = new LineGeometry();
  geometry.setPositions(points);

  const color = new THREE.Color().setHSL(0.5 + Math.random() * 0.2, 0.8, 0.5);
  const material = new LineMaterial({
    color,
    linewidth: 1.5,
    transparent: true,
    opacity: 0.8,
    dashed: true,
    dashScale: 0.5,
    dashSize: 1,
    gapSize: 0.5,
    resolution: new THREE.Vector2(size, size),
  });

  const line = new Line2(geometry, material);
  line.computeLineDistances();

  return { line, material };
};

const Globe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const [size, setSize] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize scene objects
  const sceneObjects = useMemo(() => ({
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, 1, 0.1, 1000),
    renderer: new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    }),
    textureLoader: new THREE.TextureLoader(),
  }), []);

  useEffect(() => {
    // Responsive size handling
    const updateSize = () => {
      const width = window.innerWidth;
      setSize(width < 768 ? 500 : 800);
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const { scene, camera, renderer, textureLoader } = sceneObjects;
    const mount = mountRef.current!;
    
    // Renderer setup
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Globe setup
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: textureLoader.load(TEXTURES.map),
      bumpMap: textureLoader.load(TEXTURES.bump),
      bumpScale: 0.05,
      specularMap: textureLoader.load(TEXTURES.specular),
      specular: new THREE.Color(0x444444),
      shininess: 15,
    });

    const globe = new THREE.Mesh(geometry, material);
    globe.rotation.y = THREE.MathUtils.degToRad(CENTRAL_POINT.lon);
    globe.rotation.x = THREE.MathUtils.degToRad(-CENTRAL_POINT.lat);
    globeRef.current = globe;
    scene.add(globe);

    // Network lines
    const linesGroup = new THREE.Group();
    const networkLines = DESTINATIONS.map(dest => 
      createNetworkLine(CENTRAL_POINT, dest, size)
    );
    networkLines.forEach(({ line }) => linesGroup.add(line));
    globe.add(linesGroup);

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0x404040, 0.5));

    // Camera and controls setup
    camera.position.set(0, 3, 6);
    
    let controls: OrbitControls | null = null;
    if (!isMobile) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
    }

    // Animation
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Always rotate the globe, regardless of mobile or desktop
      globe.rotation.y += 0.002;

      networkLines.forEach(({ material }) => {
        material.resolution.set(size, size);
        material.dashOffset -= 0.01;
      });
      
      // Update controls only if they exist (non-mobile)
      if (controls) {
        controls.update();
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
      mount.removeChild(renderer.domElement);

      networkLines.forEach(({ line, material }) => {
        line.geometry.dispose();
        material.dispose();
      });

      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(mat => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      if (controls) {
        controls.dispose();
      }
      renderer.dispose();
    };
  }, [size, sceneObjects, isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="p-0">
          <div 
            ref={mountRef} 
            style={{ width: size, height: size }} 
            className="mx-auto relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Globe;


