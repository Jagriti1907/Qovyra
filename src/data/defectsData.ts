import { DefectItem } from '../types';

export const DEFECTS_DATA: DefectItem[] = [
  // 1. Casting Defects
  {
    id: 'cast-01',
    name: 'Gas Porosity & Blowholes',
    category: 'Casting',
    severity: 'Major',
    description: 'Rounded cavities or voids caused by entrapped gases (hydrogen, nitrogen, steam) during molten metal solidification.',
    commonCauses: [
      'Moist sand molds or damp cores releasing steam',
      'Excessive dissolved hydrogen in molten aluminum or steel',
      'Inadequate mold venting and low sand permeability',
      'Turbulent pouring causing gas entrainment'
    ],
    detectionMethods: [
      'Radiographic Testing (RT / X-ray) per ASTM E155',
      'Ultrasonic Testing (UT) for subsurface voids',
      'Visual inspection of machined surfaces (revealing subsurface pores)',
      'Pressure decay leak testing for pressure vessels'
    ],
    preventionMethods: [
      'Rigorous inert gas degassing (argon/nitrogen lance) and rotary degassing',
      'Bake cores and dry sand molds thoroughly',
      'Optimize runner and gating ratios (unpressurized gating systems) to minimize turbulence',
      'Use high-permeability molding sands with adequate venting channels'
    ],
    correctiveActions: [
      'Scrap or quarantine affected melt batches',
      'Impregnate castings with anaerobic resin if within allowable non-structural specifications (MIL-I-17563)',
      'Recalibrate rotary degassing cycle time and rotor RPM'
    ],
    severityConsiderations: 'Causes pressure leakage in hydraulic manifolds and localized stress concentrations leading to fatigue failure under cyclical loads.',
    industrialExamples: 'Automotive aluminum cylinder heads leaking coolant during hydrostatic pressure proof testing at 3.5 bar.',
    standardReference: 'ASTM E155 / ASTM E446 / ISO 9915'
  },
  {
    id: 'cast-02',
    name: 'Shrinkage Cavity (Macro & Micro)',
    category: 'Casting',
    severity: 'Critical',
    description: 'Internal or surface depression formed when liquid metal contracts during cooling without sufficient feeder metal supply.',
    commonCauses: [
      'Improper riser size, shape, or placement',
      'Inadequate directional solidification towards risers',
      'Excessive pouring temperature causing heightened volumetric contraction',
      'Abrupt section thickness transitions without fillets'
    ],
    detectionMethods: [
      'X-ray Computed Tomography (Industrial CT)',
      'Ultrasonic Angle Beam Inspection (ASME Section V)',
      'Sectioning and macro-etching during First Article Inspection (FAI)'
    ],
    preventionMethods: [
      'Apply Chvorinov rule to design risers with freezing time longer than casting section',
      'Incorporate internal or external chills to enforce directional solidification',
      'Redesign fillets and tapering to equalize wall thickness gradients'
    ],
    correctiveActions: [
      'Modify casting tooling / pattern to increase feeder neck diameter',
      'Implement thermal simulation (MAGMASoft / ProCAST) before retooling'
    ],
    severityConsiderations: 'Severe internal stress raiser capable of sudden catastrophic brittle fracture under service loads.',
    industrialExamples: 'Turbine housing ductile iron casting displaying macro-shrinkage near heavy flange junctions.',
    standardReference: 'ASTM E446 / ISO 4993'
  },
  {
    id: 'cast-03',
    name: 'Hot Tears (Solidification Cracking)',
    category: 'Casting',
    severity: 'Critical',
    description: 'Ragged, discontinuous cracks formed at elevated temperatures near the solidus line due to thermal contraction restraint.',
    commonCauses: [
      'High mold/core rigidity hindering natural casting contraction',
      'High sulfur and phosphorus impurities creating low-melting eutectic films',
      'Wide solidification temperature freezing range of the alloy',
      'Abrupt geometric re-entrant corners without generous radii'
    ],
    detectionMethods: [
      'Fluorescent Magnetic Particle Inspection (MPI) per ASTM E1444',
      'Liquid Penetrant Inspection (LPI / PT) per ASTM E1417',
      'High-resolution visual inspection with optical boroscopes'
    ],
    preventionMethods: [
      'Use collapsibility-enhancing binders in sand cores (e.g. organic resin binders)',
      'Purify raw charge to maintain sulfur < 0.015% and phosphorus < 0.020%',
      'Apply generous fillets (radius ≥ 0.5 × wall thickness) at all section intersections'
    ],
    correctiveActions: [
      'Reject parts exhibiting through-thickness tears',
      'Weld repair only if permissible under ASME Section IX with pre-heat and post-weld stress relief'
    ],
    severityConsiderations: 'Unacceptable on critical structural castings; initiates immediate fatigue failure.',
    industrialExamples: 'Aerospace cast steel engine mounts cracking along thin-to-thick web junctions.',
    standardReference: 'ASTM E1444 / IATF 16949 Section 8.6'
  },

  // 2. Welding Defects
  {
    id: 'weld-01',
    name: 'Lack of Fusion (Cold Lap)',
    category: 'Welding',
    severity: 'Critical',
    description: 'Lack of coalescence between weld metal and parent metal, or between successive weld passes.',
    commonCauses: [
      'Insufficient heat input (amperage too low or travel speed too high)',
      'Improper torch angle or weave technique',
      'Oxide scales, rust, or grease on groove bevels',
      'Incorrect electrode positioning in narrow bevel preparations'
    ],
    detectionMethods: [
      'Phased Array Ultrasonic Testing (PAUT)',
      'Radiographic Testing (RT) angled along the bevel plane',
      'Transverse side-bend mechanical test per AWS D1.1'
    ],
    preventionMethods: [
      'Enforce Qualified Welding Procedure Specification (WPS) with verified heat input limits',
      'Thorough solvent degreasing and mechanical grinding of joint bevels',
      'Train and certify welders per ISO 9606 or ASME Section IX'
    ],
    correctiveActions: [
      'Gouge out defect zone using carbon arc gouging or precision grinding',
      'Perform dye penetrant test to ensure complete root removal before re-welding'
    ],
    severityConsiderations: 'Planar defect with sharp crack-like tip; high risk of brittle rupture in pressure piping.',
    industrialExamples: 'Cross-country API 5L natural gas pipeline girth weld failing radiographic inspection due to root sidewall lack of fusion.',
    standardReference: 'AWS D1.1 / ISO 5817 Level B / ASME BPVC Section IX'
  },
  {
    id: 'weld-02',
    name: 'Hydrogen-Induced Cold Cracking (HICC)',
    category: 'Welding',
    severity: 'Critical',
    description: 'Delayed cracking occurring in the Heat Affected Zone (HAZ) hours or days after welding cools below 150°C.',
    commonCauses: [
      'Presence of diffusible hydrogen (moisture on electrodes or fluxes)',
      'Susceptible hard microstructure (martensite with hardness > 350 HV)',
      'High residual tensile stress from joint restraint',
      'Low preheat or interpass temperature'
    ],
    detectionMethods: [
      'Time-delayed Ultrasonic Testing (minimum 48 hours post-welding)',
      'Fluorescent Magnetic Particle Testing (wet continuous method)',
      'Acoustic emission monitoring during cooldown'
    ],
    preventionMethods: [
      'Bake low-hydrogen electrodes (E7018) at 350°C for 2 hours and store in holding ovens at 120°C',
      'Maintain strict preheat and interpass temperatures determined by carbon equivalent (CE)',
      'Apply Post-Weld Heat Treatment (PWHT) or hydrogen bake-out soak at 250°C for 2 hours'
    ],
    correctiveActions: [
      'Excavate crack and 50mm beyond crack tips; inspect with MPI',
      'Preheat to higher temperature (T + 50°C) before re-deposition'
    ],
    severityConsiderations: 'Extreme risk; can cause unheralded catastrophic failure of offshore platforms and bridges.',
    industrialExamples: 'Subsea structural tubular joint cracking 36 hours after completion during winter ambient conditions.',
    standardReference: 'ISO 17642 / AWS D1.1 Annex H'
  },

  // 3. Machining Defects
  {
    id: 'mach-01',
    name: 'Machining Chatter & Tool Resonance',
    category: 'Machining',
    severity: 'Major',
    description: 'Self-excited regenerative vibration between tool and workpiece producing regular wavy patterns and degraded surface finish.',
    commonCauses: [
      'Excessive tool overhang or insufficient spindle/holder stiffness',
      'Spindle speed matching the natural frequency of the tool-workpiece system',
      'Aggressive radial or axial depth of cut exceeding machine stability lobe limits',
      'Inadequate fixture clamping stiffness'
    ],
    detectionMethods: [
      'Surface Roughness Profilometry (Ra / Rz evaluation)',
      'High-bandwidth accelerometer vibration monitoring on spindle housing',
      'Optical laser surface scanning with 3D topography profile'
    ],
    preventionMethods: [
      'Use stability lobe diagrams (SLD) to select sweet-spot spindle RPM',
      'Employ damped anti-vibration tool holders (shrink-fit or hydraulic chucks)',
      'Reduce tool stick-out length to ensure length-to-diameter ratio (L/D) ≤ 3:1',
      'Incorporate variable helix angle and unequal pitch milling cutters'
    ],
    correctiveActions: [
      'Adjust spindle speed ±10-15% immediately to exit harmonic pocket',
      'Replace chipped inserts and recheck collet runout with dial indicator'
    ],
    severityConsiderations: 'Rapidly destroys carbide tool life, damages spindle bearings, and breaches Ra 0.8μm tolerances.',
    industrialExamples: 'Titanium aerospace wing spar deep pocket milling generating Ra 3.8μm chatter marks (spec Ra 0.8μm max).',
    standardReference: 'ISO 4287 / ISO 13399'
  },
  {
    id: 'mach-02',
    name: 'Subsurface Work Hardening & White Layer',
    category: 'Machining',
    severity: 'Major',
    description: 'Microstructural alteration (hard, brittle nanocrystalline martensitic layer) caused by severe thermal and mechanical shear.',
    commonCauses: [
      'Worn cutting edge with flank wear VB > 0.3mm rubbing against machined surface',
      'Insufficient cutting fluid lubrication and thermal cooling',
      'Excessively low feed per tooth resulting in tool burnishing rather than shearing'
    ],
    detectionMethods: [
      'Microhardness testing (Vickers micro-indentation HV 0.1 traverse)',
      'X-ray Diffraction (XRD) residual stress measurement',
      'Metallographic cross-section polishing and Nital etching'
    ],
    preventionMethods: [
      'Strict tool wear monitoring via spindle motor torque / power sensors',
      'High-pressure coolant delivery (70 bar direct through tool to cutting edge)',
      'Maintain positive rake geometry and sharp hone radius (rε < 25μm)'
    ],
    correctiveActions: [
      'Perform chemical etching or electropolishing to remove 15-25μm affected layer',
      'Establish tool replacement threshold at 75% of tool life'
    ],
    severityConsiderations: 'Dramatically reduces high-cycle fatigue life of rotating shafts and aero-engine compressor discs.',
    industrialExamples: 'Inconel 718 turbine disc groove showing 20μm white layer with micro-cracks under 1000x SEM.',
    standardReference: 'ASTM E384 / GE S-400 / Rolls-Royce RPS 753'
  },

  // 4. Forging Defects
  {
    id: 'forge-01',
    name: 'Forging Lap (Cold Shut / Fold)',
    category: 'Forging',
    severity: 'Critical',
    description: 'Discontinuity created when metal folds over on itself without fusing, creating a planar crack-like seam.',
    commonCauses: [
      'Improper preform or blocker die design with excessive flash flow',
      'Too sharp die corner fillets causing metal to fold instead of flow smoothly',
      'Scale accumulation in die cavities acting as an unbonded barrier'
    ],
    detectionMethods: [
      'Magnetic Particle Inspection (MPI) with AC yoke for surface seams',
      'Eddy Current Testing (ET) automated probe scanning',
      'Acid macro-etching inspection of forged surfaces'
    ],
    preventionMethods: [
      'Computer-aided finite element forging simulation (DEFORM / QForm)',
      'Increase fillet radii on blocker and finishing dies',
      'High-pressure water descaling before billet placement into die'
    ],
    correctiveActions: [
      'Grind out lap if within machining allowance; verify complete removal with MPI',
      'Modify CNC machining sequence or scrap part if lap extends below finished part drawing limits'
    ],
    severityConsiderations: 'Functions as a ready-made crack; catastrophic fatigue failure under alternating torque or bending.',
    industrialExamples: 'Automotive crankshaft connecting rod journal failing at 45,000 km due to an undetected forging lap.',
    standardReference: 'ISO 10228 / EN 10228-1 / SAE J1221'
  },

  // 5. Sheet Metal Defects
  {
    id: 'sheet-01',
    name: 'Wrinkling & Flange Buckling',
    category: 'Sheet Metal',
    severity: 'Major',
    description: 'Compressive instability causing wave-like ripples in sheet metal flanges or unsupported wall sections during deep drawing.',
    commonCauses: [
      'Insufficient blank holder force (BHF)',
      'Excessive clearance between punch and die cavity',
      'Uneven friction or poor die spotting',
      'High compressive hoop stress in drawing flange exceeding critical buckling stress'
    ],
    detectionMethods: [
      '3D Optical Photogrammetry / Blue Light Fringe Projection',
      'Coordinate Measuring Machine (CMM) surface scan',
      'Tactile surface contour gauges on stamped body panels'
    ],
    preventionMethods: [
      'Increase blank holder force with multi-point servo or nitrogen cushion control',
      'Incorporate draw beads to control sheet metal flow and restrain edge drawing',
      'Apply Formability Limit Diagram (FLD) analysis during die engineering'
    ],
    correctiveActions: [
      'Shim or regrind die pressure pads to equalize blank holder pressure distribution',
      'Adjust draw bead penetration depth by 0.5mm increments'
    ],
    severityConsiderations: 'Prevents assembly flushness, ruins class-A automotive aesthetic finish, causes welding gaps in body-in-white (BIW).',
    industrialExamples: 'Automotive door outer panel exhibiting 0.8mm surface wave wrinkles along character line styling radius.',
    standardReference: 'ISO 12004 / ASTM E2218'
  },
  {
    id: 'sheet-02',
    name: 'Springback Deviation',
    category: 'Sheet Metal',
    severity: 'Major',
    description: 'Elastic recovery of sheet metal after punch unloading, causing dimensional angles and contours to deviate from nominal.',
    commonCauses: [
      'High yield strength of modern Advanced High-Strength Steels (AHSS / DP980)',
      'Variation in incoming sheet metal coil thickness and yield strength',
      'Large bending radius relative to sheet thickness (R/t ratio > 5)'
    ],
    detectionMethods: [
      'Continuous In-line Laser Profile Scanning on robotic checking fixtures',
      'Optical CMM scanning with color-coded deviation heatmaps',
      'Go/No-Go inspection checking fixtures with dial indicators'
    ],
    preventionMethods: [
      'Apply overbending compensation in die design (AutoForm springback simulation)',
      'Implement bottoming / coining at stroke bottom dead center to plastically deform inner fibers',
      'Incorporate stiffening ribs along bend lines to lock geometry'
    ],
    correctiveActions: [
      'CNC re-cut die surfaces based on reverse-engineered scanned point clouds',
      'Tighten coil supplier tensile yield variance tolerance in procurement specification'
    ],
    severityConsiderations: 'Causes robotic welding fixtures to jam and creates huge gaps in subsequent structural joining.',
    industrialExamples: 'B-pillar reinforcement in DP780 steel springing back 3.2° off nominal angle, preventing glass track fitment.',
    standardReference: 'VDA 238-100 / IATF 16949 Section 8.5'
  },

  // 6. Heat Treatment Defects
  {
    id: 'heat-01',
    name: 'Quench Cracking & Distortion',
    category: 'Heat Treatment',
    severity: 'Critical',
    description: 'Violent intergranular or transgranular fractures caused by severe transformation stresses and thermal shock during rapid quenching.',
    commonCauses: [
      'Quenching in water or brine when oil or polymer quench is required',
      'Drastic section thickness variations without stress-relief steps or transition tapers',
      'Delayed tempering after quenching (allowing untempered martensite to remain under peak stress)',
      'Overheating during austenitizing leading to coarse prior austenite grain size'
    ],
    detectionMethods: [
      'Wet Horizontal Magnetic Particle Inspection (ASTM E1444)',
      'Acoustic emission sensor detection during quenching bath immersion',
      'Stereomicroscopy fracture surface examination'
    ],
    preventionMethods: [
      'Use martempering (marquenching) or polymer quenchant with tailored cooling curve',
      'Ensure immediate tempering within 2 hours of quench bath exit',
      'Introduce blind hole plugs and radiused corners on sharp keyways prior to heat treatment'
    ],
    correctiveActions: [
      'Immediate scrap of cracked components; quench cracks cannot be salvaged',
      'Audit quenchant agitation velocity and check quenchant contamination levels (water in oil test)'
    ],
    severityConsiderations: 'Zero-tolerance safety defect; indicates complete structural compromise.',
    industrialExamples: 'AISI 4340 heavy gear pinion splitting completely along root tooth radius during oil quenching.',
    standardReference: 'AMS 2759 / ISO 15787'
  },

  // 7. Surface Treatment Defects
  {
    id: 'surf-01',
    name: 'Hydrogen Embrittlement from Electroplating',
    category: 'Surface Treatment',
    severity: 'Critical',
    description: 'Absorption of atomic hydrogen during acid pickling and electroplating, resulting in premature brittle fracture under sustained tensile stress.',
    commonCauses: [
      'High-strength steel (tensile strength > 1000 MPa / hardness > 31 HRC) exposed to cathodic hydrogen charging',
      'Failure to bake within specified time window (typically ≤ 4 hours post-plating)',
      'Insufficient baking duration or inadequate oven temperature control'
    ],
    detectionMethods: [
      'Sustained Load Tensile Testing per ASTM F519 (200 hours at 75% notch tensile strength)',
      'Incremental Step Loading (ISL) test per ASTM F1624',
      'Fractographic analysis showing intergranular cleavage and "rock candy" facets'
    ],
    preventionMethods: [
      'De-embrittlement baking at 190°C - 220°C for 8 to 24 hours immediately within 2 hours of plating',
      'Replace acid pickling with mechanical grit blasting or dry vapor degreasing',
      'Switch to non-electrolytic zinc flake coatings (e.g. Geomet / Dacromet)'
    ],
    correctiveActions: [
      'Quarantine and destroy all plated fasteners from non-baked or late-baked furnace loads',
      'Install automated timestamp interlocking between plating line unloader and baking ovens'
    ],
    severityConsiderations: 'Catastrophic silent failure without macroscopic plastic deformation days or weeks after assembly.',
    industrialExamples: 'Class 10.9 chassis suspension bolts snapping under vehicle preload 7 days after zinc electroplating.',
    standardReference: 'ASTM F519 / ISO 9588 / SAE J121M'
  },

  // 8. Additive Manufacturing Defects
  {
    id: 'am-01',
    name: 'Keyhole Porosity & Lack of Fusion (L-PBF)',
    category: 'Additive Manufacturing',
    severity: 'Critical',
    description: 'Deep vapor depression collapse (keyhole) or un-melted metal powder pockets between scan tracks in laser powder bed fusion.',
    commonCauses: [
      'Excessive laser power density causing metal boiling and keyhole vapor cavity collapse',
      'Insufficient laser energy density or hatch spacing too wide causing incomplete inter-track melting',
      'Inconsistent powder layer recoating due to worn recoater blade',
      'Condensate and spatter fallout into the melt pool'
    ],
    detectionMethods: [
      'High-resolution Industrial Micro-CT Scanning (voxel size < 10μm)',
      'In-situ melt pool photodiode monitoring and coaxial high-speed imaging',
      'Ultrasonic immersion C-scan testing'
    ],
    preventionMethods: [
      'Map parameter process window using dimensionless enthalpy and normalized energy density',
      'Optimize laser scan vector rotation (67° stripe rotation between layers)',
      'Maintain laminar shielding gas argon flow (velocity 2-3 m/s) across the powder bed',
      'Hot Isostatic Pressing (HIP) at 1120°C, 100 MPa for 4 hours to collapse residual gas pores'
    ],
    correctiveActions: [
      'Subject all safety-critical aerospace print builds to mandatory Hot Isostatic Pressing (HIP)',
      'Calibrate laser focus spot position and calibrate f-theta lens telecentricity'
    ],
    severityConsiderations: 'High stress concentration in critical flight hardware; drastically lowers fatigue limit.',
    industrialExamples: 'L-PBF printed Ti-6Al-4V aerospace bracket demonstrating 98.4% density instead of required ≥ 99.8%.',
    standardReference: 'ASTM F3001 / ISO/ASTM 52920 / AMS 7003'
  },

  // 9. Assembly Defects
  {
    id: 'asm-01',
    name: 'Thread Cross-Threading & Fastener Torque Relaxation',
    category: 'Assembly',
    severity: 'Major',
    description: 'Misaligned mating of male and female threads leading to sheared thread crests and loss of clamping preload.',
    commonCauses: [
      'Operator angle misalignment during initial thread engagement with high-speed pneumatic driver',
      'Improper lead thread chamfer on bolt or tapped hole',
      'Burrs or debris in female tapped hole',
      'Paint or e-coat contamination on internal thread pitch'
    ],
    detectionMethods: [
      'Smart DC electric angle-torque curve monitoring (angle monitoring window)',
      'Ultrasonic bolt elongation measurement',
      'Manual break-away torque audit with calibrated digital torque wrench'
    ],
    preventionMethods: [
      'Deploy smart transducerized DC electric nutrunners with torque-angle signature shutdown',
      'Use self-aligning thread fasteners (e.g. MAThread / MATpoint patented geometries)',
      'Apply Poka-Yoke mechanical guide sleeves to ensure perpendicular tool approach'
    ],
    correctiveActions: [
      'Extract damaged fastener; inspect internal thread with thread go/no-go plug gauge',
      'Install thread repair insert (e.g. Helicoil / Keensert) per engineering deviation approval'
    ],
    severityConsiderations: 'Loss of joint clamp load leads to joint separation, vibration-induced back-off, and shear failure.',
    industrialExamples: 'Electric vehicle battery pack enclosure bolt cross-threaded at torque 18 Nm with zero clamp load, violating IP67 seal.',
    standardReference: 'VDI 2230 / ISO 16047'
  },

  // 10. Automotive Specific
  {
    id: 'auto-01',
    name: 'Resistance Spot Weld Expulsion & Undersized Nugget',
    category: 'Automotive',
    severity: 'Critical',
    description: 'Ejection of molten metal from the weld interface resulting in voids, severe electrode indentation, and sub-standard weld nugget diameter.',
    commonCauses: [
      'Excessive weld current or weld time for given sheet thickness stack-up',
      'Insufficient electrode clamping squeeze force',
      'Electrode cap mushrooming (tip diameter wear > 20%)',
      'Poor panel fit-up and gaps forcing weld gun to overcome mechanical stiffness'
    ],
    detectionMethods: [
      'Chisel and tear testing (destructive peel test) per AWS D8.9',
      'Multi-channel Ultrasonic spot weld testing (pulse-echo A-scan and C-scan)',
      'Dynamic resistance feedback curve monitoring in modern inverter weld controllers'
    ],
    preventionMethods: [
      'Program adaptive resistance weld controllers (e.g. Bosch Rexroth PSI / Harms+Wende)',
      'Automated electrode tip dresser every 150-250 spot welds with tip change counter',
      'Enforce minimum nugget diameter formula: d = 4 × √t (where t is governing sheet thickness)'
    ],
    correctiveActions: [
      'Add adjacent remedial spot weld within 15mm or repair with structural adhesive / MIG plug weld',
      'Execute immediate electrode tip dressing and reset stepper current'
    ],
    severityConsiderations: 'Critical crashworthiness defect; directly degrades vehicle cabin structural integrity during impact tests.',
    industrialExamples: 'Vehicle body-in-white rocker panel weld failing peel test with nugget size 3.1mm vs requirement 5.2mm.',
    standardReference: 'AWS D8.9 / IATF 16949 / ISO 14373'
  },

  // 11. Aerospace Specific
  {
    id: 'aero-01',
    name: 'Carbon Fiber Composite Delamination & Barely Visible Impact Damage (BVID)',
    category: 'Aerospace',
    severity: 'Critical',
    description: 'Separation of adjacent laminate plies without visible outer skin denting, caused by low-velocity tool drops or lightning strike.',
    commonCauses: [
      'Tool drop during assembly or maintenance inspection',
      'Moisture ingress combined with freeze-thaw thermal cycling',
      'Improper autoclave debulking pressure or vacuum bag bridge during cure'
    ],
    detectionMethods: [
      'Ultrasonic Phased Array / Automated Roller Probe scanning (C-scan)',
      'Tap Testing (Digital Woodpecker / mechanical tap tester)',
      'Flash Thermography (infrared thermographic pulse inspection)'
    ],
    preventionMethods: [
      'Use toughened epoxy resin matrices with thermoplastic interlayers',
      'Enforce strict protective neoprene padding covers over composite aircraft skins during assembly',
      'Incorporate z-pinning or 3D orthogonal woven preforms in high-stress zones'
    ],
    correctiveActions: [
      'Apply resin injection vacuum repair or bonded composite scarf patch per Structural Repair Manual (SRM)',
      'NDI non-destructive re-inspection to verify zero void content in repaired zone'
    ],
    severityConsiderations: 'Causes catastrophic compressive buckling failure of composite wing skins and empennage structures.',
    industrialExamples: 'Commercial airliner composite horizontal stabilizer displaying 65mm internal delamination after baggage belt impact.',
    standardReference: 'FAA AC 20-107B / ASTM D7136 / AS9100D'
  },

  // 12. Electronics Specific
  {
    id: 'elec-01',
    name: 'BGA Solder Bridging & Head-in-Pillow (HiP)',
    category: 'Electronics',
    severity: 'Critical',
    description: 'Short circuit between adjacent solder balls or incomplete coalescence where ball and paste touch but fail to form an intermetallic bond.',
    commonCauses: [
      'PCB warpage during reflow oven heating (dynamic CTE mismatch between package and substrate)',
      'Inadequate or oxidized solder paste volume from laser-cut stencil aperture clogs',
      'Inappropriate reflow thermal profile (soak temperature too high causing flux exhaustion)',
      'Excessive paste deposit or squeegee pressure variation'
    ],
    detectionMethods: [
      '3D Automated Optical Inspection (3D AOI)',
      '3D Automated X-ray Inspection (AXI / Oblique slice laminography)',
      'Boundary Scan / In-Circuit Testing (ICT) functional testing'
    ],
    preventionMethods: [
      'Optimize reflow profiling using multi-channel thermocouple KIC datalogger',
      'Specify high-activity, low-voiding solder paste alloys with antioxidant flux chemistries',
      'Reduce stencil aperture size by 10-15% (home-plate or rounded aperture geometry) on corner pads',
      'Control board bake-out cycle to eliminate moisture-induced board dynamic warpage'
    ],
    correctiveActions: [
      'Selective desoldering and rework using precision infrared BGA rework station',
      'Clean stencil underside with automated solvent vacuum wiper every 3 print strokes'
    ],
    severityConsiderations: 'Intermittent functional field failures that pass initial testing but fail after thermal cycling in automotive radar or ECU.',
    industrialExamples: 'Automotive ADAS camera control module failing high-temperature vibration screening due to BGA corner joint HiP.',
    standardReference: 'IPC-A-610 Class 3 / IPC-7095 / J-STD-001'
  }
];
