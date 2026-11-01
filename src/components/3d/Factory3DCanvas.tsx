import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { FACTORY_MACHINES, FACTORY_ZONES } from '../../data/factoryData';
import { MachineData } from '../../types';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Layers,
  Eye,
  Info,
  ChevronDown,
  ChevronUp,
  Sliders,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Activity,
  X
} from 'lucide-react';

interface Factory3DCanvasProps {
  height?: string;
  isHeroMode?: boolean;
  initialSelectedMachineId?: string;
  onSelectMachine?: (machine: MachineData | null) => void;
  selectedZoneId?: string;
  onSelectZone?: (zoneId: string) => void;
}

export const Factory3DCanvas: React.FC<Factory3DCanvasProps> = ({
  height = '680px',
  isHeroMode = false,
  initialSelectedMachineId,
  onSelectMachine,
  selectedZoneId,
  onSelectZone
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);

  // UI state
  const [loading, setLoading] = useState(true);
  const [webglError, setWebglError] = useState<string | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<MachineData | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [explodedView, setExplodedView] = useState(false);
  const [explodedFactor, setExplodedFactor] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState(false);
  const [activeCameraPreset, setActiveCameraPreset] = useState<'overview' | 'cnc' | 'welding' | 'inspection' | 'assembly'>('overview');

  // Mutable Three.js refs to avoid re-initializing
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    controls: OrbitControls | null;
    interactiveMeshes: THREE.Object3D[];
    roboticArms: {
      waist: THREE.Object3D;
      arm: THREE.Object3D;
      forearm: THREE.Object3D;
      tool: THREE.Object3D;
      baseAngle: number;
    }[];
    conveyorWorkpieces: THREE.Object3D[];
    explodedGroups: { object: THREE.Object3D; basePos: THREE.Vector3; explodeOffset: THREE.Vector3 }[];
    highlightRing: THREE.Mesh | null;
    isSoftwareGl: boolean;
    frameId: number;
    clock: THREE.Clock;
    targetCameraPos: THREE.Vector3;
    targetControlsTarget: THREE.Vector3;
    isTransitioningCamera: boolean;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    controls: null,
    interactiveMeshes: [],
    roboticArms: [],
    conveyorWorkpieces: [],
    explodedGroups: [],
    highlightRing: null,
    isSoftwareGl: false,
    frameId: 0,
    clock: new THREE.Clock(),
    targetCameraPos: new THREE.Vector3(26, 22, 34),
    targetControlsTarget: new THREE.Vector3(0, 2, 0),
    isTransitioningCamera: false,
  });

  // Handle machine selection
  const handleSelectMachine = useCallback((machine: MachineData | null) => {
    setSelectedMachine(machine);
    if (onSelectMachine) onSelectMachine(machine);

    if (machine && stateRef.current.camera && stateRef.current.controls) {
      const targetPos = new THREE.Vector3(...machine.position);
      stateRef.current.targetControlsTarget.copy(targetPos).add(new THREE.Vector3(0, 1.5, 0));
      stateRef.current.targetCameraPos.set(targetPos.x + 8, targetPos.y + 7, targetPos.z + 10);
      stateRef.current.isTransitioningCamera = true;

      if (stateRef.current.highlightRing) {
        stateRef.current.highlightRing.position.set(machine.position[0], 0.05, machine.position[2]);
        stateRef.current.highlightRing.visible = true;
      }
    } else if (stateRef.current.highlightRing) {
      stateRef.current.highlightRing.visible = false;
    }
  }, [onSelectMachine]);

  // Sync initialSelectedMachineId if passed
  useEffect(() => {
    if (initialSelectedMachineId) {
      const match = FACTORY_MACHINES.find(m => m.id === initialSelectedMachineId);
      if (match) {
        handleSelectMachine(match);
      }
    }
  }, [initialSelectedMachineId, handleSelectMachine]);

  // Camera presets
  const applyCameraPreset = (preset: 'overview' | 'cnc' | 'welding' | 'inspection' | 'assembly') => {
    setActiveCameraPreset(preset);
    const { targetCameraPos, targetControlsTarget } = stateRef.current;
    stateRef.current.isTransitioningCamera = true;

    if (preset === 'overview') {
      targetCameraPos.set(24, 20, 32);
      targetControlsTarget.set(0, 2, 0);
    } else if (preset === 'cnc') {
      targetCameraPos.set(-8, 9, 16);
      targetControlsTarget.set(-8, 2, 6);
    } else if (preset === 'welding') {
      targetCameraPos.set(4, 9, 16);
      targetControlsTarget.set(4, 2, 6);
    } else if (preset === 'inspection') {
      targetCameraPos.set(-2, 8, 4);
      targetControlsTarget.set(-2, 1.5, -8);
    } else if (preset === 'assembly') {
      targetCameraPos.set(16, 8, 16);
      targetControlsTarget.set(16, 2, 6);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(err => console.error(err));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(err => console.error(err));
    }
  };

  // Zoom helpers
  const handleZoom = (delta: number) => {
    const { camera, controls } = stateRef.current;
    if (!camera || !controls) return;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.position.addScaledVector(direction, delta * 3);
    controls.update();
  };

  // Reset view
  const handleResetCamera = () => {
    applyCameraPreset('overview');
    handleSelectMachine(null);
  };

  // Three.js Scene Setup
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // Detect software WebGL
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebglError('WebGL is not supported on this device/browser. Interactive 3D graphics require WebGL support.');
        setLoading(false);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      isSoftwareGl = true;
    }
    stateRef.current.isSoftwareGl = isSoftwareGl;

    // 1. Renderer
    const width = container.clientWidth || 800;
    const heightPx = container.clientHeight || 500;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 2. Scene & Fog
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712);
    scene.fog = new THREE.FogExp2(0x030712, 0.016);
    stateRef.current.scene = scene;

    // 3. Camera & Controls
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.5, 300);
    camera.position.set(24, 20, 32);
    stateRef.current.camera = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent camera under floor
    controls.minDistance = 3;
    controls.maxDistance = 110;
    controls.target.set(0, 2, 0);
    stateRef.current.controls = controls;

    // Cancel transitions on manual interaction
    controls.addEventListener('start', () => {
      stateRef.current.isTransitioningCamera = false;
    });

    // 4. Studio Environment Reflection
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch (e) {
      console.warn('RoomEnvironment generation fallback:', e);
    }

    // 5. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0e1726, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x0f172a, 1.0);
    hemiLight.position.set(0, 40, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(20, 35, 25);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 2048;
      keyLight.shadow.mapSize.height = 2048;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      const d = 35;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 100;
    }
    scene.add(keyLight);

    // Accent Rim / Cyan Light
    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    cyanLight.position.set(-25, 20, -20);
    scene.add(cyanLight);

    // Violet industrial accent fill
    const violetLight = new THREE.PointLight(0x8b5cf6, 2.0, 50);
    violetLight.position.set(0, 12, 0);
    scene.add(violetLight);

    // 6. Procedural Factory Floor & Grid
    const floorSize = 90;
    const floorGeo = new THREE.PlaneGeometry(floorSize, floorSize);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.35,
      metalness: 0.7,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = !isSoftwareGl;
    scene.add(floor);

    // Floor Grid lines (Procedural)
    const gridHelper = new THREE.GridHelper(floorSize, 45, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Safety yellow/black perimeter boundary lines
    const borderMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const borderEdgeGeo = new THREE.BoxGeometry(floorSize, 0.08, 0.3);
    const borderN = new THREE.Mesh(borderEdgeGeo, borderMat);
    borderN.position.set(0, 0.04, -floorSize / 2);
    scene.add(borderN);
    const borderS = new THREE.Mesh(borderEdgeGeo, borderMat);
    borderS.position.set(0, 0.04, floorSize / 2);
    scene.add(borderS);

    // 7. Factory Ceiling Trusses & Overhead Gantry
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.3 });
    for (let x = -30; x <= 30; x += 15) {
      const beamGeo = new THREE.BoxGeometry(0.5, 1.2, floorSize * 0.8);
      const beam = new THREE.Mesh(beamGeo, trussMat);
      beam.position.set(x, 16, 0);
      scene.add(beam);

      // Downward industrial spotlights
      const spot = new THREE.PointLight(0x38bdf8, 0.8, 25);
      spot.position.set(x, 15, 0);
      scene.add(spot);
    }

    // 8. Highlight selection ring with pulsing beacon glow
    const ringGeo = new THREE.RingGeometry(2.3, 2.7, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const highlightRing = new THREE.Mesh(ringGeo, ringMat);
    highlightRing.rotation.x = -Math.PI / 2;
    highlightRing.position.y = 0.04;
    highlightRing.visible = false;

    // Inner glowing cyan disc
    const innerDiscGeo = new THREE.CircleGeometry(2.2, 32);
    const innerDiscMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.16,
    });
    const innerDisc = new THREE.Mesh(innerDiscGeo, innerDiscMat);
    highlightRing.add(innerDisc);

    // Holographic upward beacon light for selected machine
    const selectionLight = new THREE.PointLight(0x06b6d4, 1.8, 14);
    selectionLight.position.set(0, 0, -2.5);
    highlightRing.add(selectionLight);

    scene.add(highlightRing);
    stateRef.current.highlightRing = highlightRing;

    // 9. Procedural Machine Assemblies (Composite 3-12 parts per Three.js Skill)
    const interactiveMeshes: THREE.Object3D[] = [];
    const explodedGroups: { object: THREE.Object3D; basePos: THREE.Vector3; explodeOffset: THREE.Vector3 }[] = [];
    const roboticArmsList: {
      waist: THREE.Object3D;
      arm: THREE.Object3D;
      forearm: THREE.Object3D;
      tool: THREE.Object3D;
      baseAngle: number;
    }[] = [];

    // Metallic PBR Material Palettes
    const steelDarkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.25 });
    const steelSilverMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.15 });
    const industrialCyanMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5, roughness: 0.3 });
    const industrialOrangeMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.4, roughness: 0.35 });
    const highGlowCyanMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const highGlowAmberMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    const highGlowGreenMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e293b,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    FACTORY_MACHINES.forEach((m) => {
      const group = new THREE.Group();
      group.position.set(...m.position);
      group.userData = { machineData: m };

      // Base pedestal (Part 1 - Grounding)
      const baseGeo = new THREE.BoxGeometry(3.6, 0.4, 3.6);
      const baseMesh = new THREE.Mesh(baseGeo, steelDarkMat);
      baseMesh.position.y = 0.2;
      baseMesh.receiveShadow = !isSoftwareGl;
      baseMesh.castShadow = !isSoftwareGl;
      group.add(baseMesh);

      // Status Indicator Light Pillar (Part 2)
      const indicatorGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 16);
      const indicatorPole = new THREE.Mesh(indicatorGeo, steelSilverMat);
      indicatorPole.position.set(1.5, 1.3, 1.5);
      group.add(indicatorPole);

      const statusLightGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const statusLightMat = m.status === 'Warning' ? highGlowAmberMat : highGlowCyanMat;
      const statusLight = new THREE.Mesh(statusLightGeo, statusLightMat);
      statusLight.position.set(1.5, 2.3, 1.5);
      group.add(statusLight);

      // Local Point Light from machine status
      const machPoint = new THREE.PointLight(m.status === 'Warning' ? 0xf59e0b : 0x06b6d4, 1.2, 8);
      machPoint.position.set(0, 3, 0);
      group.add(machPoint);

      // Distinct Machine Types based on Zone
      if (m.zone.includes('Robotic') || m.zone.includes('Assembly')) {
        // --- 6-AXIS ARTICULATED ROBOTIC ARM ---
        const waistGroup = new THREE.Group();
        waistGroup.position.set(0, 0.4, 0);

        const waistBaseGeo = new THREE.CylinderGeometry(0.8, 1.0, 0.8, 24);
        const waistBase = new THREE.Mesh(waistBaseGeo, industrialOrangeMat);
        waistBase.position.y = 0.4;
        waistBase.castShadow = !isSoftwareGl;
        waistGroup.add(waistBase);

        // Shoulder joint
        const shoulderGeo = new THREE.SphereGeometry(0.65, 20, 20);
        const shoulder = new THREE.Mesh(shoulderGeo, steelDarkMat);
        shoulder.position.y = 0.9;
        waistGroup.add(shoulder);

        // Primary arm (link 1)
        const armGroup = new THREE.Group();
        armGroup.position.set(0, 0.9, 0);

        const armLinkGeo = new THREE.BoxGeometry(0.45, 2.2, 0.55);
        const armLink = new THREE.Mesh(armLinkGeo, industrialOrangeMat);
        armLink.position.set(0, 1.1, 0.2);
        armLink.rotation.x = 0.35;
        armGroup.add(armLink);

        // Forearm (link 2)
        const forearmGroup = new THREE.Group();
        forearmGroup.position.set(0, 2.0, 0.6);

        const elbowGeo = new THREE.SphereGeometry(0.5, 18, 18);
        const elbow = new THREE.Mesh(elbowGeo, steelSilverMat);
        forearmGroup.add(elbow);

        const forearmLinkGeo = new THREE.CylinderGeometry(0.25, 0.3, 1.8, 16);
        const forearmLink = new THREE.Mesh(forearmLinkGeo, steelDarkMat);
        forearmLink.position.set(0, 0.9, -0.4);
        forearmLink.rotation.x = -0.7;
        forearmGroup.add(forearmLink);

        // Tool / End Effector (Welder or Gripper)
        const toolGroup = new THREE.Group();
        toolGroup.position.set(0, 1.6, -1.0);

        const wristGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.4, 16);
        const wrist = new THREE.Mesh(wristGeo, steelSilverMat);
        wrist.rotation.x = Math.PI / 2;
        toolGroup.add(wrist);

        // Tool Nozzle / Gripper fingers
        const toolTipGeo = new THREE.ConeGeometry(0.15, 0.6, 12);
        const toolTip = new THREE.Mesh(toolTipGeo, highGlowCyanMat);
        toolTip.position.z = -0.4;
        toolTip.rotation.x = -Math.PI / 2;
        toolGroup.add(toolTip);

        forearmGroup.add(toolGroup);
        armGroup.add(forearmGroup);
        waistGroup.add(armGroup);
        group.add(waistGroup);

        roboticArmsList.push({
          waist: waistGroup,
          arm: armGroup,
          forearm: forearmGroup,
          tool: toolGroup,
          baseAngle: Math.random() * Math.PI,
        });

        // Add to exploded view tracker
        explodedGroups.push(
          { object: armGroup, basePos: new THREE.Vector3(0, 0.9, 0), explodeOffset: new THREE.Vector3(0, 1.5, 0) },
          { object: forearmGroup, basePos: new THREE.Vector3(0, 2.0, 0.6), explodeOffset: new THREE.Vector3(0, 2.8, 1.2) }
        );
      } else if (m.zone.includes('CNC')) {
        // --- 5-AXIS CNC MACHINING CENTER ENCLOSURE ---
        const mainHousingGeo = new THREE.BoxGeometry(3.2, 3.4, 3.2);
        const mainHousing = new THREE.Mesh(mainHousingGeo, steelDarkMat);
        mainHousing.position.y = 1.9;
        mainHousing.castShadow = !isSoftwareGl;
        group.add(mainHousing);

        // Glass observation window
        const windowGeo = new THREE.BoxGeometry(2.2, 1.8, 0.2);
        const windowMesh = new THREE.Mesh(windowGeo, glassMat);
        windowMesh.position.set(0, 2.2, 1.62);
        group.add(windowMesh);

        // CNC Top Fan / Tool Changer carousel
        const topRoofGeo = new THREE.BoxGeometry(2.8, 0.4, 2.8);
        const topRoof = new THREE.Mesh(topRoofGeo, industrialCyanMat);
        topRoof.position.y = 3.8;
        group.add(topRoof);

        // Digital Operator Console Screen
        const consoleGeo = new THREE.BoxGeometry(0.8, 1.2, 0.15);
        const consoleScreen = new THREE.Mesh(consoleGeo, highGlowCyanMat);
        consoleScreen.position.set(1.4, 2.0, 1.7);
        consoleScreen.rotation.y = -0.3;
        group.add(consoleScreen);

        explodedGroups.push(
          { object: topRoof, basePos: new THREE.Vector3(0, 3.8, 0), explodeOffset: new THREE.Vector3(0, 2.5, 0) },
          { object: windowMesh, basePos: new THREE.Vector3(0, 2.2, 1.62), explodeOffset: new THREE.Vector3(0, 0, 2.0) }
        );
      } else if (m.zone.includes('Metrology') || m.zone.includes('Inspection')) {
        // --- BRIDGE COORDINATE MEASURING MACHINE (CMM) ---
        // Granite base
        const graniteGeo = new THREE.BoxGeometry(3.2, 0.8, 3.2);
        const graniteMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.1, metalness: 0.3 });
        const granite = new THREE.Mesh(graniteGeo, graniteMat);
        granite.position.y = 0.8;
        group.add(granite);

        // Bridge Columns (Uprights)
        const colGeo = new THREE.BoxGeometry(0.4, 2.8, 0.6);
        const colLeft = new THREE.Mesh(colGeo, steelSilverMat);
        colLeft.position.set(-1.2, 2.2, 0);
        group.add(colLeft);

        const colRight = new THREE.Mesh(colGeo, steelSilverMat);
        colRight.position.set(1.2, 2.2, 0);
        group.add(colRight);

        // Bridge Crossbeam
        const beamGeo = new THREE.BoxGeometry(2.8, 0.5, 0.7);
        const bridgeBeam = new THREE.Mesh(beamGeo, industrialCyanMat);
        bridgeBeam.position.set(0, 3.4, 0);
        group.add(bridgeBeam);

        // Z-axis Ram & Ruby Probe
        const ramGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.6, 16);
        const ram = new THREE.Mesh(ramGeo, steelSilverMat);
        ram.position.set(0, 2.3, 0);
        group.add(ram);

        const rubyTipGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const rubyMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const ruby = new THREE.Mesh(rubyTipGeo, rubyMat);
        ruby.position.set(0, 1.45, 0);
        group.add(ruby);

        // Inspected test workpiece on granite table
        const partGeo = new THREE.CylinderGeometry(0.6, 0.8, 0.6, 8);
        const partMesh = new THREE.Mesh(partGeo, steelSilverMat);
        partMesh.position.set(0, 1.5, 0);
        group.add(partMesh);

        explodedGroups.push(
          { object: bridgeBeam, basePos: new THREE.Vector3(0, 3.4, 0), explodeOffset: new THREE.Vector3(0, 2.2, 0) },
          { object: ram, basePos: new THREE.Vector3(0, 2.3, 0), explodeOffset: new THREE.Vector3(0, 1.2, 0) }
        );
      } else {
        // --- INDUSTRIAL AUTOMATION / ASRS / CONVEYOR CELL ---
        const mainUnitGeo = new THREE.BoxGeometry(3.0, 3.2, 2.4);
        const mainUnit = new THREE.Mesh(mainUnitGeo, steelDarkMat);
        mainUnit.position.y = 1.8;
        group.add(mainUnit);

        const panelGeo = new THREE.BoxGeometry(2.2, 2.0, 0.1);
        const panelMesh = new THREE.Mesh(panelGeo, industrialCyanMat);
        panelMesh.position.set(0, 1.8, 1.25);
        group.add(panelMesh);

        // High rack vertical frame
        const rackGeo = new THREE.BoxGeometry(0.2, 5.0, 2.4);
        const rackL = new THREE.Mesh(rackGeo, steelSilverMat);
        rackL.position.set(-1.4, 3.2, 0);
        group.add(rackL);
        const rackR = new THREE.Mesh(rackGeo, steelSilverMat);
        rackR.position.set(1.4, 3.2, 0);
        group.add(rackR);

        explodedGroups.push(
          { object: panelMesh, basePos: new THREE.Vector3(0, 1.8, 1.25), explodeOffset: new THREE.Vector3(0, 0, 1.8) }
        );
      }

      // Add to interactive meshes for raycast click
      interactiveMeshes.push(group);
      scene.add(group);
    });

    stateRef.current.interactiveMeshes = interactiveMeshes;
    stateRef.current.explodedGroups = explodedGroups;
    stateRef.current.roboticArms = roboticArmsList;

    // 10. Moving Conveyor Line System
    const conveyorBeltGeo = new THREE.BoxGeometry(38, 0.35, 1.6);
    const conveyorBeltMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8, metalness: 0.2 });
    const conveyor = new THREE.Mesh(conveyorBeltGeo, conveyorBeltMat);
    conveyor.position.set(2, 0.8, 6);
    scene.add(conveyor);

    // Conveyor Legs
    for (let cx = -14; cx <= 18; cx += 8) {
      const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.8, 12);
      const legL = new THREE.Mesh(legGeo, steelSilverMat);
      legL.position.set(cx, 0.4, 5.3);
      scene.add(legL);
      const legR = new THREE.Mesh(legGeo, steelSilverMat);
      legR.position.set(cx, 0.4, 6.7);
      scene.add(legR);
    }

    // Moving workpieces on the conveyor
    const workpieces: THREE.Object3D[] = [];
    for (let i = 0; i < 7; i++) {
      const wpGroup = new THREE.Group();
      const wpGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.35, 16);
      const wpMesh = new THREE.Mesh(wpGeo, steelSilverMat);
      wpMesh.position.y = 0.2;
      wpGroup.add(wpMesh);

      // Part coordinate along conveyor
      wpGroup.position.set(-14 + i * 5, 1.0, 6);
      scene.add(wpGroup);
      workpieces.push(wpGroup);
    }
    stateRef.current.conveyorWorkpieces = workpieces;

    // 11. Raycaster for Machine Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      if (!canvasMountRef.current) return;
      const rect = canvasMountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, true);

      if (intersects.length > 0) {
        let hitObj: THREE.Object3D | null = intersects[0].object;
        while (hitObj && !hitObj.userData.machineData && hitObj.parent && hitObj.parent !== scene) {
          hitObj = hitObj.parent;
        }

        if (hitObj && hitObj.userData.machineData) {
          const mach = hitObj.userData.machineData as MachineData;
          handleSelectMachine(mach);
        }
      }
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('click', onPointerDown);

    // 12. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 13. Smooth Render Loop
    let lastTime = 0;
    const animate = (time: number) => {
      stateRef.current.frameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) * 0.001, 0.1);
      lastTime = time;

      // Animate robotic arms
      roboticArmsList.forEach((armObj, idx) => {
        const t = time * 0.0015 + idx * 1.5;
        armObj.waist.rotation.y = Math.sin(t * 0.8) * 0.7 + armObj.baseAngle;
        armObj.arm.rotation.x = Math.sin(t * 1.2) * 0.25 + 0.3;
        armObj.forearm.rotation.x = Math.cos(t * 1.4) * 0.3 - 0.5;
        armObj.tool.rotation.z = Math.sin(t * 2.0) * 0.4;
      });

      // Animate moving workpieces on the conveyor
      workpieces.forEach((wp) => {
        wp.position.x += delta * 2.2;
        if (wp.position.x > 20) {
          wp.position.x = -16;
        }
      });

      // Smooth camera transition if active
      if (stateRef.current.isTransitioningCamera && camera && controls) {
        camera.position.lerp(stateRef.current.targetCameraPos, delta * 3.5);
        controls.target.lerp(stateRef.current.targetControlsTarget, delta * 3.5);
        if (camera.position.distanceTo(stateRef.current.targetCameraPos) < 0.1) {
          stateRef.current.isTransitioningCamera = false;
        }
      }

      // Animate selected machine highlight beacon rotation & soft glow pulse
      if (stateRef.current.highlightRing && stateRef.current.highlightRing.visible) {
        stateRef.current.highlightRing.rotation.z += delta * 1.2;
        const pulse = 0.72 + 0.28 * Math.sin(time * 0.005);
        (stateRef.current.highlightRing.material as THREE.MeshBasicMaterial).opacity = pulse;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    stateRef.current.frameId = requestAnimationFrame(animate);
    setLoading(false);

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(stateRef.current.frameId);
      resizeObserver.disconnect();
      canvasDom.removeEventListener('click', onPointerDown);

      if (stateRef.current.renderer) {
        stateRef.current.renderer.dispose();
      }
      scene.clear();
    };
  }, [handleSelectMachine]);

  // Handle Exploded View transition
  useEffect(() => {
    const { explodedGroups } = stateRef.current;
    if (!explodedGroups) return;

    explodedGroups.forEach((item) => {
      if (explodedView) {
        item.object.position.copy(item.basePos).add(item.explodeOffset);
      } else {
        item.object.position.copy(item.basePos);
      }
    });
  }, [explodedView]);

  // Handle Auto Rotate
  useEffect(() => {
    if (stateRef.current.controls) {
      stateRef.current.controls.autoRotate = autoRotate;
      stateRef.current.controls.autoRotateSpeed = 1.2;
    }
  }, [autoRotate]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : ''
      }`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* 3D Canvas Mount Point */}
      <div ref={canvasMountRef} className="w-full h-full cursor-grab active:cursor-grabbing select-none" />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center z-30">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
            <div className="w-16 h-16 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-cyan-500/30 border-l-transparent animate-spin" />
          </div>
          <p className="mt-4 text-cyan-300 font-mono text-sm tracking-wider uppercase">Initializing 3D Virtual Factory...</p>
          <p className="text-slate-400 text-xs mt-1">Building procedural kinematics & industrial PBR textures</p>
        </div>
      )}

      {/* WebGL Fallback Message */}
      {webglError && (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center z-30">
          <AlertTriangle className="w-12 h-12 text-amber-400 mb-3" />
          <h3 className="text-lg font-semibold text-white">3D Hardware Acceleration Unavailable</h3>
          <p className="text-sm text-slate-400 max-w-md mt-2">{webglError}</p>
          <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs text-slate-300 max-w-md space-y-2">
            <p className="font-semibold text-cyan-400">Alternative Options:</p>
            <p>1. Enable hardware acceleration in your browser settings (chrome://settings/system).</p>
            <p>2. Use the interactive 2D Machine Fleet Table below to inspect all 8 factory zones and machines.</p>
          </div>
        </div>
      )}

      {/* Top Left: Scene Title & Live Status */}
      <div className="absolute top-4 left-4 z-20 pointer-events-auto flex items-center gap-3">
        <div className="glass-panel px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-lg border border-slate-700/60">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="text-xs font-semibold tracking-wider text-slate-200 uppercase font-mono">
            {isHeroMode ? 'QOVYRA Smart Factory 3D' : 'Navigable Virtual Manufacturing Facility'}
          </span>
          <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
            PBR High-Fi
          </span>
        </div>
      </div>

      {/* Top Right: Quick View Presets & Fullscreen */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 glass-panel p-1 rounded-xl border border-slate-700/60 shadow-lg">
          <button
            onClick={() => applyCameraPreset('overview')}
            className={`px-3 py-1 text-xs rounded-lg transition-all btn-futuristic ${
              activeCameraPreset === 'overview' ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => applyCameraPreset('cnc')}
            className={`px-3 py-1 text-xs rounded-lg transition-all btn-futuristic ${
              activeCameraPreset === 'cnc' ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            CNC Bay
          </button>
          <button
            onClick={() => applyCameraPreset('welding')}
            className={`px-3 py-1 text-xs rounded-lg transition-all btn-futuristic ${
              activeCameraPreset === 'welding' ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Laser Robot
          </button>
          <button
            onClick={() => applyCameraPreset('inspection')}
            className={`px-3 py-1 text-xs rounded-lg transition-all btn-futuristic ${
              activeCameraPreset === 'inspection' ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            CMM Lab
          </button>
          <button
            onClick={() => applyCameraPreset('assembly')}
            className={`px-3 py-1 text-xs rounded-lg transition-all btn-futuristic ${
              activeCameraPreset === 'assembly' ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/20' : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Assembly
          </button>
        </div>

        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          className="p-2 glass-panel rounded-xl text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all btn-futuristic active:scale-95"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Selected Machine Telemetry Inspector Drawer */}
      {selectedMachine && (
        <div className="absolute top-16 right-4 z-20 pointer-events-auto w-80 sm:w-96 glass-panel-glow rounded-2xl p-5 border border-cyan-400/50 shadow-2xl shadow-cyan-950/40 animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-300 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-700/80 font-bold">
                  {selectedMachine.code} • {selectedMachine.zone}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mt-1.5 leading-snug">{selectedMachine.name}</h4>
            </div>
            <button
              onClick={() => handleSelectMachine(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors btn-futuristic active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedMachine.function}</p>

          {selectedMachine.qualityAlert && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-950/70 border border-amber-500/60 flex items-start gap-2 shadow-sm shadow-amber-500/10">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-[11px] text-amber-200 leading-tight">
                <span className="font-semibold text-amber-300">Quality Advisory: </span>
                {selectedMachine.qualityAlert}
              </div>
            </div>
          )}

          {/* Machine Real-Time Metrics Grid */}
          <div className="grid grid-cols-2 gap-2 mt-3.5">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Operating Status</div>
              <div className="text-xs font-semibold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {selectedMachine.status}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">OEE Efficiency</div>
              <div className="text-xs font-semibold text-cyan-300 mt-0.5">{selectedMachine.efficiency}%</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Shift Production</div>
              <div className="text-xs font-semibold text-white mt-0.5">{selectedMachine.productionCount.toLocaleString()} units</div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Defect Count</div>
              <div className={`text-xs font-semibold mt-0.5 ${selectedMachine.defectCount > 10 ? 'text-amber-400' : 'text-slate-300'}`}>
                {selectedMachine.defectCount} units
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1 font-mono">
            <div><span className="text-slate-500">Inspection Standard:</span> {selectedMachine.inspectionSpec}</div>
            <div><span className="text-slate-500">Last Calibrated:</span> {selectedMachine.lastCalibrated}</div>
          </div>
        </div>
      )}

      {/* Ergonomic Collapsible Bottom Control Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center max-w-[94vw]">
        {/* Toggle Collapse Pill */}
        <button
          onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
          className="mb-1.5 px-3.5 py-1 rounded-full glass-panel text-[11px] font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 shadow-md border border-slate-700/60 btn-futuristic active:scale-95"
        >
          {isControlsCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" /> Show 3D Controls
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" /> Hide Controls
            </>
          )}
        </button>

        {/* Unified Bottom Control Dock */}
        {!isControlsCollapsed && (
          <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-2 sm:gap-3.5 shadow-2xl border border-slate-700/80 flex-wrap justify-center backdrop-blur-xl">
            {/* Auto Rotate Toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`px-3 py-1.5 text-xs rounded-xl flex items-center gap-1.5 transition-all btn-futuristic active:scale-95 ${
                autoRotate
                  ? 'glow-active-cyan font-bold shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40'
              }`}
            >
              <RotateCcw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Auto Rotate</span> {autoRotate ? 'ON' : 'OFF'}
            </button>

            {/* Exploded View Toggle */}
            <button
              onClick={() => setExplodedView(!explodedView)}
              className={`px-3 py-1.5 text-xs rounded-xl flex items-center gap-1.5 transition-all btn-futuristic-violet active:scale-95 ${
                explodedView
                  ? 'glow-active-violet font-bold shadow-md shadow-violet-500/25'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700/60 hover:border-violet-500/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Exploded View</span>
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-700/60">
              <button
                onClick={() => handleZoom(1)}
                title="Zoom In"
                className="p-1.5 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-all btn-futuristic active:scale-90"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleZoom(-1)}
                title="Zoom Out"
                className="p-1.5 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 rounded-lg transition-all btn-futuristic active:scale-90"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Camera View */}
            <button
              onClick={handleResetCamera}
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-300 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/40 flex items-center gap-1.5 transition-all btn-futuristic active:scale-95"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Reset View</span>
            </button>

            {/* Interactive Orbit/Zoom Hint */}
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 font-mono border-l border-slate-700/80 pl-3">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Drag to Orbit • Scroll to Zoom • Click any machine</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
