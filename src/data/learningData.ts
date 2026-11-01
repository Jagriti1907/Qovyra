import { QuizQuestion, FormulaCard } from '../types';

export interface LearningModule {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMin: number;
  summary: string;
  keyTopics: string[];
  contentSections: {
    heading: string;
    body: string;
    formula?: string;
    takeaway?: string;
  }[];
  examRelevance: string;
}

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-01',
    title: 'Foundations of Quality Engineering & Cost of Quality (CoQ)',
    category: 'Quality Fundamentals',
    level: 'Beginner',
    durationMin: 25,
    summary: 'Master the evolutionary continuum of quality, the classic PAF (Prevention, Appraisal, Failure) model, and modern Total Quality Management (TQM).',
    keyTopics: ['Quality Definition', 'Cost of Quality (CoQ)', 'PAF Model', 'Quality Dimensions (Garvin)', 'Quality Culture'],
    examRelevance: 'Heavily tested in GATE Industrial Engineering, ESE Mechanical, and ASQ Certified Quality Engineer (CQE) Part I.',
    contentSections: [
      {
        heading: '1. What is Quality?',
        body: 'Quality is fundamentally defined by Joseph Juran as "Fitness for use" and by Philip Crosby as "Conformance to requirements". In modern ISO 9000, quality is the "degree to which a set of inherent characteristics fulfills requirements". David Garvin expanded this into eight critical dimensions: Performance, Features, Reliability, Conformance, Durability, Serviceability, Aesthetics, and Perceived Quality.',
        takeaway: 'Quality is not merely absence of defects; it is the deliberate alignment of product capability with customer expectations.'
      },
      {
        heading: '2. The Economics of Quality: The PAF Model',
        body: 'The Cost of Quality (CoQ) is divided into Cost of Conformance (Prevention + Appraisal) and Cost of Non-Conformance (Internal Failure + External Failure).\n\n- Prevention Costs: Actions taken to prevent defects before they occur (design reviews, FMEA, supplier quality development, training, preventative maintenance).\n- Appraisal Costs: Costs of evaluating products to ensure conformance (inspection, calibration, CMM verification, testing equipment, audits).\n- Internal Failure Costs: Costs incurred prior to shipping (scrap, rework, re-inspection, downtime, engineering disposition).\n- External Failure Costs: Costs incurred after shipment to the customer (warranty claims, recalls, customer returns, legal liabilities, reputational brand damage).',
        formula: 'Total CoQ = Prevention + Appraisal + Internal Failure + External Failure',
        takeaway: 'Investing $1 in Prevention typically avoids $10 in Appraisal and $100 in External Failure (The 1-10-100 Rule).'
      }
    ]
  },
  {
    id: 'mod-02',
    title: 'Quality Gurus: Deming, Juran, Crosby, Taguchi & Ishikawa',
    category: 'Gurus & Philosophies',
    level: 'Intermediate',
    durationMin: 35,
    summary: 'Comprehensive analysis of the seminal philosophers whose principles built modern industrial manufacturing and Six Sigma systems.',
    keyTopics: ['Deming 14 Points & PDCA', 'Juran Quality Trilogy', 'Crosby Zero Defects', 'Taguchi Loss Function', 'Ishikawa 7 QC Tools'],
    examRelevance: 'Essential for technical interview rounds, ASQ CQE Exam, and competitive government engineering services.',
    contentSections: [
      {
        heading: '1. W. Edwards Deming & Systemic Variation',
        body: 'Deming demonstrated that 85% (later revised to 94%) of quality failures stem from system and management deficiencies (Common Causes), not individual worker negligence (Special Causes). He formulated the Plan-Do-Check-Act (PDCA) cycle and his famous 14 Points for Management, strongly arguing against quotas and inspection-based quality.',
        takeaway: 'Drive out fear and eliminate dependence on mass inspection; build quality into the process from the start.'
      },
      {
        heading: '2. Genichi Taguchi & The Quadratic Loss Function',
        body: 'Traditional manufacturing treats any dimension within tolerance [LSL, USL] as zero loss. Genichi Taguchi proved that any deviation from the nominal target m causes customer dissatisfaction and societal loss, modeled as a parabola: L(y) = k(y - m)^2. Taguchi also pioneered Robust Parameter Design using orthogonal arrays and Signal-to-Noise (S/N) ratios.',
        formula: 'L(y) = k * (y - m)^2, where k = Cost / (Tolerance)^2',
        takeaway: 'Hitting the target with minimum variance is far superior to merely "meeting specification boundaries".'
      },
      {
        heading: '3. Joseph Juran & The Quality Trilogy',
        body: 'Juran organized quality management into three interconnected pillars: Quality Planning (designing processes capable of meeting goals), Quality Control (maintaining operating performance and preventing sporadic spikes), and Quality Improvement (attacking chronic waste through breakthrough projects).',
        takeaway: 'Chronic waste must be dismantled through systematic breakthrough projects, not daily fire-fighting.'
      }
    ]
  },
  {
    id: 'mod-03',
    title: 'Statistical Process Control (SPC) & Control Charts',
    category: 'Statistical Quality Control',
    level: 'Advanced',
    durationMin: 45,
    summary: 'Rigorous mathematical formulation of Shewhart variable and attribute control charts, control limit derivations, and run rules.',
    keyTopics: ['Shewhart Control Charts', 'X-bar and R Chart', 'Attribute Charts (p, np, c, u)', '3-Sigma Control Limits', 'Western Electric Rules'],
    examRelevance: 'Core topic of GATE Mechanical / Production, ESE, and Six Sigma Green/Black Belt exams.',
    contentSections: [
      {
        heading: '1. Theoretical Foundation of Control Charts',
        body: 'A process is in statistical control when it is governed solely by stable common causes of variation. Shewhart control limits are set at μ ± 3σ. For sample subgroups of size n, the standard error of the mean is σ / √n, making X-bar charts far more sensitive to process shifts than tracking individual units.',
        formula: 'UCL_{X-bar} = X-double-bar + A_2 * R-bar,   LCL_{X-bar} = X-double-bar - A_2 * R-bar',
        takeaway: 'Control limits are calculated entirely from natural process variation; they have NO mathematical relationship to customer specification limits (USL/LSL).'
      },
      {
        heading: '2. Variable vs Attribute Charts',
        body: '- Variables Data (Continuous): X-bar and R chart (subgroups n ≤ 10), X-bar and S chart (subgroups n > 10), I-MR chart (individual measurements n = 1).\n- Attributes Data (Count/Proportion): p-chart (fraction nonconforming, variable subgroup size), np-chart (number nonconforming, constant subgroup size), c-chart (number of nonconformities/defects, constant inspection unit), u-chart (defects per unit, variable inspection unit).',
        formula: 'p-chart: UCL = p-bar + 3 * sqrt(p-bar * (1 - p-bar) / n)',
        takeaway: 'Choose variable charts whenever continuous measurement is possible; they require vastly smaller sample sizes to detect process shifts.'
      }
    ]
  },
  {
    id: 'mod-04',
    title: 'Process Capability Analysis: Cp, Cpk, Pp, Ppk',
    category: 'Statistical Quality Control',
    level: 'Advanced',
    durationMin: 40,
    summary: 'Master short-term capability versus long-term performance, centering offsets, non-normal capability, and PPM estimation.',
    keyTopics: ['Cp vs Cpk', 'Pp vs Ppk', 'Within-subgroup vs Overall Variation', 'Sigma Shift', 'PPM Defect Rates'],
    examRelevance: 'Guaranteed numerical question in GATE Production, ASQ CQE, and Tier-1 Automotive supplier assessments.',
    contentSections: [
      {
        heading: '1. Process Capability vs Process Performance',
        body: 'Process Capability (Cp, Cpk) evaluates potential performance using short-term, within-subgroup variation (R-bar / d2 or S-bar / c4). It measures what the process is capable of doing when stable.\n\nProcess Performance (Pp, Ppk) evaluates actual historical output using total sample standard deviation s (overall variation), including long-term drift, operator changes, and tool wear.',
        formula: 'Cp = (USL - LSL) / (6 * sigma_{within}),   Cpk = min((USL - mu) / (3 * sigma_{within}), (mu - LSL) / (3 * sigma_{within}))',
        takeaway: 'If Cp is high (e.g. 2.0) but Cpk is low (e.g. 0.8), the process possesses tight variation but is off-center relative to target.'
      },
      {
        heading: '2. World-Class Capability Benchmarks',
        body: '- Cpk < 1.00: Incapable process; producing out-of-specification scrap requiring 100% sorting.\n- Cpk = 1.33: Traditional 4-sigma industrial standard (63 PPM failure rate for centered normal distribution).\n- Cpk = 1.67: Critical safety/automotive requirement (0.57 PPM failure rate).\n- Cpk ≥ 2.00: Six Sigma capability (3.4 DPMO with standard 1.5-sigma long-term mean shift).',
        formula: 'Ppk = min((USL - mu) / (3 * s_{overall}), (mu - LSL) / (3 * s_{overall}))',
        takeaway: 'IATF 16949 PPAP requires Cpk ≥ 1.67 for initial process studies and Ppk ≥ 1.33 for ongoing production.'
      }
    ]
  },
  {
    id: 'mod-05',
    title: 'Failure Mode and Effects Analysis (FMEA & FMECA)',
    category: 'Quality Engineering Methods',
    level: 'Intermediate',
    durationMin: 35,
    summary: 'The systematic, proactive risk assessment methodology based on the latest AIAG & VDA Harmonized FMEA standard.',
    keyTopics: ['Design FMEA (DFMEA)', 'Process FMEA (PFMEA)', 'Severity, Occurrence, Detection', 'Action Priority (AP) Matrix', 'FMECA Criticality'],
    examRelevance: 'Standard requirement for automotive, aerospace, and medical engineering quality professionals.',
    contentSections: [
      {
        heading: '1. The 7-Step AIAG & VDA FMEA Framework',
        body: 'The modernized AIAG-VDA standard replaces unstructured brainstorming with a 7-step process:\n1. Planning & Preparation (Scope, 5T criteria)\n2. Structure Analysis (Tree diagram, boundary diagram)\n3. Function Analysis (Function trees, parameter diagrams)\n4. Failure Analysis (Failure Chain: Mode -> Effect -> Cause)\n5. Risk Analysis (Assigning Severity S, Occurrence O, Detection D on 1-10 scales)\n6. Optimization (Assigning corrective actions to reduce risk)\n7. Results Documentation (Management reporting)',
        takeaway: 'Never conduct an FMEA post-facto as paperwork compliance; FMEA must drive tooling and design before freeze.'
      },
      {
        heading: '2. The Shift from RPN to Action Priority (AP)',
        body: 'Historically, Risk Priority Number (RPN = S × O × D) was used. However, RPN has serious statistical flaws (e.g., S=10, O=2, D=2 yields RPN=40, whereas S=2, O=5, D=4 yields RPN=40, even though the former could be fatal while the latter is a nuisance).\nThe AIAG-VDA standard replaced RPN with the Action Priority (AP) matrix, categorizing risk into High (H), Medium (M), and Low (L) based on hierarchical evaluation prioritizing Severity first.',
        formula: 'RPN = Severity * Occurrence * Detection (1 to 1000 scale)',
        takeaway: 'High Severity failures (S = 9 or 10 relating to safety or regulatory non-compliance) demand engineering mitigation regardless of low Occurrence or Detection numbers.'
      }
    ]
  },
  {
    id: 'mod-06',
    title: 'Six Sigma & The DMAIC Problem-Solving Framework',
    category: 'Six Sigma & DMAIC',
    level: 'Intermediate',
    durationMin: 40,
    summary: 'Data-driven breakthrough methodology to eliminate variation and achieve near-zero defect manufacturing (3.4 DPMO).',
    keyTopics: ['Define, Measure, Analyze, Improve, Control', 'DPMO Calculation', '1.5-Sigma Shift', 'Rolled Throughput Yield (RTY)', 'Project Charter'],
    examRelevance: 'Foundational for Six Sigma Green Belt, Black Belt, Master Black Belt certifications.',
    contentSections: [
      {
        heading: '1. What is Six Sigma?',
        body: 'Six Sigma represents a quality philosophy, a metric of 3.4 Defects Per Million Opportunities (DPMO), and a structured DMAIC methodology. Under a pure normal distribution, ±6σ encompasses 99.9999998% of output (2 parts per billion defects). Motorola introduced the 1.5-sigma shift assumption to account for real-world long-term process drift, resulting in the famous 3.4 DPMO benchmark.',
        formula: 'DPMO = (Total Defects / (Total Units * Opportunities per Unit)) * 1,000,000',
        takeaway: 'Six Sigma focuses relentlessly on reducing process standard deviation (variation), not merely moving the process mean.'
      },
      {
        heading: '2. The DMAIC Phases',
        body: '- Define: Project charter, Voice of Customer (VOC) translated into Critical-to-Quality (CTQ) parameters, SIPOC map.\n- Measure: Data collection plan, Gage R&R study, baseline process capability (Z-bench, Cpk).\n- Analyze: Root cause verification, Multi-Vari analysis, hypothesis testing (t-test, ANOVA, Chi-Square), regression.\n- Improve: Design of Experiments (DOE), solution selection, pilot implementation, risk mitigation.\n- Control: Control plans, SPC monitoring, Poka-Yoke error proofing, standard work transition.',
        formula: 'RTY = Product_{i=1}^k (Yield_i)',
        takeaway: 'A high First-Pass Yield at each individual step is required to achieve acceptable Rolled Throughput Yield in multi-stage assembly.'
      }
    ]
  }
];

export const FORMULA_CARDS: FormulaCard[] = [
  {
    id: 'f-01',
    category: 'Statistical Quality Control',
    name: 'Process Capability Index (Cp)',
    formula: 'Cp = (USL - LSL) / (6 * sigma_within)',
    variables: [
      { symbol: 'USL', meaning: 'Upper Specification Limit (customer requirement)' },
      { symbol: 'LSL', meaning: 'Lower Specification Limit (customer requirement)' },
      { symbol: 'sigma_within', meaning: 'Short-term standard deviation (R-bar / d2)' }
    ],
    application: 'Measures potential process capability when process is perfectly centered between specification limits.',
    notes: 'Requires a stable process in statistical control and normal distribution.'
  },
  {
    id: 'f-02',
    category: 'Statistical Quality Control',
    name: 'Process Capability Index with Shift (Cpk)',
    formula: 'Cpk = min( (USL - mu) / (3 * sigma_within), (mu - LSL) / (3 * sigma_within) )',
    variables: [
      { symbol: 'mu', meaning: 'Process mean (average of sample measurements)' },
      { symbol: 'USL / LSL', meaning: 'Specification boundaries' },
      { symbol: 'sigma_within', meaning: 'Within-subgroup standard deviation' }
    ],
    application: 'Accounts for process centering offset. Cpk = Cp * (1 - k) where k is the centering factor.',
    notes: 'If Cpk < 1.33, process produces unacceptable defect levels in high-volume production.'
  },
  {
    id: 'f-03',
    category: 'Statistical Process Control',
    name: 'X-bar Chart Control Limits',
    formula: 'UCL = X-double-bar + A2 * R-bar,   LCL = X-double-bar - A2 * R-bar',
    variables: [
      { symbol: 'X-double-bar', meaning: 'Grand mean of all subgroup averages' },
      { symbol: 'R-bar', meaning: 'Average of subgroup ranges' },
      { symbol: 'A2', meaning: 'Shewhart factor based on subgroup size n (e.g., A2 = 0.577 for n=5)' }
    ],
    application: 'Tracks process location (central tendency) over time to detect special cause variation.',
    notes: 'Limits are placed at ±3 standard errors of the mean (3 * sigma / sqrt(n)).'
  },
  {
    id: 'f-04',
    category: 'Statistical Process Control',
    name: 'Range (R) Chart Control Limits',
    formula: 'UCL = D4 * R-bar,   LCL = D3 * R-bar',
    variables: [
      { symbol: 'R-bar', meaning: 'Average subgroup range' },
      { symbol: 'D4, D3', meaning: 'Shewhart factors based on sample size n (for n ≤ 6, D3 = 0)' }
    ],
    application: 'Monitors process dispersion (variability) across subgroups.',
    notes: 'R chart must be in statistical control before interpreting the X-bar chart.'
  },
  {
    id: 'f-05',
    category: 'Six Sigma',
    name: 'Defects Per Million Opportunities (DPMO)',
    formula: 'DPMO = (Total Defects / (Units Produced * Opportunities Per Unit)) * 10^6',
    variables: [
      { symbol: 'Total Defects', meaning: 'Sum of all nonconformities observed' },
      { symbol: 'Units Produced', meaning: 'Total sample volume inspected' },
      { symbol: 'Opportunities Per Unit', meaning: 'Number of discrete ways a single unit can fail' }
    ],
    application: 'Universal metric for comparing quality across completely dissimilar processes or industries.',
    notes: '3.4 DPMO corresponds to Six Sigma quality with a 1.5-sigma shift.'
  },
  {
    id: 'f-06',
    category: 'Manufacturing Intelligence',
    name: 'Overall Equipment Effectiveness (OEE)',
    formula: 'OEE = Availability * Performance * Quality',
    variables: [
      { symbol: 'Availability', meaning: 'Operating Time / Planned Production Time' },
      { symbol: 'Performance', meaning: '(Ideal Cycle Time * Total Parts Produced) / Operating Time' },
      { symbol: 'Quality', meaning: 'Good Parts Produced / Total Parts Produced' }
    ],
    application: 'Key TPM metric quantifying manufacturing productivity losses (Six Big Losses).',
    notes: 'World-Class OEE benchmark is typically considered ≥ 85% (Availability 90%, Performance 95%, Quality 99.9%).'
  },
  {
    id: 'f-07',
    category: 'Reliability Engineering',
    name: 'Weibull Reliability Function',
    formula: 'R(t) = exp( - (t / eta)^beta )',
    variables: [
      { symbol: 't', meaning: 'Operating time or stress cycles' },
      { symbol: 'eta', meaning: 'Scale parameter (Characteristic Life, at which 63.2% of units fail)' },
      { symbol: 'beta', meaning: 'Shape parameter (Weibull slope: beta < 1 infant mortality, beta = 1 random, beta > 1 wearout)' }
    ],
    application: 'Predicts component failure probability and warranty hazard rates over service life.',
    notes: 'The Swiss Army knife of reliability engineering for mechanical, aerospace, and electrical failure modes.'
  },
  {
    id: 'f-08',
    category: 'Economics of Quality',
    name: 'Taguchi Quality Loss Function',
    formula: 'L(y) = k * (y - m)^2',
    variables: [
      { symbol: 'y', meaning: 'Actual measured product dimension' },
      { symbol: 'm', meaning: 'Nominal design target dimension' },
      { symbol: 'k', meaning: 'Quality loss coefficient (Cost of scrap or customer dissatisfaction / Tolerance^2)' }
    ],
    application: 'Quantifies societal financial loss when product characteristic drifts away from design nominal target.',
    notes: 'Demonstrates why traditional "goalpost" conformance within tolerance is economically flawed.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-01',
    category: 'Statistical Quality Control',
    difficulty: 'Intermediate',
    question: 'A machining process has a nominal target of 50.00 mm with USL = 50.15 mm and LSL = 49.85 mm. The process mean is calculated as 50.05 mm and within-subgroup standard deviation is 0.03 mm. What is the process capability Cpk?',
    options: ['1.67', '1.11', '1.42', '0.85'],
    correctIndex: 1,
    explanation: 'Upper capability: (USL - mu) / (3 * sigma) = (50.15 - 50.05) / (3 * 0.03) = 0.10 / 0.09 = 1.111.\nLower capability: (mu - LSL) / (3 * sigma) = (50.05 - 49.85) / (3 * 0.03) = 0.20 / 0.09 = 2.222.\nCpk is the minimum of both values: min(1.111, 2.222) = 1.11.',
    formula: 'Cpk = min( (USL - mu) / (3 * sigma), (mu - LSL) / (3 * sigma) )',
    examRelevance: 'Standard GATE Production / ASQ CQE numerical question.'
  },
  {
    id: 'q-02',
    category: 'Quality Gurus',
    difficulty: 'Beginner',
    question: 'Which quality philosopher introduced the concept of the "Quadratic Loss Function" to prove that financial loss increases as the product characteristic deviates from the target, even within specification limits?',
    options: ['W. Edwards Deming', 'Joseph Juran', 'Genichi Taguchi', 'Kaoru Ishikawa'],
    correctIndex: 2,
    explanation: 'Genichi Taguchi introduced the Quadratic Loss Function L(y) = k(y - m)^2, revolutionizing engineering design by emphasizing target-focused manufacturing rather than merely staying inside specification limits.',
    examRelevance: 'Common in ESE, GATE, and ASQ Certified Quality Engineer fundamentals.'
  },
  {
    id: 'q-03',
    category: 'Statistical Process Control',
    difficulty: 'Advanced',
    question: 'In an X-bar control chart with subgroup size n = 5, the process average range R-bar is 4.0 units. Given A2 = 0.577, d2 = 2.326, D3 = 0, and D4 = 2.114, what is the estimated process standard deviation sigma?',
    options: ['2.308 units', '1.720 units', '0.771 units', '8.456 units'],
    correctIndex: 1,
    explanation: 'The standard estimator of process standard deviation from average range is: sigma = R-bar / d2 = 4.0 / 2.326 = 1.7197 ≈ 1.72 units. (Note: A2 is used for chart limits, d2 is the unbiasing constant for standard deviation).',
    formula: 'sigma = R-bar / d2',
    examRelevance: 'Frequent numerical question in GATE Industrial & Production Engineering.'
  },
  {
    id: 'q-04',
    category: 'FMEA & Risk Management',
    difficulty: 'Intermediate',
    question: 'Under the harmonized AIAG & VDA FMEA standard, why has the traditional Risk Priority Number (RPN) been superseded by the Action Priority (AP) methodology?',
    options: [
      'RPN was too difficult to calculate on shop-floor spreadsheets',
      'RPN treats Severity, Occurrence, and Detection with equal weight, allowing potentially fatal safety risks with low occurrence to appear low priority',
      'Action Priority eliminates the need to assign Severity ratings',
      'RPN is only valid for aerospace, not automotive components'
    ],
    correctIndex: 1,
    explanation: 'RPN = S * O * D has severe mathematical shortcomings: it does not distinguish between high-severity hazards (e.g. S=10, O=2, D=2 = RPN 40) and minor nuisances (S=2, O=4, D=5 = RPN 40). Action Priority enforces a prioritized logic table ensuring high severity always demands action.',
    examRelevance: 'High relevance for IATF 16949 auditor certification and engineering interviews.'
  },
  {
    id: 'q-05',
    category: 'Six Sigma & DMAIC',
    difficulty: 'Advanced',
    question: 'A printed circuit board assembly line inspects 2,000 boards. Each board has 50 solder joints (opportunities for defect). During inspection, a total of 25 defects are detected. What is the DPMO and approximate Sigma level?',
    options: ['250 DPMO (~5.0 Sigma)', '25 DPMO (~5.5 Sigma)', '250 DPMO (~4.0 Sigma)', '500 DPMO (~4.8 Sigma)'],
    correctIndex: 0,
    explanation: 'Total Opportunities = 2,000 boards * 50 joints = 100,000 opportunities.\nDefects per Opportunity (DPO) = 25 / 100,000 = 0.00025.\nDPMO = DPO * 1,000,000 = 250 DPMO.\nUnder the standard Motorola 1.5-sigma shift table, 233 DPMO corresponds to 5.0 Sigma, so 250 DPMO is approximately 5.0 Sigma (Yield = 99.975%).',
    formula: 'DPMO = (Defects / (Units * Opportunities)) * 10^6',
    examRelevance: 'Standard Six Sigma Black Belt certification exam question.'
  },
  {
    id: 'q-06',
    category: 'Metrology & Standards',
    difficulty: 'Intermediate',
    question: 'Which of the following standards governs the qualification and competence of testing and calibration laboratories (such as those performing CMM, chemical analysis, and tensile testing)?',
    options: ['ISO 9001:2015', 'ISO/IEC 17025:2017', 'IATF 16949:2016', 'ISO 14001:2015'],
    correctIndex: 1,
    explanation: 'ISO/IEC 17025 is the international standard specifying the technical competence, impartiality, and consistent operation of testing and calibration laboratories.',
    examRelevance: 'Common in industrial quality compliance and auditor tests.'
  }
];
