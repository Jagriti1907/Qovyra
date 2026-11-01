import { ChallengeItem } from '../types';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  role: string;
  points: number;
  streakDays: number;
  badge: string;
  avatarSeed: string;
}

export const DAILY_CHALLENGES: ChallengeItem[] = [
  {
    id: 'ch-01',
    title: 'GATE SPC Master: Calculate 3-Sigma Upper Control Limit',
    track: 'Numerical SPC',
    difficulty: 'Challenging',
    points: 150,
    scenario: 'An aerospace manufacturing line produces hydraulic valve spools. Over 25 subgroups of size n = 4, the grand average diameter X-double-bar is 25.400 mm and average range R-bar is 0.048 mm. Given standard Shewhart factors for n=4: A2 = 0.729, d2 = 2.059, D3 = 0, D4 = 2.282.',
    question: 'Calculate the Upper Control Limit (UCL) for the X-bar chart.',
    options: ['25.435 mm', '25.448 mm', '25.424 mm', '25.510 mm'],
    correctIndex: 0,
    detailedSolution: 'For an X-bar control chart:\nUCL = X-double-bar + (A2 * R-bar)\nUCL = 25.400 + (0.729 * 0.048)\nUCL = 25.400 + 0.03499 = 25.43499 ≈ 25.435 mm.\n\nNote: The standard error of subgroup means is sigma / sqrt(n) = (R-bar / d2) / sqrt(4) = (0.048 / 2.059) / 2 = 0.01165 mm. 3 * 0.01165 = 0.035 mm, which equals A2 * R-bar.',
    keyTakeaway: 'The factor A2 conveniently scales the average range R-bar directly into 3 times the standard error of subgroup averages.'
  },
  {
    id: 'ch-02',
    title: 'Automotive Stamping Tear: 5-Why Root Cause Diagnosis',
    track: 'Industrial Case-Study',
    difficulty: 'Moderate',
    points: 120,
    scenario: 'During the afternoon shift in a stamping plant, 14 consecutive automotive door inner panels exhibited severe edge tearing at the deep draw corner. The press operator replaced the stamping oil and slowed the press, but tearing persisted.',
    question: 'As the Senior Quality Engineer, what is the most scientifically sound immediate containment and diagnostic step?',
    options: [
      'Increase the blank holder nitrogen cylinder pressure to maximum',
      'Check incoming coil material test certificate for Yield Strength (YS) & n-value (strain hardening exponent), and inspect blank holder radius for galling',
      'Grind the draw punch corner radius immediately without measuring sheet thickness',
      'Double the press speed to minimize friction duration'
    ],
    correctIndex: 1,
    detailedSolution: 'Edge tearing in deep drawing occurs when sheet tensile stress exceeds ultimate tensile strength. The common root causes are: 1) incoming coil mechanical property variation (excessive yield strength or sub-standard work-hardening n-value / r-bar plastic strain ratio), or 2) die galling/scratches on blank holder pads increasing frictional restraint. Checking material mill certs and blank holder surface condition isolates whether the issue is raw material non-conformance or tooling degradation.',
    keyTakeaway: 'Never modify die geometry (grinding punch radii) before ruling out incoming material property shifts (Formability Limit Diagram verification).'
  },
  {
    id: 'ch-03',
    title: 'Six Sigma DPMO & Rolled Throughput Yield (RTY)',
    track: 'Daily Flash MCQ',
    difficulty: 'Moderate',
    points: 100,
    scenario: 'A three-stage precision electronic manufacturing process has the following first-pass yields at each station:\nStation 1 (SMT Placement): 98.0%\nStation 2 (Through-Hole Wave Solder): 95.0%\nStation 3 (Final Functional Testing): 99.0%',
    question: 'What is the overall Rolled Throughput Yield (RTY) of this manufacturing line?',
    options: ['97.3%', '92.2%', '95.0%', '88.5%'],
    correctIndex: 1,
    detailedSolution: 'Rolled Throughput Yield (RTY) is the probability that a unit will pass through all consecutive stages without defect or rework.\nRTY = Y1 * Y2 * Y3\nRTY = 0.980 * 0.950 * 0.990 = 0.92169 ≈ 92.2%.\n\nNotice that even though every single station appears to have high individual yields (>95%), cumulative line yield experiences 7.8% scrap/rework waste!',
    keyTakeaway: 'RTY reveals hidden factory waste and cumulative yield loss that station-by-station averages obscure.'
  },
  {
    id: 'ch-04',
    title: 'Aero Turbine Disk Inconel 718 White Layer Investigation',
    track: 'Root Cause Diagnosis',
    difficulty: 'Master',
    points: 200,
    scenario: 'A CNC machining subcontractor is turning an Inconel 718 turbine disc. Metallographic inspection at FAI reveals a 15 μm untempered martensitic "white layer" with residual surface tensile stresses of +420 MPa, violating the customer aerospace engine specification (max white layer allowed = 0 μm, residual stress must be compressive).',
    question: 'Which sequence of corrective actions addresses both the thermal and mechanical root causes of white layer formation?',
    options: [
      'Increase spindle RPM by 40% and use dry cutting to burn off oxidation',
      'Reduce cutting speed, switch to high-pressure through-spindle coolant (70 bar) directed at the tool-chip interface, limit flank wear VB ≤ 0.15mm, and apply post-machining shot peening',
      'Use a duller carbide insert to burnish the surface smooth',
      'Anneal the entire finished turbine disc at 1050°C without fixture clamping'
    ],
    correctIndex: 1,
    detailedSolution: 'The "white layer" is formed by intense localized frictional heating exceeding transformation temperature followed by rapid self-quenching into the cold metal bulk, exacerbated by worn tool rubbing (flank wear VB). Lowering cutting speed reduces heat generation; 70 bar high-pressure coolant penetrates the vapor barrier at the shear zone; strict tool life management eliminates rubbing; and controlled shot peening restores beneficial compressive residual stresses.',
    keyTakeaway: 'High-temperature nickel superalloys have very low thermal conductivity (~11 W/m·K), concentrating thermal energy at the cutting edge and demanding ultra-sharp tools and aggressive high-pressure cooling.'
  }
];

export const DEMO_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Dr. Arjun Verma', role: 'Aerospace Metrology Lead', points: 3420, streakDays: 28, badge: 'Quality Titan', avatarSeed: 'arjun' },
  { rank: 2, name: 'Elena Rostova', role: 'Tier-1 Automotive QE', points: 3180, streakDays: 24, badge: 'Six Sigma Master', avatarSeed: 'elena' },
  { rank: 3, name: 'Kenji Takahashi', role: 'Semiconductor Yield Engineer', points: 2950, streakDays: 19, badge: 'SPC Specialist', avatarSeed: 'kenji' },
  { rank: 4, name: 'Marcus Vance', role: 'Defense Quality Director', points: 2710, streakDays: 15, badge: 'Auditor Pro', avatarSeed: 'marcus' },
  { rank: 5, name: 'Jagriti Singh', role: 'Industrial Quality Architect', points: 2640, streakDays: 14, badge: 'Digital Twin Lead', avatarSeed: 'jagriti' },
  { rank: 6, name: 'Sophie Dubois', role: 'Medical Device QA Manager', points: 2420, streakDays: 12, badge: 'Risk Architect', avatarSeed: 'sophie' },
  { rank: 7, name: 'Carlos Mendez', role: 'Manufacturing Student (GATE)', points: 2180, streakDays: 9, badge: 'Rising Star', avatarSeed: 'carlos' }
];
