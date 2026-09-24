// Frontend-only demo data for the NeuroPlay experience.
// Nothing here is persisted; it stands in until a rehabilitation backend exists.

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type ExerciseCategory = "Hand & Wrist" | "Shoulder" | "Coordination" | "Strength" | "Mobility";
export type ExerciseStatus = "completed" | "recommended" | "in-progress" | "upcoming";
export type VisualKind = "wrist" | "grip" | "fingers" | "shoulder" | "reach" | "balance";

export type Exercise = {
  id: string;
  name: string;
  category: ExerciseCategory;
  target: string;
  durationMin: number;
  reps: number;
  sets: number;
  difficulty: Difficulty;
  intensity: "Low" | "Moderate" | "High";
  status: ExerciseStatus;
  visual: VisualKind;
  summary: string;
  description: string;
  steps: string[];
  measures: { label: string; detail: string }[];
  safety: string;
};

export const exerciseCategories: ExerciseCategory[] = ["Hand & Wrist", "Shoulder", "Coordination", "Strength", "Mobility"];
export const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

const standardMeasures = [
  { label: "Range of motion", detail: "How far each repetition travels compared with your target range." },
  { label: "Movement consistency", detail: "How evenly paced and controlled each repetition is." },
  { label: "Repetition quality", detail: "Whether each rep reaches the target and returns under control." }
];

export const exercises: Exercise[] = [
  {
    id: "wrist-range-of-motion",
    name: "Wrist Range of Motion",
    category: "Hand & Wrist",
    target: "Wrist flexion & extension",
    durationMin: 8,
    reps: 12,
    sets: 3,
    difficulty: "Beginner",
    intensity: "Low",
    status: "recommended",
    visual: "wrist",
    summary: "Slow, controlled wrist bends to rebuild flexibility.",
    description:
      "A guided mobility exercise that gently moves the wrist through flexion and extension. It helps restore comfortable range of motion and prepares the hand for grip and coordination work.",
    steps: [
      "Rest your forearm on a table with your hand hanging over the edge, palm facing down.",
      "Slowly bend your wrist upward as far as is comfortable and hold for two seconds.",
      "Lower your hand back down past neutral, again only as far as is comfortable.",
      "Return to neutral and repeat at a steady, even pace."
    ],
    measures: standardMeasures,
    safety:
      "Move only within a comfortable range. Stop the exercise if you feel sharp pain, numbness, or tingling, and let your care team know."
  },
  {
    id: "grip-strength",
    name: "Grip Strength",
    category: "Strength",
    target: "Finger flexors & grip",
    durationMin: 6,
    reps: 10,
    sets: 3,
    difficulty: "Intermediate",
    intensity: "Moderate",
    status: "upcoming",
    visual: "grip",
    summary: "Squeeze-and-release holds with a soft therapy ball.",
    description:
      "Builds functional grip strength with controlled squeezes. Each repetition is a steady squeeze, a short hold, and a slow release.",
    steps: [
      "Hold a soft therapy ball in the palm of your hand.",
      "Squeeze gradually until you reach a firm but comfortable grip.",
      "Hold the squeeze for three seconds.",
      "Release slowly and let your fingers fully open before the next rep."
    ],
    measures: [
      { label: "Grip hold time", detail: "How long each squeeze is held steadily." },
      standardMeasures[1],
      standardMeasures[2]
    ],
    safety: "Use a soft ball and a comfortable squeeze. Rest between sets and stop if your hand cramps or hurts."
  },
  {
    id: "finger-coordination",
    name: "Finger Coordination",
    category: "Coordination",
    target: "Fine motor control",
    durationMin: 7,
    reps: 15,
    sets: 2,
    difficulty: "Intermediate",
    intensity: "Low",
    status: "upcoming",
    visual: "fingers",
    summary: "Thumb-to-finger taps for precision and timing.",
    description:
      "Touch your thumb to each fingertip in sequence. This improves precision, timing, and the independence of individual fingers.",
    steps: [
      "Sit comfortably with your hand raised, palm facing you.",
      "Touch your thumb to your index finger, then middle, ring, and little finger.",
      "Reverse the sequence back to the index finger.",
      "Keep a steady rhythm rather than rushing."
    ],
    measures: [
      { label: "Tap accuracy", detail: "Whether each tap meets the intended fingertip." },
      { label: "Rhythm consistency", detail: "How even the timing is between taps." },
      standardMeasures[2]
    ],
    safety: "Keep the movement light. Pause if your hand feels fatigued or the movement becomes uncomfortable."
  },
  {
    id: "shoulder-flexion",
    name: "Shoulder Flexion",
    category: "Shoulder",
    target: "Anterior shoulder mobility",
    durationMin: 10,
    reps: 10,
    sets: 3,
    difficulty: "Intermediate",
    intensity: "Moderate",
    status: "completed",
    visual: "shoulder",
    summary: "Forward arm raises to restore overhead reach.",
    description:
      "Raise your arm forward and up within a comfortable range. This supports everyday reaching tasks such as lifting objects onto a shelf.",
    steps: [
      "Stand or sit upright with your arm relaxed by your side, thumb pointing forward.",
      "Slowly raise your arm in front of you as high as is comfortable.",
      "Pause briefly at the top without shrugging your shoulder.",
      "Lower slowly back to your side."
    ],
    measures: standardMeasures,
    safety: "Keep your shoulder relaxed and avoid arching your back. Stop if you feel pinching or sharp pain."
  },
  {
    id: "reach-and-place",
    name: "Reach & Place",
    category: "Coordination",
    target: "Arm–hand coordination",
    durationMin: 9,
    reps: 12,
    sets: 2,
    difficulty: "Advanced",
    intensity: "Moderate",
    status: "upcoming",
    visual: "reach",
    summary: "Move small objects between targets with control.",
    description:
      "A functional task that combines reaching, grasping, and placing. It trains the arm and hand to work together smoothly.",
    steps: [
      "Place three small objects on the table in front of you.",
      "Reach for one object, pick it up, and place it on the marked target.",
      "Return your hand to the starting position.",
      "Repeat with the next object, keeping each movement smooth."
    ],
    measures: [
      { label: "Movement smoothness", detail: "How continuous the reach is from start to target." },
      { label: "Placement accuracy", detail: "How close each object lands to the target." },
      standardMeasures[1]
    ],
    safety: "Keep objects light and within easy reach. Take a break if you feel unsteady."
  },
  {
    id: "forearm-rotation",
    name: "Forearm Rotation",
    category: "Mobility",
    target: "Pronation & supination",
    durationMin: 6,
    reps: 12,
    sets: 2,
    difficulty: "Beginner",
    intensity: "Low",
    status: "completed",
    visual: "wrist",
    summary: "Palm-up to palm-down turns with the elbow tucked.",
    description:
      "Rotate the forearm so the palm turns up and then down. This restores the rotation needed for tasks like turning a door handle.",
    steps: [
      "Sit with your elbow bent at 90° and tucked against your side.",
      "Slowly turn your palm to face the ceiling.",
      "Then turn your palm to face the floor.",
      "Keep your elbow still throughout the movement."
    ],
    measures: standardMeasures,
    safety: "Rotate only within a comfortable range and keep the movement slow."
  },
  {
    id: "seated-balance-reach",
    name: "Seated Balance Reach",
    category: "Mobility",
    target: "Trunk control",
    durationMin: 8,
    reps: 8,
    sets: 2,
    difficulty: "Intermediate",
    intensity: "Low",
    status: "upcoming",
    visual: "balance",
    summary: "Controlled side reaches from a stable seated position.",
    description:
      "Reach to each side while seated to build trunk stability and confidence with weight shifts.",
    steps: [
      "Sit near the front of a sturdy chair with feet flat on the floor.",
      "Reach one arm out to the side as far as is comfortable.",
      "Return to the centre and pause.",
      "Repeat on the other side."
    ],
    measures: [
      { label: "Reach distance", detail: "How far you reach while staying balanced." },
      { label: "Movement symmetry", detail: "How similar the left and right reaches are." },
      standardMeasures[1]
    ],
    safety: "Use a stable chair without wheels. Keep a support nearby and stop if you feel dizzy."
  },
  {
    id: "resistance-band-pull",
    name: "Resistance Band Pull",
    category: "Strength",
    target: "Upper back & shoulder",
    durationMin: 10,
    reps: 10,
    sets: 3,
    difficulty: "Advanced",
    intensity: "High",
    status: "upcoming",
    visual: "shoulder",
    summary: "Light band rows to strengthen posture muscles.",
    description:
      "Pull a light resistance band towards you to strengthen the muscles that support shoulder stability and posture.",
    steps: [
      "Anchor a light resistance band at chest height.",
      "Hold the ends with arms extended in front of you.",
      "Pull your elbows back, gently squeezing your shoulder blades together.",
      "Return slowly to the start position."
    ],
    measures: standardMeasures,
    safety: "Start with the lightest band. Stop if you feel shoulder pain or the band slips."
  }
];

export function getExercise(id: string) {
  return exercises.find((exercise) => exercise.id === id);
}

export const todaysPlanIds = ["wrist-range-of-motion", "grip-strength", "finger-coordination"];

export const patientProfile = {
  firstName: "Safira",
  lastName: "Nugumanova",
  initials: "SN",
  email: "safira.nugumanova@example.com",
  dateOfBirth: "14 March 1978",
  phone: "+1 (555) 014-2290",
  program: "Upper-limb motor recovery",
  programWeek: 6,
  programWeeks: 12,
  startDate: "12 August 2026",
  focusAreas: ["Right wrist mobility", "Grip strength", "Fine motor coordination"]
};

export const clinician = {
  name: "Dr. Sarah Chen",
  initials: "SC",
  role: "Physical Therapist",
  clinic: "Riverside Rehabilitation Center",
  nextCheckIn: "Thu, 1 Oct · 10:30",
  nextCheckInType: "Video check-in",
  lastNote: {
    date: "18 Sep 2026",
    body:
      "Nice steady progress on wrist extension this week. Keep the pace slow on the final set, and add the finger coordination exercise on rest days if your hand feels comfortable."
  }
};

export const careGoals = [
  { label: "Reach 70° comfortable wrist extension", progress: 78 },
  { label: "Complete 5 sessions per week", progress: 80 },
  { label: "Hold a 3-second grip for 10 reps", progress: 60 }
];

export const recoverySummary = {
  mobilityScore: 78,
  mobilityDelta: 6,
  sessionsThisWeek: 4,
  sessionsGoal: 5,
  trainingMinutes: 142,
  trainingDelta: 18,
  streakDays: 9
};

export type ChartPoint = { label: string; value: number };
export type Period = "weekly" | "monthly" | "yearly";

export const mobilitySeries: Record<Period, ChartPoint[]> = {
  weekly: [
    { label: "Mon", value: 71 },
    { label: "Tue", value: 72 },
    { label: "Wed", value: 72 },
    { label: "Thu", value: 74 },
    { label: "Fri", value: 75 },
    { label: "Sat", value: 76 },
    { label: "Sun", value: 78 }
  ],
  monthly: [
    { label: "Wk 1", value: 58 },
    { label: "Wk 2", value: 63 },
    { label: "Wk 3", value: 67 },
    { label: "Wk 4", value: 70 },
    { label: "Wk 5", value: 74 },
    { label: "Wk 6", value: 78 }
  ],
  yearly: [
    { label: "Apr", value: 34 },
    { label: "May", value: 39 },
    { label: "Jun", value: 45 },
    { label: "Jul", value: 52 },
    { label: "Aug", value: 60 },
    { label: "Sep", value: 78 }
  ]
};

export const periodStats: Record<Period, { trainingTime: string; rom: string; response: string; consistency: string; deltas: [string, string, string, string] }> = {
  weekly: { trainingTime: "2h 22m", rom: "64°", response: "0.82s", consistency: "86%", deltas: ["+18 min", "+4°", "−0.06s", "+5%"] },
  monthly: { trainingTime: "9h 40m", rom: "64°", response: "0.82s", consistency: "84%", deltas: ["+1h 10m", "+11°", "−0.21s", "+9%"] },
  yearly: { trainingTime: "31h 05m", rom: "64°", response: "0.82s", consistency: "81%", deltas: ["—", "+29°", "−0.54s", "+22%"] }
};

export type SessionRecord = {
  id: string;
  exerciseId: string;
  date: string;
  durationMin: number;
  accuracy: number;
};

export const recentSessions: SessionRecord[] = [
  { id: "s-1024", exerciseId: "wrist-range-of-motion", date: "Today, 08:40", durationMin: 8, accuracy: 92 },
  { id: "s-1023", exerciseId: "shoulder-flexion", date: "Yesterday, 18:15", durationMin: 11, accuracy: 88 },
  { id: "s-1022", exerciseId: "forearm-rotation", date: "22 Sep, 09:05", durationMin: 6, accuracy: 90 },
  { id: "s-1021", exerciseId: "grip-strength", date: "21 Sep, 17:50", durationMin: 7, accuracy: 81 },
  { id: "s-1020", exerciseId: "finger-coordination", date: "20 Sep, 10:20", durationMin: 7, accuracy: 85 }
];

export const lastSessionResult = {
  exerciseId: "wrist-range-of-motion",
  accuracy: 92,
  durationLabel: "8:24",
  correctReps: 34,
  totalReps: 36,
  rangeOfMotion: 84,
  symmetry: 76,
  completion: 100,
  insight: "Movement consistency improved compared with your previous session of this exercise. Your final set stayed steady from the first rep to the last."
};

export type Report = {
  id: string;
  range: string;
  sessions: number;
  trainingTime: string;
  avgPerformance: number;
  status: "ready" | "shared";
};

export const reports: Report[] = [
  { id: "r-2026-09-3", range: "15 – 21 Sep 2026", sessions: 5, trainingTime: "2h 05m", avgPerformance: 87, status: "shared" },
  { id: "r-2026-09-2", range: "8 – 14 Sep 2026", sessions: 4, trainingTime: "1h 48m", avgPerformance: 84, status: "ready" },
  { id: "r-2026-09-1", range: "1 – 7 Sep 2026", sessions: 5, trainingTime: "2h 12m", avgPerformance: 80, status: "ready" },
  { id: "r-2026-08-4", range: "25 – 31 Aug 2026", sessions: 3, trainingTime: "1h 20m", avgPerformance: 76, status: "ready" }
];

// ----- Clinician side -----

export type Patient = {
  id: string;
  name: string;
  initials: string;
  age: number;
  program: string;
  progress: number;
  lastSession: string;
  adherence: number;
  status: "on-track" | "needs-attention" | "new";
  condition: string;
  week: number;
  weeks: number;
  goals: { label: string; progress: number }[];
  mobility: ChartPoint[];
  rom: ChartPoint[];
  sessions: { exercise: string; date: string; accuracy: number; durationMin: number }[];
};

const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"];
const series = (values: number[]) => values.map((value, index) => ({ label: weeks[index], value }));

export const patients: Patient[] = [
  {
    id: "safira-nugumanova",
    name: "Safira Nugumanova",
    initials: "SN",
    age: 48,
    program: "Upper-limb motor recovery",
    progress: 78,
    lastSession: "Today, 08:40",
    adherence: 92,
    status: "on-track",
    condition: "Post-stroke, right upper limb",
    week: 6,
    weeks: 12,
    goals: careGoals,
    mobility: series([58, 63, 67, 70, 74, 78]),
    rom: series([41, 46, 51, 55, 60, 64]),
    sessions: [
      { exercise: "Wrist Range of Motion", date: "Today, 08:40", accuracy: 92, durationMin: 8 },
      { exercise: "Shoulder Flexion", date: "Yesterday, 18:15", accuracy: 88, durationMin: 11 },
      { exercise: "Forearm Rotation", date: "22 Sep", accuracy: 90, durationMin: 6 }
    ]
  },
  {
    id: "maria-lopez",
    name: "Maria Lopez",
    initials: "ML",
    age: 62,
    program: "Shoulder mobility",
    progress: 64,
    lastSession: "Yesterday, 16:20",
    adherence: 81,
    status: "on-track",
    condition: "Rotator cuff repair, left",
    week: 4,
    weeks: 10,
    goals: [
      { label: "Pain-free overhead reach", progress: 55 },
      { label: "4 sessions per week", progress: 75 }
    ],
    mobility: series([44, 49, 55, 58, 61, 64]),
    rom: series([80, 92, 101, 110, 118, 124]),
    sessions: [
      { exercise: "Shoulder Flexion", date: "Yesterday, 16:20", accuracy: 84, durationMin: 10 },
      { exercise: "Resistance Band Pull", date: "21 Sep", accuracy: 79, durationMin: 10 }
    ]
  },
  {
    id: "james-okafor",
    name: "James Okafor",
    initials: "JO",
    age: 35,
    program: "Hand & grip recovery",
    progress: 42,
    lastSession: "5 days ago",
    adherence: 54,
    status: "needs-attention",
    condition: "Distal radius fracture, right",
    week: 3,
    weeks: 8,
    goals: [
      { label: "Regain full grip strength", progress: 38 },
      { label: "5 sessions per week", progress: 40 }
    ],
    mobility: series([30, 35, 39, 41, 41, 42]),
    rom: series([35, 40, 43, 45, 45, 46]),
    sessions: [
      { exercise: "Grip Strength", date: "19 Sep", accuracy: 72, durationMin: 6 },
      { exercise: "Wrist Range of Motion", date: "17 Sep", accuracy: 76, durationMin: 8 }
    ]
  },
  {
    id: "emma-schulz",
    name: "Emma Schulz",
    initials: "ES",
    age: 71,
    program: "Balance & coordination",
    progress: 57,
    lastSession: "Today, 11:05",
    adherence: 88,
    status: "on-track",
    condition: "Parkinson's, fine motor support",
    week: 5,
    weeks: 12,
    goals: [
      { label: "Steady seated reach both sides", progress: 62 },
      { label: "Daily finger coordination", progress: 70 }
    ],
    mobility: series([40, 45, 49, 52, 55, 57]),
    rom: series([50, 52, 55, 57, 58, 60]),
    sessions: [
      { exercise: "Seated Balance Reach", date: "Today, 11:05", accuracy: 83, durationMin: 8 },
      { exercise: "Finger Coordination", date: "Yesterday", accuracy: 80, durationMin: 7 }
    ]
  },
  {
    id: "liam-chen",
    name: "Liam Chen",
    initials: "LC",
    age: 29,
    program: "Hand & grip recovery",
    progress: 18,
    lastSession: "Not started",
    adherence: 0,
    status: "new",
    condition: "Tendon repair, left hand",
    week: 1,
    weeks: 8,
    goals: [{ label: "Complete first guided session", progress: 0 }],
    mobility: series([18, 18, 18, 18, 18, 18]),
    rom: series([30, 30, 30, 30, 30, 30]),
    sessions: []
  }
];

export function getPatient(id: string) {
  return patients.find((patient) => patient.id === id);
}

export const adherenceTrend: ChartPoint[] = [
  { label: "Apr", value: 68 },
  { label: "May", value: 71 },
  { label: "Jun", value: 70 },
  { label: "Jul", value: 75 },
  { label: "Aug", value: 79 },
  { label: "Sep", value: 82 }
];
