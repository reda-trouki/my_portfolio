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

// Satellite types and colors
const SATELLITE_TYPES = [
  { type: 'communication', color: 0x3498db, trailColor: 0x3498db },
  { type: 'weather', color: 0xe74c3c, trailColor: 0xe74c3c },
  { type: 'gps', color: 0x2ecc71, trailColor: 0x2ecc71 },
  { type: 'research', color: 0x9b59b6, trailColor: 0x9b59b6 },
  { type: 'military', color: 0xf1c40f, trailColor: 0xf1c40f },
  { type: 'telescope', color: 0x1abc9c, trailColor: 0x1abc9c },
] as const;

// Generate satellites with random orbits
const generateRandomSatellites = (count: number) => {
  const satellites = [];

  for (let i = 0; i < count; i++) {
    // Select a random satellite type
    const typeInfo = SATELLITE_TYPES[i % SATELLITE_TYPES.length];

    // Generate random orbit parameters
    const orbitRadius = 3.0 + Math.random() * 2.0; // Between 3.0 and 5.0
    const orbitInclination = (Math.random() * 2 - 1) * Math.PI / 3; // Between -60 and 60 degrees
    const orbitSpeed = 0.01 + Math.random() * 0.02; // Faster speeds between 0.01 and 0.03
    const size = 0.08 + Math.random() * 0.08; // Between 0.08 and 0.16
    const trailLength = 10 + Math.floor(Math.random() * 20); // Between 10 and 30

    // Create satellite config
    satellites.push({
      ...typeInfo,
      orbitRadius,
      orbitInclination,
      orbitSpeed,
      size,
      trailLength,
      // Add random starting position
      startAngle: Math.random() * Math.PI * 2
    });
  }

  return satellites;
};

// Generate satellites with random orbits - fewer on mobile for performance
const generateSatellites = () => {
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 3 : 6;
  return generateRandomSatellites(count);
};

const SATELLITES = generateSatellites();

// Alien ship configuration
const ALIEN_SHIP = {
  color: 0x00ff00,
  orbitRadius: 5.0,
  orbitInclination: 1.2,
  orbitSpeed: 0.002,
  size: 0.25,
  trailLength: 30,
  trailColor: 0x00ff00,
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
// Create a satellite mesh
const createSatellite = (config: typeof SATELLITES[number]) => {
  const { color, size, type } = config;
  const group = new THREE.Group();

  // Satellite body - different shapes based on type
  let bodyGeometry;
  if (type === 'communication') {
    // Cylindrical body for communication satellite
    bodyGeometry = new THREE.CylinderGeometry(size * 0.5, size * 0.5, size * 1.5, 8);
  } else if (type === 'weather') {
    // Octahedral body for weather satellite
    bodyGeometry = new THREE.OctahedronGeometry(size * 0.7, 1);
  } else {
    // Box body for GPS satellite
    bodyGeometry = new THREE.BoxGeometry(size, size, size * 1.2);
  }

  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: 0.4,
    shininess: 70,
    specular: 0xffffff
  });

  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  group.add(body);

  // Solar panels - different for each satellite type
  if (type === 'communication') {
    // Two large rectangular panels
    const panelGeometry = new THREE.BoxGeometry(size * 4, size * 0.1, size * 1.2);
    const panelMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a5276,
      emissive: 0x1a5276,
      emissiveIntensity: 0.2,
      shininess: 100,
      specular: 0x3498db
    });

    const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    leftPanel.position.x = -size * 2;
    leftPanel.rotation.z = Math.PI / 12;

    const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    rightPanel.position.x = size * 2;
    rightPanel.rotation.z = -Math.PI / 12;

    group.add(leftPanel, rightPanel);

    // Add antenna
    const antennaGeometry = new THREE.CylinderGeometry(size * 0.1, size * 0.3, size * 0.8, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0xd0d3d4, shininess: 100 });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.y = size * 1.1;
    antenna.rotation.x = Math.PI / 2;
    group.add(antenna);

    // Add dish
    const dishGeometry = new THREE.SphereGeometry(size * 0.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
    const dishMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      shininess: 100
    });
    const dish = new THREE.Mesh(dishGeometry, dishMaterial);
    dish.position.set(0, size * 1.1, size * 0.4);
    dish.rotation.x = -Math.PI / 2;
    group.add(dish);
  }
  else if (type === 'weather') {
    // Circular solar array
    const panelGeometry = new THREE.CylinderGeometry(size * 1.5, size * 1.5, size * 0.1, 16);
    const panelMaterial = new THREE.MeshPhongMaterial({
      color: 0x641e16,
      emissive: 0x641e16,
      emissiveIntensity: 0.2,
      shininess: 100,
      specular: 0xe74c3c
    });

    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.y = -size * 0.6;
    panel.rotation.x = Math.PI / 2;
    group.add(panel);

    // Add sensors
    const sensorGeometry = new THREE.CylinderGeometry(size * 0.2, size * 0.2, size * 0.4, 8);
    const sensorMaterial = new THREE.MeshPhongMaterial({
      color: 0x333333,
      shininess: 80
    });

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
      sensor.position.set(
        Math.cos(angle) * size * 0.6,
        0,
        Math.sin(angle) * size * 0.6
      );
      group.add(sensor);
    }
  }
  else if (type === 'gps') {
    // Cross-shaped panels
    const panelGeometry = new THREE.BoxGeometry(size * 3.5, size * 0.15, size * 0.8);
    const panelMaterial = new THREE.MeshPhongMaterial({
      color: 0x196f3d,
      emissive: 0x196f3d,
      emissiveIntensity: 0.2,
      shininess: 100,
      specular: 0x2ecc71
    });

    const horizontalPanel = new THREE.Mesh(panelGeometry, panelMaterial);

    const verticalPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    verticalPanel.rotation.z = Math.PI / 2;

    group.add(horizontalPanel, verticalPanel);

    // Add antenna array
    const antennaGeometry = new THREE.ConeGeometry(size * 0.2, size * 0.6, 8);
    const antennaMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100
    });

    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.y = size * 0.8;
    group.add(antenna);
  }
  else if (type === 'research') {
    // Telescope-like structure
    const tubeGeometry = new THREE.CylinderGeometry(size * 0.4, size * 0.4, size * 2, 16);
    const tubeMaterial = new THREE.MeshPhongMaterial({
      color: 0x7d3c98,
      emissive: 0x7d3c98,
      emissiveIntensity: 0.2,
      shininess: 100
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tube.rotation.z = Math.PI / 2;
    group.add(tube);

    // Solar panels
    const panelGeometry = new THREE.BoxGeometry(size * 2.5, size * 0.05, size * 1.5);
    const panelMaterial = new THREE.MeshPhongMaterial({
      color: 0xd2b4de,
      emissive: 0xd2b4de,
      emissiveIntensity: 0.1,
      shininess: 100
    });

    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.y = -size * 0.8;
    group.add(panel);
  }
  else if (type === 'military') {
    // Radar dish
    const baseGeometry = new THREE.CylinderGeometry(size * 0.5, size * 0.7, size * 0.4, 8);
    const baseMaterial = new THREE.MeshPhongMaterial({
      color: 0x7f8c8d,
      shininess: 80
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    group.add(base);

    // Radar dish
    const dishGeometry = new THREE.SphereGeometry(size * 0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const dishMaterial = new THREE.MeshPhongMaterial({
      color: 0xf39c12,
      emissive: 0xf39c12,
      emissiveIntensity: 0.2,
      side: THREE.DoubleSide,
      shininess: 100
    });
    const dish = new THREE.Mesh(dishGeometry, dishMaterial);
    dish.position.y = size * 0.3;
    dish.rotation.x = Math.PI;
    group.add(dish);

    // Antennas
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const antennaGeometry = new THREE.CylinderGeometry(size * 0.03, size * 0.03, size * 0.6, 4);
      const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
      antenna.position.set(
        Math.cos(angle) * size * 0.4,
        size * 0.6,
        Math.sin(angle) * size * 0.4
      );
      group.add(antenna);
    }
  }
  else if (type === 'telescope') {
    // Main telescope body
    const bodyGeometry = new THREE.CylinderGeometry(size * 0.3, size * 0.3, size * 1.2, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: 0x16a085,
      emissive: 0x16a085,
      emissiveIntensity: 0.2,
      shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.rotation.x = Math.PI / 2;
    group.add(body);

    // Lens
    const lensGeometry = new THREE.CylinderGeometry(size * 0.35, size * 0.35, size * 0.1, 16);
    const lensMaterial = new THREE.MeshPhongMaterial({
      color: 0x2980b9,
      emissive: 0x2980b9,
      emissiveIntensity: 0.5,
      shininess: 150
    });
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.z = size * 0.65;
    lens.rotation.x = Math.PI / 2;
    group.add(lens);

    // Support structure
    const supportGeometry = new THREE.BoxGeometry(size * 0.1, size * 0.8, size * 0.1);
    const supportMaterial = new THREE.MeshPhongMaterial({ color: 0x95a5a6 });
    const support = new THREE.Mesh(supportGeometry, supportMaterial);
    support.position.y = -size * 0.4;
    group.add(support);
  }

  // Add blinking light
  const lightGeometry = new THREE.SphereGeometry(size * 0.15, 8, 8);
  const lightMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.9
  });
  const light = new THREE.Mesh(lightGeometry, lightMaterial);
  light.position.y = size * 0.6;
  light.userData.isLight = true; // For animation
  group.add(light);

  return group;
};

// Create alien ship
const createAlienShip = (config: typeof ALIEN_SHIP) => {
  const { color, size } = config;
  const group = new THREE.Group();

  // Main saucer body
  const saucerGeometry = new THREE.SphereGeometry(size, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.6);
  const saucerMaterial = new THREE.MeshPhongMaterial({
    color: 0xcccccc,
    emissive: color,
    emissiveIntensity: 0.3,
    shininess: 90,
    specular: 0xffffff
  });
  const saucer = new THREE.Mesh(saucerGeometry, saucerMaterial);
  saucer.rotation.x = Math.PI;
  group.add(saucer);

  // Top dome
  const domeGeometry = new THREE.SphereGeometry(size * 0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const domeMaterial = new THREE.MeshPhongMaterial({
    color: 0x88ff88,
    transparent: true,
    opacity: 0.7,
    shininess: 150,
    specular: 0xffffff
  });
  const dome = new THREE.Mesh(domeGeometry, domeMaterial);
  dome.position.y = size * 0.2;
  group.add(dome);

  // Bottom lights
  const lightCount = 8;
  for (let i = 0; i < lightCount; i++) {
    const angle = (i / lightCount) * Math.PI * 2;
    const lightGeometry = new THREE.CylinderGeometry(size * 0.08, size * 0.08, size * 0.1, 8);
    const lightMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(
      Math.cos(angle) * size * 0.7,
      -size * 0.05,
      Math.sin(angle) * size * 0.7
    );
    light.userData.isAlienLight = true;
    light.userData.lightIndex = i;
    group.add(light);
  }

  // Beam effect
  const beamGeometry = new THREE.CylinderGeometry(size * 0.2, size * 0.5, size * 1.5, 16, 1, true);
  const beamMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });
  const beam = new THREE.Mesh(beamGeometry, beamMaterial);
  beam.position.y = -size * 0.8;
  beam.userData.isBeam = true;
  group.add(beam);

  return group;
};

// Create satellite trail
const createSatelliteTrail = (color: number, length: number) => {
  const trailMaterial = new THREE.LineBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  // Create empty geometry that will be updated during animation
  const trailGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(length * 3); // 3 values (x,y,z) per point

  // Initialize with zeros
  for (let i = 0; i < positions.length; i++) {
    positions[i] = 0;
  }

  trailGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const trail = new THREE.Line(trailGeometry, trailMaterial);

  // Store the positions array for easy updates
  trail.userData.positions = positions;
  trail.userData.maxLength = length;
  trail.userData.currentLength = 0;

  return trail;
};

const createNetworkLine = (start: { lat: number; lon: number },
  end: { lat: number; lon: number },
  size: number) => {
  const points = [];
  // Adaptive segments based on device performance
  const segments = window.innerWidth < 768 ? 25 : 40; // Reduce segments for mobile
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

  // Check if device is mobile and detect performance capability
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);

      // Adjust size based on screen width for better responsiveness
      const newSize = isMobileDevice
        ? Math.min(window.innerWidth * 0.9, 500) // 90% of screen width on mobile, max 500px
        : Math.min(window.innerWidth * 0.6, 800); // 60% of screen width on desktop, max 800px
      setSize(newSize);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload textures to avoid glitches during rendering
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return {
      map: loader.load(TEXTURES.map),
      bump: loader.load(TEXTURES.bump),
      specular: loader.load(TEXTURES.specular),
      clouds: loader.load(TEXTURES.clouds)
    };
  }, []);

  // Memoize scene objects with performance optimizations
  const sceneObjects = useMemo(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    // Create renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable antialiasing on mobile for better performance
      powerPreference: "high-performance",
      precision: isMobile ? "lowp" : "mediump", // Even lower precision on mobile
      logarithmicDepthBuffer: false, // Disable for performance
      preserveDrawingBuffer: false // Disable for performance
    });

    // Enable optimizations
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio

    return { scene, camera, renderer };
  }, [isMobile]);

  useEffect(() => {
    // Size is now handled in the mobile detection useEffect

    const { scene, camera, renderer } = sceneObjects;
    const mount = mountRef.current!;

    // Renderer setup with performance optimizations
    renderer.setSize(size, size);
    mount.appendChild(renderer.domElement);

    // Performance monitoring (uncomment for debugging)
    // const stats = new Stats();
    // mount.appendChild(stats.dom);

    // Globe setup
    // More adaptive geometry based on device capability
    const segments = isMobile ? 24 : 48; // Further reduce segments on mobile
    const geometry = new THREE.SphereGeometry(2, segments, segments);
    // Optimized material with preloaded textures
    const material = new THREE.MeshPhongMaterial({
      map: textures.map,
      bumpMap: textures.bump,
      bumpScale: 0.05,
      specularMap: textures.specular,
      specular: new THREE.Color(0x444444),
      shininess: 15,
    });

    const globe = new THREE.Mesh(geometry, material);
    globe.rotation.y = THREE.MathUtils.degToRad(CENTRAL_POINT.lon);
    globe.rotation.x = THREE.MathUtils.degToRad(-CENTRAL_POINT.lat);
    globeRef.current = globe;
    scene.add(globe);

    // Network lines with optimized creation
    const linesGroup = new THREE.Group();

    // Reduce number of lines on mobile for better performance
    const destinationsToUse = isMobile ? DESTINATIONS.slice(0, 5) : DESTINATIONS;

    const networkLines = destinationsToUse.map(dest =>
      createNetworkLine(CENTRAL_POINT, dest, size)
    );
    networkLines.forEach(({ line }) => linesGroup.add(line));
    globe.add(linesGroup);

    // Add satellites without visible orbits
    const satellitesGroup = new THREE.Group();
    const satellites = SATELLITES.map(config => {
      // Create satellite
      const satellite = createSatellite(config);

      // Set initial random position based on startAngle
      const angle = config.startAngle;
      const radius = config.orbitRadius;
      const inclination = config.orbitInclination;

      // Calculate initial position
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      const y = z * Math.sin(inclination);
      const adjustedZ = z * Math.cos(inclination);

      // Set initial position
      satellite.position.set(x, y, adjustedZ);

      // Create trail
      const trail = createSatelliteTrail(config.trailColor, config.trailLength);

      // Add to scene
      satellitesGroup.add(satellite);
      satellitesGroup.add(trail);

      return { satellite, trail, config };
    });

    // Create alien ship
    const alienShip = createAlienShip(ALIEN_SHIP);
    const alienTrail = createSatelliteTrail(ALIEN_SHIP.trailColor, ALIEN_SHIP.trailLength);

    // Add alien ship to scene
    satellitesGroup.add(alienShip);
    satellitesGroup.add(alienTrail);

    scene.add(satellitesGroup);

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    scene.add(new THREE.AmbientLight(0x404040, 0.5));

    // Camera and controls setup
    // Adjust camera position based on device for better centering
    camera.position.set(0, isMobile ? 2 : 3, isMobile ? 7 : 6);

    // Create controls for both mobile and desktop
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Mobile-specific control settings
    if (isMobile) {
      // Disable pan gesture to allow scrolling
      controls.enablePan = false;
      // Limit rotation to horizontal only for easier control
      controls.minPolarAngle = Math.PI / 2 - 0.5; // Limit vertical rotation
      controls.maxPolarAngle = Math.PI / 2 + 0.5;
      // Reduce rotation speed on mobile
      controls.rotateSpeed = 0.3;
      // Add touch event handling to prevent page scroll interference
      const globeElement = renderer.domElement;

      // Track if user is interacting with the globe
      let isInteracting = false;
      let touchStartY = 0;

      // Add custom touch handlers
      globeElement.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          touchStartY = e.touches[0].clientY;
          // Don't immediately set as interacting - wait to see if it's a scroll or rotation
        }
      }, { passive: false });

      globeElement.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          // If vertical movement is greater than horizontal, it's likely a scroll
          const touchY = e.touches[0].clientY;
          const touchX = e.touches[0].clientX;
          const deltaY = Math.abs(touchY - touchStartY);
          const deltaX = Math.abs(touchX - e.touches[0].clientX);

          // If horizontal movement dominates, it's a rotation - prevent default
          if (deltaX > deltaY && deltaX > 10) {
            isInteracting = true;
            e.preventDefault();
          } else if (!isInteracting && deltaY > 10) {
            // If vertical movement dominates and we haven't committed to interaction,
            // disable controls temporarily to allow scrolling
            controls.enabled = false;
            setTimeout(() => {
              controls.enabled = true;
            }, 1000); // Re-enable after scrolling likely finished
          }
        }
      }, { passive: false });

      globeElement.addEventListener('touchend', () => {
        isInteracting = false;
      }, { passive: true });
    }

    // Optimized animation loop with frame limiting
    let animationFrameId: number;
    let lastTime = 0;
    const frameInterval = isMobile ? 1000 / 24 : 1000 / 60; // Limit to 24fps on mobile for better performance

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Throttle updates based on device capability
      const deltaTime = time - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = time - (deltaTime % frameInterval);

      // Rotate the globe at appropriate speed based on device
      globe.rotation.y += isMobile ? 0.001 : 0.002; // Slower on mobile to reduce GPU load

      // Update satellite positions and trails
      satellites.forEach(({ satellite, trail, config }) => {
        // Use startAngle for initial offset and appropriate speed based on device
        const speedMultiplier = isMobile ? 2 : 3; // Slightly slower on mobile
        const angle = config.startAngle + time * 0.001 * config.orbitSpeed * speedMultiplier;

        // Get orbit parameters
        const radius = config.orbitRadius;
        const inclination = config.orbitInclination;

        // Calculate position on orbit
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        // Apply inclination to y-coordinate
        const y = z * Math.sin(inclination);
        const adjustedZ = z * Math.cos(inclination);

        // Set satellite position
        satellite.position.set(x, y, adjustedZ);

        // Make satellite face its movement direction with enhanced banking on turns
        satellite.rotation.y = -angle + Math.PI / 2;
        satellite.rotation.z = Math.sin(angle) * 0.2; // Increased banking effect

        // Enhanced animations based on satellite type with faster speeds
        if (config.type === 'communication') {
          satellite.rotation.x = Math.sin(time * 0.003) * 0.1;
          // Add dish rotation
          if (satellite.children.length > 3) {
            satellite.children[3].rotation.y += 0.03;
          }
        } else if (config.type === 'weather') {
          satellite.rotation.x = Math.sin(time * 0.002) * 0.15;
          // Spin the weather satellite faster
          satellite.rotation.y += 0.03;
        } else if (config.type === 'gps') {
          satellite.rotation.x = Math.sin(time * 0.004) * 0.08;
          // Add panel rotation
          satellite.children[0].rotation.z += 0.01;
        } else if (config.type === 'research') {
          // Rotate telescope to scan space faster
          satellite.rotation.z += 0.02;
          satellite.rotation.x = Math.sin(time * 0.002) * 0.2;
        } else if (config.type === 'military') {
          // Faster radar dish rotation
          if (satellite.children.length > 1) {
            satellite.children[1].rotation.y += 0.05;
          }
          satellite.rotation.x = Math.sin(time * 0.003) * 0.1;
        } else if (config.type === 'telescope') {
          // More dynamic telescope scanning movement
          satellite.rotation.z = Math.sin(time * 0.001) * 0.3;
          satellite.rotation.x += 0.01;
        }

        // Update blinking light
        satellite.traverse((obj) => {
          if (obj.userData && obj.userData.isLight) {
            // Blink at different rates based on satellite type
            let blinkRate;
            if (config.type === 'communication') blinkRate = 0.003;
            else if (config.type === 'weather') blinkRate = 0.002;
            else blinkRate = 0.0015;

            // Type assertion to access material property
            const mesh = obj as THREE.Mesh;
            if (mesh.material) {
              const material = mesh.material as THREE.MeshBasicMaterial;
              material.opacity = 0.5 + Math.sin(time * blinkRate) * 0.5;
            }
          }
        });

        // Update trail
        const positions = trail.userData.positions;
        const maxLength = trail.userData.maxLength;

        // Shift existing points back
        for (let i = positions.length - 3; i >= 3; i -= 3) {
          positions[i] = positions[i - 3];
          positions[i + 1] = positions[i - 2];
          positions[i + 2] = positions[i - 1];
        }

        // Add new point at the beginning
        positions[0] = satellite.position.x;
        positions[1] = satellite.position.y;
        positions[2] = satellite.position.z;

        // Increase current length until we reach max
        if (trail.userData.currentLength < maxLength) {
          trail.userData.currentLength++;
        }

        // Update the geometry
        const positionAttribute = trail.geometry.getAttribute('position') as THREE.BufferAttribute;
        positionAttribute.needsUpdate = true;
      });

      // Update alien ship position and effects

      // Calculate position on a more complex path (figure-8 pattern)
      const t = time * 0.0001;
      const scale = 1.5;
      const alienX = Math.sin(t) * ALIEN_SHIP.orbitRadius * scale;
      const alienZ = Math.sin(t * 2) * Math.cos(t) * ALIEN_SHIP.orbitRadius;
      const alienY = Math.cos(t * 3) * ALIEN_SHIP.orbitRadius * 0.5;

      // Set alien ship position
      alienShip.position.set(alienX, alienY, alienZ);

      // Make alien ship face its movement direction
      alienShip.lookAt(alienShip.position.clone().add(new THREE.Vector3(
        Math.cos(t + 0.01) - Math.cos(t),
        Math.sin(t * 3 + 0.01) - Math.sin(t * 3),
        Math.sin(t * 2 + 0.01) * Math.cos(t + 0.01) - Math.sin(t * 2) * Math.cos(t)
      )));

      // Add slight wobble and rotation
      alienShip.rotation.z = Math.sin(time * 0.001) * 0.1;
      alienShip.rotation.x += 0.001;

      // Update alien ship lights
      alienShip.traverse((obj) => {
        if (obj.userData && obj.userData.isAlienLight) {
          const mesh = obj as THREE.Mesh;
          if (mesh.material) {
            const material = mesh.material as THREE.MeshBasicMaterial;
            // Create pulsing pattern based on light index
            const pulseRate = 0.002;
            const pulseOffset = obj.userData.lightIndex * (Math.PI / 4);
            material.opacity = 0.7 + Math.sin(time * pulseRate + pulseOffset) * 0.3;

            // Change colors
            const hue = (time * 0.0005 + obj.userData.lightIndex * 0.1) % 1;
            material.color.setHSL(hue, 1, 0.5);
          }
        }

        // Update tractor beam
        if (obj.userData && obj.userData.isBeam) {
          const mesh = obj as THREE.Mesh;
          if (mesh.material) {
            const material = mesh.material as THREE.MeshBasicMaterial;
            // Pulse the beam
            material.opacity = 0.2 + Math.sin(time * 0.003) * 0.1;
            // Rotate the beam
            mesh.rotation.y += 0.02;
          }
        }
      });

      // Update alien trail
      const alienTrailPositions = alienTrail.userData.positions;
      const alienTrailMaxLength = alienTrail.userData.maxLength;

      // Shift existing points back
      for (let i = alienTrailPositions.length - 3; i >= 3; i -= 3) {
        alienTrailPositions[i] = alienTrailPositions[i - 3];
        alienTrailPositions[i + 1] = alienTrailPositions[i - 2];
        alienTrailPositions[i + 2] = alienTrailPositions[i - 1];
      }

      // Add new point at the beginning
      alienTrailPositions[0] = alienShip.position.x;
      alienTrailPositions[1] = alienShip.position.y;
      alienTrailPositions[2] = alienShip.position.z;

      // Increase current length until we reach max
      if (alienTrail.userData.currentLength < alienTrailMaxLength) {
        alienTrail.userData.currentLength++;
      }

      // Update the geometry
      const alienPositionAttribute = alienTrail.geometry.getAttribute('position') as THREE.BufferAttribute;
      alienPositionAttribute.needsUpdate = true;

      // Optimize line updates
      networkLines.forEach(({ material }) => {
        material.resolution.set(size, size);
        material.dashOffset -= 0.01;
      });

      // Update controls
      controls.update();

      // stats?.update(); // Uncomment for performance monitoring
      renderer.render(scene, camera);
    };
    animate(0);

    // Cleanup
    return () => {
      // No need to remove updateSize event listener as it's handled in the mobile detection cleanup
      cancelAnimationFrame(animationFrameId);
      mount.removeChild(renderer.domElement);

      networkLines.forEach(({ line, material }) => {
        line.geometry.dispose();
        material.dispose();
      });

      // Clean up satellites and trails
      satellites.forEach(({ satellite, trail }) => {
        // Clean up satellite meshes
        satellite.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach(mat => mat.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });

        // Clean up trails
        trail.geometry.dispose();
        trail.material.dispose();
      });

      // Clean up alien ship
      alienShip.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach(mat => mat.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      // Clean up alien trail
      alienTrail.geometry.dispose();
      alienTrail.material.dispose();

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
  }, [size, sceneObjects, isMobile, textures.map, textures.bump, textures.specular]);

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
            className="mx-auto relative flex items-center justify-center w-full h-full"
            style={{
              width: size,
              height: size,
              maxWidth: '100vw',
              maxHeight: '100vw'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Globe;


