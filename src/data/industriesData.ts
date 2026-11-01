import { IndustrySector } from '../types';

export const INDUSTRIES_DATA: IndustrySector[] = [
  {
    id: 'automotive',
    name: 'Automotive & E-Mobility',
    tagline: 'Zero-defect manufacturing, battery pack reliability, and IATF 16949 compliance.',
    icon: 'Car',
    challenges: [
      'Managing high-volume dimensional tolerance stack-ups across mixed stamped steel and aluminum chassis',
      'EV lithium-ion battery cell tab welding defects, thermal runaway prevention, and ultrasonic weld integrity',
      'Complex multi-tier global supply chains requiring strict PPAP Level 3 approvals',
      'Tightening safety regulations and autonomous driving ADAS sensor calibration requirements'
    ],
    inspectionStages: [
      'Incoming Coil & Die Casting Metrology (spectrometry, tensile proofing, X-ray porosity check)',
      'Body-in-White (BIW) In-line Optical Laser Radar Scanning (100% gap and flushness monitoring)',
      'Paint Shop E-Coat & Topcoat Film Thickness and orange-peel DOI wave-scan',
      'Powertrain & Battery Module Automated Optical (AOI) & Helium Leak Testing',
      'End-of-Line Dynamic Chassis Dyno & ADAS Camera/Radar Target Calibration'
    ],
    commonDefects: [
      'Resistance spot weld expulsion and undersized nuggets',
      'Stamped panel springback and surface wrinkling',
      'Battery module wire bond lift and micro-cracking',
      'Thread cross-threading on chassis suspension joints'
    ],
    qualityTools: [
      'AIAG & VDA FMEA Handbook (DFMEA & PFMEA)',
      'Production Part Approval Process (PPAP)',
      'Statistical Process Control (SPC - X-bar & R, Cpk/Ppk)',
      'Measurement Systems Analysis (Gage R&R)',
      '8D Problem Solving with 5-Why Root Cause'
    ],
    standards: [
      'IATF 16949:2016 (Automotive Quality Management System)',
      'ISO 9001:2015 (Foundational QMS)',
      'ISO 26262 (Road Vehicles Functional Safety)',
      'VDA 6.3 (Process Audit for German Automotive OEM Suppliers)'
    ],
    digitalTransformation: 'Deploying closed-loop machine vision inspection that feeds real-time offset adjustments to robotic weld guns and stamping press cushions, achieving sub-10 DPMO rates.',
    caseStudy: {
      title: 'Global EV OEM Battery Tray Sealing & Weld Quality Transformation',
      organization: 'Tier-1 Electric Vehicle Powertrain Supplier',
      challenge: 'Experienced a 4.2% failure rate in automated laser welding of aluminum battery tray cooling channels during pressure leak testing.',
      solution: 'Implemented real-time optical pyrometry melt pool monitoring integrated with automated laser power compensation and robotic seam tracking.',
      results: 'Defect rate dropped from 4.2% to 0.08%, cycle time reduced by 14%, and annual scrap cost savings exceeded $1.85M.'
    }
  },
  {
    id: 'aerospace',
    name: 'Aerospace & Defense',
    tagline: 'Mission-critical flight safety, Nadcap special processes, and AS9100D rigor.',
    icon: 'Plane',
    challenges: [
      'Extreme operating environments (cryogenic to 1600°C) demanding exotic superalloys (Inconel, titanium, ceramic matrix composites)',
      'Subsurface microstructural defect detection in single-crystal turbine blades and rotating discs',
      'Stringent traceability requirements tracking every mill heat batch and manufacturing process parameter for 40+ years',
      'Strict AS9102 First Article Inspection (FAI) with zero-tolerance acceptance criteria'
    ],
    inspectionStages: [
      'Vacuum Induction Melting (VIM) / ESR Raw Ingot Ultrasonic Immersion Testing',
      'Nadcap-certified Fluorescent Penetrant Inspection (FPI Sensitivity Level 4)',
      'Automated High-Resolution Computed Tomography (CT) for Additive Aero Components',
      'Coordinate Measuring Machine (CMM) Scan of Airfoil Profiles against 3D CAD spline models',
      'Hot Isostatic Pressing (HIP) and Metallographic Sectioning Verification'
    ],
    commonDefects: [
      'Barely Visible Impact Damage (BVID) and composite delamination',
      'Machining white layer and residual tensile stress in nickel superalloys',
      'Laser powder bed fusion keyhole porosity in 3D printed brackets',
      'Thermal barrier coating (TBC) spallation and ceramic bond coat oxidation'
    ],
    qualityTools: [
      'AS9145 (Advanced Product Quality Planning and PPAP for Aerospace)',
      'Fault Tree Analysis (FTA) and FMECA',
      'Weibull Reliability Analysis for MTBF and B10 Life',
      'Nadcap Audit Checklists (AC7114 NDT, AC7108 Chemical Processing)'
    ],
    standards: [
      'AS9100 Rev D (Aviation, Space, and Defense Organizations)',
      'AS9102 (Aerospace First Article Inspection Requirement)',
      'FAA Part 21 & Part 145 / EASA Part 21',
      'MIL-STD-810H (Environmental Engineering Considerations and Lab Tests)'
    ],
    digitalTransformation: 'Digital Twin of aero-engine life tracking real-time fleet telemetry, stress cycles, and vibration spectra to predict creep and thermal fatigue prior to component distress.',
    caseStudy: {
      title: 'Turbine Vane Investment Casting Yield Optimization',
      organization: 'Leading Commercial Jet Engine Manufacturer',
      challenge: 'Shrinkage micro-porosity in thin trailing edges of single-crystal cast vanes was causing a 16% reject rate during high-energy radiographic inspection.',
      solution: 'Used finite-element solidification modeling combined with automated CT scanning AI defect classifier to redesign ceramic core wax gating.',
      results: 'Yield increased from 84% to 96.8%, inspection cycle time decreased by 60%, fully compliant with Nadcap AC7114.'
    }
  },
  {
    id: 'manufacturing',
    name: 'Precision Manufacturing & CNC',
    tagline: 'Sub-micron dimensional accuracy, tool condition monitoring, and Lean Six Sigma.',
    icon: 'Cpu',
    challenges: [
      'Thermal expansion drift in multi-axis machining centers causing tolerance creep across 24/7 shifts',
      'Tool wear progression inducing regenerative machining chatter and degraded surface finishes',
      'Rapid changeovers (SMED) required for high-mix, low-volume (HMLV) job shop environments',
      'Balancing high cutting throughput with tool life and cutting fluid environmental compliance'
    ],
    inspectionStages: [
      'In-process Touch-Trigger Probing and tool setter laser measurement',
      'Post-machining White Light Interferometry for surface texture (Ra, Rz, Sa)',
      'Bridge CMM scanning in environmentally stabilized metrology room (20±0.5°C)',
      'Roundness and Cylindricity form tester inspection on bearing journals'
    ],
    commonDefects: [
      'Harmonic chatter marks and scallop height errors',
      'Thermal spindle growth leading to step mismatch on contour milling',
      'Burrs on cross-hole intersections causing fluid flow restrictions',
      'Subsurface cold work hardening and residual stress distortion'
    ],
    qualityTools: [
      'Statistical Process Control (SPC) with Real-Time Western Electric Rule alarms',
      'Design of Experiments (Taguchi & Full Factorial) for feed/speed optimization',
      'Single-Minute Exchange of Die (SMED)',
      'Total Productive Maintenance (TPM) and Overall Equipment Effectiveness (OEE)'
    ],
    standards: [
      'ISO 9001:2015 (Quality Management System)',
      'ISO 230 (Test code for machine tools - Geometric and Thermal accuracy)',
      'ISO 1101 (Geometrical Product Specifications - GD&T)',
      'ASME Y14.5-2018 (Dimensioning and Tolerancing Standard)'
    ],
    digitalTransformation: 'IoT vibration accelerometer sensors mounted on spindle cartridges feeding high-frequency FFT algorithms to predict bearing cage wear 200 hours before catastrophic runout.',
    caseStudy: {
      title: 'Hydraulic Valve Spool Precision Bore Lapping Capability Enhancement',
      organization: 'Precision Industrial Fluid Power Manufacturer',
      challenge: 'Diameter tolerance of 12.000 +0.003/-0.000 mm suffered from poor capability (Cpk = 0.92) with excessive manual sorting.',
      solution: 'Implemented in-situ pneumatic air gauging coupled with automated adaptive honing stroke correction and SPC real-time rule alerts.',
      results: 'Process capability surged to Cpk = 1.84, scrap dropped by 91%, zero out-of-tolerance parts shipped to downstream assembly.'
    }
  },
  {
    id: 'electronics',
    name: 'Electronics & Semiconductors',
    tagline: 'Sub-micron semiconductor metrology, wafer yield learning, and IPC Class 3 soldering.',
    icon: 'Microchip',
    challenges: [
      'Sub-nanometer particle contamination during extreme ultraviolet (EUV) photolithography',
      'Thermo-mechanical warpage during reflow of multi-chip 2.5D/3D advanced semiconductor packaging',
      'Head-in-Pillow (HiP) and micro-voiding in high-density Ball Grid Arrays (BGA)',
      'Electromigration and dielectric breakdown over 10-year automotive mission profiles'
    ],
    inspectionStages: [
      'Wafer Fab In-line Ellipsometry & Brightfield/Darkfield Particle Inspection',
      'Post-Dicing Automated Die Attach & Wire Bond Optical Shear Testing',
      '3D Solder Paste Inspection (3D SPI) measuring paste height, area, and volume',
      'High-Speed 3D Automated Optical Inspection (AOI) & Automated X-ray Inspection (AXI)',
      'In-Circuit Testing (ICT), Boundary Scan, and High-Temperature Operating Life (HTOL)'
    ],
    commonDefects: [
      'Solder bridging and insufficient solder joint volume',
      'BGA Head-in-Pillow (HiP) and voiding exceeding IPC 25% threshold',
      'PCB delamination and micro-via barrel cracking after reflow shock',
      'Electrostatic Discharge (ESD) latent gate oxide puncturing'
    ],
    qualityTools: [
      'DMAIC Six Sigma for yield enhancement',
      'Failure Mode, Effects, and Diagnostic Analysis (FMEDA)',
      'Weibull plot lifetime modeling and Arrhenius temperature acceleration modeling',
      'ESD Control per ANSI/ESD S20.20'
    ],
    standards: [
      'IPC-A-610 Class 3 (Acceptability of Electronic Assemblies)',
      'J-STD-001 (Requirements for Soldered Electrical and Electronic Assemblies)',
      'AEC-Q100 / AEC-Q101 / AEC-Q200 (Automotive Electronics Council Qualification)',
      'ISO/IEC 17025 (General Requirements for the Competence of Testing Labs)'
    ],
    digitalTransformation: 'Deep-learning defect vision models classifying SEM images of wafer pattern defects in milliseconds, categorizing bridge/break/particle mechanisms automatically.',
    caseStudy: {
      title: 'Automotive Radar High-Density SMT Line First-Pass Yield Improvement',
      organization: 'Tier-1 Advanced Driver Assistance Radar Manufacturer',
      challenge: 'High SMT rework rates (6.4%) caused by micro-bridging on 0.4mm pitch fine-pitch QFN and BGA packages.',
      solution: 'Closed-loop communication between 3D SPI and screen printer adjusting solder stencil wipe frequency and squeegee pressure automatically.',
      results: 'First-Pass Yield jumped from 93.6% to 99.4%, eliminating over 1,200 hours of manual microscopic PCB touch-up per quarter.'
    }
  },
  {
    id: 'medical-devices',
    name: 'Medical Devices & Life Sciences',
    tagline: 'Patient safety, Design Controls, ISO 13485, and FDA 21 CFR Part 820 / QMSR.',
    icon: 'Activity',
    challenges: [
      'Absolute requirement for bio-compatibility and sterility assurance level (SAL 10^-6)',
      'Strict risk management under ISO 14971 tying failure severity directly to patient harm',
      'Comprehensive Design History File (DHF) and Device Master Record (DMR) traceability',
      'Validation of automated manufacturing processes (IQ/OQ/PQ) where testing cannot verify conformity'
    ],
    inspectionStages: [
      'Raw Polymer & Titanium Bio-compatibility and Melt Flow Index Verification',
      'Cleanroom ISO Class 5/7 Particulate and Bioburden Monitoring',
      '100% Non-contact Optical Vision Inspection for needle sharp points and stent struts',
      'Package Barrier Integrity Dye Penetration (ASTM F1929) and Seal Strength (ASTM F88)',
      'Ethylene Oxide (EtO) / Gamma Sterilization Biological Indicator Validation'
    ],
    commonDefects: [
      'Pinhole leaks or seal wrinkles in sterile barrier pouches',
      'Micro-burrs on surgical cutting blades and vascular cannula tips',
      'Dimensional wall thickness variation on extruded catheter tubing',
      'Particulate shedding in sterile fluid paths'
    ],
    qualityTools: [
      'ISO 14971 Risk Management (Hazard Analysis, dFMEA, uFMEA for Usability)',
      'Process Validation (IQ - Installation, OQ - Operational, PQ - Performance Qualification)',
      'CAPA (Corrective and Preventive Action) systems with root cause verification',
      'Post-Market Clinical Follow-up (PMCF) and vigilance reporting'
    ],
    standards: [
      'ISO 13485:2016 (Medical Devices Quality Management Systems)',
      'FDA 21 CFR Part 820 (Quality System Regulation / QMSR)',
      'EU MDR 2017/745 (European Medical Device Regulation)',
      'ISO 14971:2019 (Application of Risk Management to Medical Devices)'
    ],
    digitalTransformation: 'End-to-end eQMS integrating unique device identification (UDI) barcoding, electronic batch records (eBR), and automated non-conformance trending.',
    caseStudy: {
      title: 'Orthopedic Titanium Hip Stem Porous Coating Process Qualification',
      organization: 'Global Orthopedic Implant Producer',
      challenge: 'High variation in plasma spray coating shear strength (ASTM F1147) during initial scale-up.',
      solution: 'Conducted response surface methodology (RSM) Design of Experiments on argon gas flow, plasma arc current, and substrate grit blast roughness.',
      results: 'Achieved robust process capability Cpk = 1.95, passed FDA 510(k) clearance audit with zero 483 observations.'
    }
  },
  {
    id: 'energy',
    name: 'Energy, Nuclear & Renewable Power',
    tagline: 'Asset integrity, ASME Boiler & Pressure Vessel codes, and 30-year operational reliability.',
    icon: 'Zap',
    challenges: [
      'Extreme corrosion and hydrogen embrittlement in subsea oil & gas and offshore wind foundations',
      'Nuclear containment vessel weld integrity requiring ASME Section III Quality Assurance (N-type stamps)',
      'Fatigue cracking in giant 110-meter wind turbine composite blades under extreme gust aerodynamics',
      'High consequence of failure (environmental catastrophe, toxic chemical release, power grid blackouts)'
    ],
    inspectionStages: [
      'Heavy Forging Ultrasonic Angle Beam and Phased Array Volumetric Testing',
      'Weld Root Pass Dye Penetrant and Continuous Interpass Temperature Pyrometry',
      'Post-Weld Heat Treatment (PWHT) Chart Review for Stress Relief Soaking',
      'Hydrostatic Proof Pressure Testing at 1.5× Maximum Allowable Working Pressure (MAWP)',
      'Drone-Mounted Infrared Thermography of Operating Wind Turbine Blades and Solar Arrays'
    ],
    commonDefects: [
      'Hydrogen-induced cracking and stress corrosion cracking (SCC) in sour gas service',
      'Creep void formation in superheater headers operating at 580°C',
      'Internal delamination and lightning strike burn-through in wind turbine spar caps',
      'Weld root incomplete penetration in heavy-wall ASME pressure vessels'
    ],
    qualityTools: [
      'Risk-Based Inspection (RBI per API 580/581)',
      'Fitness-For-Service (FFS per API 579 / ASME FFS-1)',
      'Root Cause Failure Analysis (RCFA) with metallographic SEM fractography',
      'Asset Performance Management (APM) and Predictive Maintenance'
    ],
    standards: [
      'ASME BPVC Section VIII (Rules for Construction of Pressure Vessels)',
      'ASME Section III (Rules for Construction of Nuclear Facility Components)',
      'API 6A / API 17D (Wellhead and Subsea Equipment)',
      'ISO 29001 (Petroleum, Petrochemical, and Natural Gas Quality Management)'
    ],
    digitalTransformation: 'Digital Twin of steam boiler headers calculating consumed fatigue-creep fraction based on real-time temperature and pressure transients, optimizing overhaul intervals.',
    caseStudy: {
      title: 'Offshore Wind Monopile Girth Weld Reliability Optimization',
      organization: 'Offshore Renewable Energy Foundation Fabricator',
      challenge: 'Girth welds in 90mm thick S355ML structural steel experienced 7.8% weld repair rate due to lack of sidewall fusion.',
      solution: 'Introduced tandem submerged arc welding (SAW) with automated laser groove tracking and real-time Phased Array UT integration.',
      results: 'Weld repair rate plummeted from 7.8% to 0.4%, saving 45 days of dry dock turnaround time on a 60-turbine wind farm project.'
    }
  },
  {
    id: 'heavy-engineering',
    name: 'Heavy Engineering & Mining',
    tagline: 'High-tonnage structures, structural steel integrity, and heavy machinery uptime.',
    icon: 'Truck',
    challenges: [
      'Massive structural weldments experiencing high cyclical dynamic fatigue and impact shock loads',
      'Severe abrasive wear in excavators, ball mill liners, and crushers requiring hardfacing QA',
      'Heavy gear tooth surface pitting and bending fatigue in high-torque industrial gearboxes',
      'Managing heat distortion in multi-pass structural weldments exceeding 100mm plate thickness'
    ],
    inspectionStages: [
      'Heavy Plate Ultrasonic Lamination Checking per ASTM A435/A578',
      'Magnetic Particle Inspection (MPI) of All Full Penetration Structural Welds',
      'Flame Hardening and Carburizing Case Depth Verification via Rockwell Hardness traverses',
      'Large Gear Hobbing Lead and Involute Profile Measurement on Heavy CNC Gear Checkers',
      'Proof Load Testing with Calibrated Dynamometers and Strain Gauge telemetry'
    ],
    commonDefects: [
      'Lamellar tearing in thick steel plates under heavy through-thickness Z-direction tensile stress',
      'Macro-porosity and slag inclusions in flux-cored arc welding (FCAW) of heavy girders',
      'Subsurface rolling contact fatigue spalling on gear teeth and track rollers',
      'Distortion and bow warping exceeding allowable structural tolerances'
    ],
    qualityTools: [
      'Welding Procedure Qualification Record (PQR) & Welder Performance Qualification (WPQ)',
      'Failure Modes and Effects Analysis on high-stress weld joints',
      'Finite Element Stress Analysis (FEA) cross-validated with strain gauge testing',
      'Standard Operating Procedures (SOP) and Poka-Yoke weld sequencing'
    ],
    standards: [
      'AWS D1.1 / D1.1M (Structural Welding Code - Steel)',
      'ISO 3834 (Quality Requirements for Fusion Welding of Metallic Materials)',
      'EN 1090-2 (Execution of Steel Structures and Aluminium Structures)',
      'AGMA 2001 (Fundamental Rating Factors and Calculation Methods for Involute Spur and Helical Gear Teeth)'
    ],
    digitalTransformation: 'Deploying wireless tri-axial vibration and acoustic emission sensors on mining crushers to detect internal shaft fatigue micro-cracking weeks before failure.',
    caseStudy: {
      title: 'Mining Dragline Boom Structural Weldment Fatigue Life Extension',
      organization: 'Heavy Mining Equipment Manufacturer',
      challenge: 'Tubular chord joints on 100-meter dragline booms experienced fatigue cracking after 18 months of open-pit mining operation.',
      solution: 'Applied High-Frequency Mechanical Impact (HFMI / Ultrasonic Peening) to weld toes to induce beneficial compressive residual stresses.',
      results: 'Weld fatigue strength increased by 140%, eliminating chord cracking and extending boom maintenance intervals from 18 months to over 6 years.'
    }
  },
  {
    id: 'industrial-automation',
    name: 'Industrial Automation & Robotics',
    tagline: 'Repeatability, motion kinematics, cyber-physical integration, and ISO 10218 safety.',
    icon: 'Bot',
    challenges: [
      'Maintaining sub-millimeter positional repeatability over millions of high-acceleration motion cycles',
      'Cable harness fatigue and flexural failure in robot articulated dress packs',
      'Harmonic drive and cycloidal reducer backlash wear over prolonged duty cycles',
      'Safety validation of collaborative robot (Cobot) power and force limiting applications'
    ],
    inspectionStages: [
      'Laser Tracker Dynamic Robot Volumetric Accuracy Calibration per ISO 9283',
      'Torque Ripple and Motor Cogging Measurement on high-torque servo drives',
      'Cyclic Flex Endurance Testing of robotic high-flex cables (10 million cycle test rigs)',
      'Cobot Impact Force and Pressure Biomechanical Verification per ISO/TS 15066',
      'Electromagnetic Compatibility (EMC) and Electrical Safety testing per IEC 60204-1'
    ],
    commonDefects: [
      'Backlash increase and lost motion in precision gearboxes',
      'Intermittent CAN/EtherCAT communication dropouts due to cable shielding degradation',
      'Servo motor encoder quadrature signal noise and thermal drift',
      'Gripper pneumatics pressure drops causing workpiece release errors'
    ],
    qualityTools: [
      'ISO 9283 Manipulating Industrial Robots - Performance Criteria and Test Methods',
      'Process Capability Studies on robotic pick-and-place accuracy',
      'Weibull Reliability Testing on servo actuators and robot bearings',
      'Failure Modes, Effects, and Diagnostic Analysis (FMEDA) for Safety Integrity Level (SIL)'
    ],
    standards: [
      'ISO 10218-1 / ISO 10218-2 (Robots and Robotic Devices - Safety Requirements)',
      'ISO/TS 15066 (Robots - Collaborative Robots Safety Specification)',
      'IEC 61508 / IEC 62061 (Functional Safety of Safety-Related Control Systems)',
      'IEC 60204-1 (Safety of Machinery - Electrical Equipment of Machines)'
    ],
    digitalTransformation: 'Continuous kinematic analytics monitoring robot motor current signatures to detect reducer gear wear and friction spikes without taking the production line offline.',
    caseStudy: {
      title: 'High-Speed SCARA Robot Assembly Repeatability Stabilization',
      organization: 'Precision Industrial Robotics Manufacturer',
      challenge: 'SCARA robots in high-speed smartphone assembly showed repeatability degradation from ±0.010mm to ±0.045mm after 6 months of continuous 120 PPM operation.',
      solution: 'Redesigned cycloidal bearing preload mechanism and introduced thermal compensation algorithms using embedded temperature sensors.',
      results: 'Restored repeatability to ±0.008mm across 3 shifts, expanding warranty interval from 12 months to 36 months.'
    }
  },
  {
    id: 'consumer-products',
    name: 'Consumer Products & High-Volume Goods',
    tagline: 'High-speed automated inspection, cosmetic Class-A surfaces, and AQL sampling.',
    icon: 'Package',
    challenges: [
      'Ultra-high line speeds (1000+ units per minute) making traditional manual inspection impossible',
      'Class-A cosmetic finish requirements where microscopic scratches or color shifts cause customer returns',
      'Stringent consumer safety regulations (CPSIA, RoHS, REACH, food contact FDA regulations)',
      'Balancing high quality with low unit costs in ultra-competitive consumer markets'
    ],
    inspectionStages: [
      'High-Speed 2D/3D Machine Vision on Continuous Web or Conveyor (1500 units/min)',
      'Spectrophotometer Color Measurement (Delta E ≤ 0.5 under D65 daylight)',
      'Drop, Tumble, and Environmental Thermal Shock Reliability Testing',
      'Acceptance Sampling Inspection per ANSI/ASQ Z1.4 (ISO 2859-1) at Final Packaging'
    ],
    commonDefects: [
      'Sink marks and weld lines in injection-molded aesthetic housings',
      'Color delta mismatch between separately molded plastic mating covers',
      'Label misplacement, skew, or unreadable 2D Datamatrix codes',
      'Snap-fit latch breakage during customer assembly'
    ],
    qualityTools: [
      'Acceptance Sampling Systems (AQL / LTPD, OC Curves)',
      'Colorimetry & Glossimetry (CIELAB Delta E*ab evaluation)',
      'Statistical Process Control (p-charts, c-charts for defect rates)',
      'Value Engineering & Design for Manufacturing/Assembly (DFMA)'
    ],
    standards: [
      'ISO 2859-1 / ANSI/ASQ Z1.4 (Sampling Procedures for Inspection by Attributes)',
      'ASTM D5276 (Drop Test of Loaded Containers by Free Fall)',
      'RoHS Directive 2011/65/EU & REACH Regulation (EC) No 1907/2006',
      'ISO 9001:2015 (Quality Management System)'
    ],
    digitalTransformation: 'High-resolution line-scan cameras paired with GPU-accelerated vision transformers identifying sub-millimeter cosmetic paint flaws and label skew on 1,200 bottles per minute.',
    caseStudy: {
      title: 'Consumer Electronics Premium Smartphone Housing Anodizing Finish Perfection',
      organization: 'Global Smart Device Contract Manufacturer',
      challenge: 'High customer return rate (3.8%) due to subtle chromatic variation (Delta E > 1.2) across anodized aluminum chassis batches.',
      solution: 'Implemented closed-loop spectrophotometer bath chemical replenishment system and automated robotic multi-angle visual inspection.',
      results: 'Chroma variance dropped to Delta E < 0.35, cosmetic rejection plummeted by 84%, saving $4.2M annually in scrapped housings.'
    }
  }
];
