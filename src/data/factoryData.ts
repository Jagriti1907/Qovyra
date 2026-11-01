import { MachineData } from '../types';

export interface FactoryZone {
  id: string;
  name: string;
  number: number;
  description: string;
  machinesCount: number;
  operationalStatus: 'Optimal' | 'Caution' | 'Active';
  color: string;
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
}

export const FACTORY_ZONES: FactoryZone[] = [
  {
    id: 'zone-1',
    number: 1,
    name: 'Raw Material Inspection',
    description: 'Incoming metallurgical verification, optical emission spectrometry, and ultrasonic billet integrity scanning.',
    machinesCount: 2,
    operationalStatus: 'Optimal',
    color: '#06b6d4',
    cameraTarget: [-18, 1, 10],
    cameraPosition: [-18, 9, 22]
  },
  {
    id: 'zone-2',
    number: 2,
    name: 'CNC Machining Bay',
    description: 'High-precision 5-axis simultaneous milling centers and twin-spindle live tooling turning cells.',
    machinesCount: 2,
    operationalStatus: 'Optimal',
    color: '#3b82f6',
    cameraTarget: [-8, 1, 6],
    cameraPosition: [-8, 8, 18]
  },
  {
    id: 'zone-3',
    number: 3,
    name: 'Robotic Welding Cell',
    description: 'Automated 6-axis fiber laser welding and resistance spot welding systems with in-line pyrometric seam tracking.',
    machinesCount: 2,
    operationalStatus: 'Caution',
    color: '#f59e0b',
    cameraTarget: [4, 1, 6],
    cameraPosition: [4, 8, 18]
  },
  {
    id: 'zone-4',
    number: 4,
    name: 'Automated Assembly Line',
    description: 'High-speed robotic delta manipulators, transducerized DC nutrunners, and precision vision insertion stations.',
    machinesCount: 2,
    operationalStatus: 'Optimal',
    color: '#10b981',
    cameraTarget: [16, 1, 6],
    cameraPosition: [16, 8, 18]
  },
  {
    id: 'zone-5',
    number: 5,
    name: 'Surface Treatment & Coating',
    description: 'Automated immersion anodizing tanks, ultrasonic degreasing stages, and electrostatic robotic powder finishing.',
    machinesCount: 1,
    operationalStatus: 'Optimal',
    color: '#8b5cf6',
    cameraTarget: [-14, 1, -8],
    cameraPosition: [-14, 8, 4]
  },
  {
    id: 'zone-6',
    number: 6,
    name: 'Metrology & CMM Lab',
    description: 'Climate-controlled ISO Class 7 clean lab housing bridge CMMs, blue-light 3D fringe scanners, and laser trackers.',
    machinesCount: 2,
    operationalStatus: 'Optimal',
    color: '#06b6d4',
    cameraTarget: [-2, 1, -8],
    cameraPosition: [-2, 8, 4]
  },
  {
    id: 'zone-7',
    number: 7,
    name: 'Packaging & Box Palletizing',
    description: 'Case erecting, desiccant packet insertion, protective foam dispense, and robotic end-of-line palletizing.',
    machinesCount: 1,
    operationalStatus: 'Optimal',
    color: '#ec4899',
    cameraTarget: [10, 1, -8],
    cameraPosition: [10, 8, 4]
  },
  {
    id: 'zone-8',
    number: 8,
    name: 'Finished Goods Warehouse (ASRS)',
    description: 'Automated high-bay storage retrieval system with RFID pallet tagging and autonomous mobile robot (AMR) docking.',
    machinesCount: 2,
    operationalStatus: 'Optimal',
    color: '#6366f1',
    cameraTarget: [20, 2, -8],
    cameraPosition: [20, 10, 5]
  }
];

export const FACTORY_MACHINES: MachineData[] = [
  // Zone 1
  {
    id: 'MCH-101',
    name: 'SpectroMax Optical Emission Analyzer',
    code: 'OES-101',
    zone: 'Raw Material Inspection',
    status: 'Operational',
    function: 'Direct Spark Optical Emission Spectrometry for elemental alloy composition analysis (C, Si, Mn, Cr, Ni, Mo).',
    productionCount: 384,
    defectCount: 2,
    efficiency: 99.4,
    cycleTimeSec: 42,
    temperatureC: 22.1,
    vibrationMmS: 0.2,
    lastCalibrated: '2026-10-24',
    inspectionSpec: 'ASTM E415 / ISO 14707 - Spark OES Matrix Check',
    position: [-20, 0, 10],
    color: '#06b6d4'
  },
  {
    id: 'MCH-102',
    name: 'OmniScan Ultrasonic Bar Sorter',
    code: 'UT-102',
    zone: 'Raw Material Inspection',
    status: 'Operational',
    function: 'Automated phased-array ultrasonic pulse-echo immersion bar scanning for internal inclusions and pipes.',
    productionCount: 512,
    defectCount: 5,
    efficiency: 98.8,
    cycleTimeSec: 18,
    temperatureC: 24.3,
    vibrationMmS: 0.4,
    lastCalibrated: '2026-10-18',
    inspectionSpec: 'AMS-STD-2154 Class A Ultrasonic Standard',
    position: [-16, 0, 10],
    color: '#0ea5e9'
  },

  // Zone 2
  {
    id: 'MCH-201',
    name: 'DMG Mori 5-Axis Mill Master',
    code: 'CNC-5AX-201',
    zone: 'CNC Machining Bay',
    status: 'Operational',
    function: 'Simultaneous 5-axis high-speed precision machining with 24,000 RPM HSK-A63 motorized spindle.',
    productionCount: 1420,
    defectCount: 8,
    efficiency: 97.6,
    cycleTimeSec: 85,
    temperatureC: 41.5,
    vibrationMmS: 1.1,
    lastCalibrated: '2026-10-15',
    inspectionSpec: 'ISO 230-2 Geometric Positional Accuracy ±0.003mm',
    qualityAlert: 'Tool T08 (Ø12 Ball Endmill) wear indicator at 82% life.',
    position: [-10, 0, 6],
    color: '#3b82f6'
  },
  {
    id: 'MCH-202',
    name: 'Mazak Integrex Twin-Spindle Lathe',
    code: 'CNC-TRN-202',
    zone: 'CNC Machining Bay',
    status: 'Operational',
    function: 'Multi-tasking turning and milling center with dual opposed spindles and B-axis rotary head.',
    productionCount: 1190,
    defectCount: 6,
    efficiency: 98.2,
    cycleTimeSec: 64,
    temperatureC: 38.2,
    vibrationMmS: 0.8,
    lastCalibrated: '2026-10-21',
    inspectionSpec: 'ISO 10791 Dynamic Runout ≤ 0.002mm',
    position: [-6, 0, 6],
    color: '#2563eb'
  },

  // Zone 3
  {
    id: 'MCH-301',
    name: 'KUKA Cybertech Laser Welding Robot',
    code: 'ROB-WLD-301',
    zone: 'Robotic Welding Cell',
    status: 'Warning',
    function: '6kW fiber laser joining cell with seam-tracking optical triangulation and melt-pool pyrometer.',
    productionCount: 940,
    defectCount: 19,
    efficiency: 94.1,
    cycleTimeSec: 36,
    temperatureC: 56.4,
    vibrationMmS: 2.3,
    lastCalibrated: '2026-10-09',
    inspectionSpec: 'ISO 13919-1 Electron & Laser Welded Joints Class B',
    qualityAlert: 'Protective cover slide transmission dropped to 84%. Clean optical lens window.',
    position: [2, 0, 6],
    color: '#f59e0b'
  },
  {
    id: 'MCH-302',
    name: 'Fanuc Spot Servo Welder',
    code: 'SPT-WLD-302',
    zone: 'Robotic Welding Cell',
    status: 'Operational',
    function: 'Servo-electric resistance spot welding gun with mid-frequency inverter and dynamic tip force monitoring.',
    productionCount: 2210,
    defectCount: 11,
    efficiency: 98.7,
    cycleTimeSec: 14,
    temperatureC: 34.8,
    vibrationMmS: 0.9,
    lastCalibrated: '2026-10-26',
    inspectionSpec: 'AWS D8.9 Resistance Spot Weld Verification',
    position: [6, 0, 6],
    color: '#d97706'
  },

  // Zone 4
  {
    id: 'MCH-401',
    name: 'ABB FlexPicker Delta High-Speed Inserter',
    code: 'ASM-ROB-401',
    zone: 'Automated Assembly Line',
    status: 'Operational',
    function: 'High-speed parallel kinematic delta robot with vacuum gripper and 2D Cognex machine vision guidance.',
    productionCount: 3890,
    defectCount: 4,
    efficiency: 99.8,
    cycleTimeSec: 2.1,
    temperatureC: 28.1,
    vibrationMmS: 0.5,
    lastCalibrated: '2026-10-28',
    inspectionSpec: 'Vision Inspection Tolerance: Pitch ±0.05mm',
    position: [14, 0, 6],
    color: '#10b981'
  },
  {
    id: 'MCH-402',
    name: 'Atlas Copco Multi-Spindle DC Fastener Rig',
    code: 'ASM-TRQ-402',
    zone: 'Automated Assembly Line',
    status: 'Operational',
    function: 'Automated 4-spindle synchronized torque-angle transducer tightened joint controller.',
    productionCount: 2840,
    defectCount: 7,
    efficiency: 99.2,
    cycleTimeSec: 12.5,
    temperatureC: 31.4,
    vibrationMmS: 0.6,
    lastCalibrated: '2026-10-25',
    inspectionSpec: 'VDI/VDE 2862 Minimum Capability Cpk ≥ 1.67',
    position: [18, 0, 6],
    color: '#059669'
  },

  // Zone 5
  {
    id: 'MCH-501',
    name: 'SurfacePro Anodizing & E-Coat Carrier',
    code: 'SRF-REC-501',
    zone: 'Surface Treatment & Coating',
    status: 'Operational',
    function: 'Automated overhead flight bar gantry dipping into multi-stage deox, anodize, nickel acetate seal, and rinse.',
    productionCount: 1680,
    defectCount: 9,
    efficiency: 97.9,
    cycleTimeSec: 120,
    temperatureC: 48.0,
    vibrationMmS: 0.3,
    lastCalibrated: '2026-10-19',
    inspectionSpec: 'MIL-A-8625 Type II Class 1 Anodic Coating Thickness 18±3μm',
    position: [-14, 0, -8],
    color: '#8b5cf6'
  },

  // Zone 6
  {
    id: 'MCH-601',
    name: 'Zeiss Prismo Bridge CMM Metrology Cell',
    code: 'MET-CMM-601',
    zone: 'Metrology & CMM Lab',
    status: 'Operational',
    function: 'Ultra-high accuracy coordinate measuring machine with VAST scanning head (MPE_E: 0.9 + L/350 μm).',
    productionCount: 420,
    defectCount: 1,
    efficiency: 99.9,
    cycleTimeSec: 180,
    temperatureC: 20.0,
    vibrationMmS: 0.05,
    lastCalibrated: '2026-10-29',
    inspectionSpec: 'ISO 10360-2 Volumetric Length Measurement Error',
    position: [-4, 0, -8],
    color: '#06b6d4'
  },
  {
    id: 'MCH-602',
    name: 'GOM ATOS 3D Blue Light Optical Scanner',
    code: 'MET-OPT-602',
    zone: 'Metrology & CMM Lab',
    status: 'Operational',
    function: 'Full-field triple scan optical sensor capturing 16M measuring points per shot with real-time CAD color deviation mapping.',
    productionCount: 580,
    defectCount: 2,
    efficiency: 99.6,
    cycleTimeSec: 45,
    temperatureC: 20.1,
    vibrationMmS: 0.08,
    lastCalibrated: '2026-10-27',
    inspectionSpec: 'VDI/VDE 2634 Part 3 Optical 3D Measuring System Acceptance',
    position: [0, 0, -8],
    color: '#0284c7'
  },

  // Zone 7
  {
    id: 'MCH-701',
    name: 'RoboPack End-of-Line Boxing Cell',
    code: 'PKG-ROB-701',
    zone: 'Packaging & Box Palletizing',
    status: 'Operational',
    function: 'Automated carton erector, RFID barcode verification, thermo-shrink wrapping, and robotic pallet layering.',
    productionCount: 3100,
    defectCount: 3,
    efficiency: 99.7,
    cycleTimeSec: 8.2,
    temperatureC: 26.5,
    vibrationMmS: 0.7,
    lastCalibrated: '2026-10-22',
    inspectionSpec: 'ISTA 3A Packaging Transit Integrity Standard',
    position: [10, 0, -8],
    color: '#ec4899'
  },

  // Zone 8
  {
    id: 'MCH-801',
    name: 'Stoecklin High-Bay ASRS Crane 01',
    code: 'WHS-ASRS-801',
    zone: 'Finished Goods Warehouse (ASRS)',
    status: 'Operational',
    function: 'Twin-mast storage and retrieval crane operating in 18-meter rack aisles at 240 m/min travel velocity.',
    productionCount: 1850,
    defectCount: 0,
    efficiency: 99.9,
    cycleTimeSec: 28,
    temperatureC: 21.0,
    vibrationMmS: 0.4,
    lastCalibrated: '2026-10-12',
    inspectionSpec: 'FEM 9.851 Performance Specification for ASRS Machines',
    position: [18, 0, -8],
    color: '#6366f1'
  },
  {
    id: 'MCH-802',
    name: 'KION Autonomous Mobile Robot Dispatch Dock',
    code: 'WHS-AMR-802',
    zone: 'Finished Goods Warehouse (ASRS)',
    status: 'Operational',
    function: 'Fleet dispatch and automated wireless inductive charging hub for SLAM-navigated AGVs and AMRs.',
    productionCount: 2400,
    defectCount: 1,
    efficiency: 99.5,
    cycleTimeSec: 15,
    temperatureC: 23.2,
    vibrationMmS: 0.2,
    lastCalibrated: '2026-10-23',
    inspectionSpec: 'ANSI/ITSDF B56.5 Safety Standard for Driverless Industrial Vehicles',
    position: [22, 0, -8],
    color: '#4f46e5'
  }
];
