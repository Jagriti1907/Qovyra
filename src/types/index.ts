export type PageId =
  | 'home'
  | 'mentor'
  | 'factory'
  | 'defects'
  | 'toolkit'
  | 'digital-twin'
  | 'learning'
  | 'challenges'
  | 'industries'
  | 'dashboard'
  | 'about'
  | 'contact';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert / Research Level';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  difficulty?: DifficultyLevel;
  isError?: boolean;
}

export type MachineStatus = 'Operational' | 'Warning' | 'Inspection' | 'Calibrating' | 'Maintenance';

export interface MachineData {
  id: string;
  name: string;
  code: string;
  zone: string;
  status: MachineStatus;
  function: string;
  productionCount: number;
  defectCount: number;
  efficiency: number;
  cycleTimeSec: number;
  temperatureC: number;
  vibrationMmS: number;
  lastCalibrated: string;
  inspectionSpec: string;
  qualityAlert?: string;
  position: [number, number, number];
  color: string;
}

export interface DefectItem {
  id: string;
  name: string;
  category: 'Casting' | 'Welding' | 'Machining' | 'Forging' | 'Sheet Metal' | 'Heat Treatment' | 'Surface Treatment' | 'Additive Manufacturing' | 'Assembly' | 'Automotive' | 'Aerospace' | 'Electronics';
  severity: 'Critical' | 'Major' | 'Minor';
  description: string;
  commonCauses: string[];
  detectionMethods: string[];
  preventionMethods: string[];
  correctiveActions: string[];
  severityConsiderations: string;
  industrialExamples: string;
  standardReference: string;
  detectionIconType?: string;
}

export interface FMEARow {
  id: string;
  processStep: string;
  failureMode: string;
  effect: string;
  severity: number; // 1-10
  cause: string;
  occurrence: number; // 1-10
  currentControls: string;
  detection: number; // 1-10
  rpn: number; // S x O x D
  actionPriority: 'High' | 'Medium' | 'Low';
  recommendedAction: string;
  responsible: string;
}

export interface FishboneData {
  problem: string;
  man: string[];
  machine: string[];
  material: string[];
  method: string[];
  measurement: string[];
  milieu: string[]; // Mother Nature / Environment
}

export interface CAPAItem {
  id: string;
  title: string;
  nonconformity: string;
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  owner: string;
  dueDate: string;
  status: 'Open' | 'In Progress' | 'Verified' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
}

export interface IndustrySector {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  challenges: string[];
  inspectionStages: string[];
  commonDefects: string[];
  qualityTools: string[];
  standards: string[];
  digitalTransformation: string;
  caseStudy: {
    title: string;
    organization: string;
    challenge: string;
    solution: string;
    results: string;
  };
}

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  formula?: string;
  examRelevance?: string;
}

export interface ChallengeItem {
  id: string;
  title: string;
  track: 'Daily Flash MCQ' | 'Industrial Case-Study' | 'Numerical SPC' | 'Root Cause Diagnosis';
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Master';
  points: number;
  scenario: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswerText?: string;
  detailedSolution: string;
  keyTakeaway: string;
}

export interface FormulaCard {
  id: string;
  category: string;
  name: string;
  formula: string;
  variables: { symbol: string; meaning: string }[];
  application: string;
  notes: string;
}
