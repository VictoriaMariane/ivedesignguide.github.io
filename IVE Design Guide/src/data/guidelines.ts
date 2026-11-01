export interface Guideline {
  id: number;
  priority: number;
  title: string;
  shortDesc: string;
  iconName: string;
  fullDescription: string[];
  latheExample: string;
  latheHighlights: string[];
  checklist: string[];
  figureLabel: string;
  figureLabelB?: string;
}

export const guidelines: Guideline[] = [
  {
    id: 1,
    priority: 1,
    title: "Systematic Task Mapping",
    iconName: "ListChecks",
    shortDesc: "Structure the interface around critical work tasks by mapping operational procedures into Guided User Tasks (GUTasks), incorporating checkpoints and performance feedback.",
    fullDescription: [
      "The user interface should be driven by a structured decomposition of real-world work activities into critical user tasks, ensuring that every interaction contributes to the training objectives. This guideline was ranked highest by experts, who emphasized the value of incorporating checkpoints and feedback mechanisms throughout the execution of Guided User Tasks (GUTasks).",
      "These interactions should also provide measurable evidence of user performance. Immediate feedback benefits not only trainees by reinforcing safe behaviors but also organizations by generating quantitative performance indicators that can support competency assessment and training management.",
    ],
    latheExample: "The lathe training simulator uses a TaskManager system with ScriptableObjects that define each task and an instructional video. The training is divided into 10 sequential GUTasks: (1) energizing the lathe, (2) reading and interpreting the process sheet, (3) configuring panel levers, (4) setting rotation speed, (5) securing the test specimen in the chuck, (6) securing the cutting tool in the tool post, (7) closing safety locks, (8) starting the machine, (9) moving the carriage toward the specimen, and (10) pressing the emergency stop. Each task has a SubTaskTrigger that fires events upon completion, and the system displays the current and next task. The QuickOutline asset highlights objects relevant to the current subtask.",
    latheHighlights: [
      "10 sequential GUTasks mapped from the real lathe preparation procedure",
      "TaskManager with ScriptableObjects for modular task definition",
      "SubTaskTrigger components fire events upon task completion",
      "QuickOutline highlights the object relevant to the current subtask",
    ],
    checklist: [
      "Does the interface decompose the activity into critical tasks?",
      "Does the task reflect a real-world action?",
      "Does the system provide feedback (visual, auditory or otherwise) when the user completes the task?",
    ],
    figureLabel: "Figure A: TaskManager — 10 sequential GUTasks",
    figureLabelB: "Figure B: QuickOutline highlighting current subtask object",
  },
  {
    id: 2,
    priority: 2,
    title: "Ergonomic Comfort",
    iconName: "Armchair",
    shortDesc: "Design interactions that minimize fatigue, excessive reach, prolonged arm elevation, abrupt camera movements, and cybersickness.",
    fullDescription: [
      "Ergonomic comfort is considered a fundamental design requirement. Although the original guideline focused on preventing fatigue and cybersickness, the discussion expanded this perspective by emphasizing that ergonomic decisions directly influence user performance, engagement, and training duration.",
      "Participants highlighted that prolonged arm elevation, excessive reaching, abrupt viewpoint changes, and repetitive interaction patterns should be minimized whenever possible. Ergonomic requirements vary according to the duration, objectives, and physical demands of each training scenario. Interface designers should balance realism with physical comfort, ensuring that interactions remain representative of real-world activities without imposing unnecessary physical strain.",
    ],
    latheExample: "The lathe training simulator was developed for the latest VR glasses and the entire experience lasted less than 5 minutes. The foot pedal is operated via raycast against a static 3D model (since the user's foot is not tracked), avoiding the need to bend down. Smooth locomotion is used to reduce cybersickness.",
    latheHighlights: [
      "Short experience (less than 5 minutes) to avoid fatigue",
      "Foot pedal operated via raycast, avoiding bending down",
      "Smooth locomotion to reduce cybersickness",
      "Developed for the latest VR glasses",
    ],
    checklist: [
      "Does it prevent the user from having to turn their head abruptly or make fatiguing movements?",
      "Are interactive objects within the visual and reach comfort zones?",
      "Was it designed for the latest hardware?",
    ],
    figureLabel: "Figure A: Ergonomic comfort - no excessive reaching",
    figureLabelB: "Figure B: Smooth locomotion system overview",
  },
  {
    id: 3,
    priority: 3,
    title: "Spatial and Multimodal Coherence",
    iconName: "Layers",
    shortDesc: "Ensure that visual, auditory, haptic, and interactive feedback operate as complementary communication channels, supporting perception and situational awareness.",
    fullDescription: [
      "This topic emerged as one of the most prominent in both the reviewed literature and the Delphi discussions. Participants consistently agreed that visual, auditory, and haptic feedback should communicate complementary information while remaining seamlessly integrated into the virtual environment.",
      "Several experts emphasized that multimodal feedback becomes particularly important when hand tracking replaces physical controllers. Without the tactile confirmation provided by handheld devices, visual and auditory cues play a central role in communicating interaction outcomes and reducing uncertainty during task execution. Beyond improving interaction quality, multimodal feedback can also enhance accessibility by accommodating users with different perceptual abilities and interaction preferences.",
    ],
    latheExample: "In the lathe training simulator, when the user completes a task, the system emits sound effects, controller haptic feedback, and a UI displaying the current task as completed and the next one. When the user turns a lever, they receive auditory feedback (mechanical sound), haptic feedback (controller vibration), and visual feedback (lever animation + indicator light). The instructional video for each task is presented on a virtual monitor inside the environment, not as a floating menu.",
    latheHighlights: [
      "Sound effects + controller haptic feedback + UI update upon task completion",
      "Auditory, haptic, and visual feedback when turning levers",
      "Instructional video on a virtual monitor inside the environment",
      "Indicator lights communicating machine state",
    ],
    checklist: [
      "Do the sensory feedbacks communicate the same information?",
      "The virtual avatar positioning corresponds to the actual position of user's own body in physical space?",
      "Is the modeling of objects and their physics consistent with the real world?",
    ],
    figureLabel: "Figure A: Diegetic design",
    figureLabelB: "Figure B: Virtual monitor instructional video in context",
  },
  {
    id: 4,
    priority: 4,
    title: "Guided Task Progression",
    iconName: "Footprints",
    shortDesc: "Provide structured onboarding and progressively introduce tasks, allowing users to master controls before entering complex or hazardous scenarios.",
    fullDescription: [
      "Experts highlighted the importance of an onboarding phase. The interface should require users to complete a simple interaction task before entering hazardous scenarios in order to verify control mastery.",
      "This recommendation extends the original guideline by emphasizing onboarding not only as a learning aid but also as an essential mechanism for distinguishing failures caused by inadequate interface interaction from those genuinely associated with task execution.",
    ],
    latheExample: "The lathe training simulator is structured around two primary scenes. The tutorial scene contains UIs explaining system usage, allowing users to freely walk through the laboratory and experiment with tools without commencing the actual training. The main scene is where the actual training takes place, with the 10 guided GUTasks. This structure ensures that users master the controls before entering the hazardous scenario of operating a lathe.",
    latheHighlights: [
      "Tutorial scene for free exploration and control familiarization",
      "Main scene with guided training accessible after the tutorial",
      "Users can experiment with tools without starting the training",
      "Onboarding verifies control mastery before hazardous scenarios",
    ],
    checklist: [
      "Is there an onboarding phase?",
      "Are tasks introduced gradually?",
      "Does the user master the controls before risks?",
    ],
    figureLabel: "Figure A: Tutorial scene — free exploration environment",
    figureLabelB: "Figure B: Main training scene — guided GUTask progression",
  },
  {
    id: 5,
    priority: 5,
    title: "Cognitive Load Reduction",
    iconName: "Brain",
    shortDesc: "Present only task-relevant information and distribute instructions across multiple sensory modalities to reduce unnecessary cognitive effort.",
    fullDescription: [
      "This finding is closely linked to the spatial and multimodal coherence guideline, which led the experts' discussion toward the role of information management.",
      "Presenting only task-relevant information and distributing instructions across multiple sensory modalities reduces unnecessary cognitive effort.",
    ],
    latheExample: "In the lathe training simulator, only the current task is displayed on the UI. The instructional video is shown on a virtual monitor, the relevant object is highlighted with a green outline (QuickOutline), and feedback is given through sound and vibration, distributing information across multiple channels without overloading the visual field.",
    latheHighlights: [
      "Only the current task is displayed on the UI",
      "QuickOutline highlights only the object relevant to the current task",
      "Instructions distributed across text, video, audio, and haptic channels",
      "Minimalist UI: current task, next task, machine state",
    ],
    checklist: [
      "Are only essential information displayed?",
      "Do the instructions use multiple channels?",
      "Does it highlight the interaction object as an attentional cue?",
    ],
    figureLabel: "Figure A: Minimalist UI showing only current task",
    figureLabelB: "Figure B: QuickOutline highlighting the active object",
  },
  {
    id: 6,
    priority: 6,
    title: "Context-sensitive Realism",
    iconName: "Eye",
    shortDesc: "Prioritize functional realism by faithfully representing operational procedures, hazards, and decision-making processes instead of focusing solely on visual fidelity.",
    fullDescription: [
      "Realism does not need to be purely visual; it should help users understand the task, risks, and required decisions without introducing unnecessary details that increase cognitive load.",
      "Experts also suggested replacing floating menus with interfaces embedded directly into machinery or virtual tablets, as well as designing system responses that reflect unsafe actions.",
    ],
    latheExample: "The lathe training simulator uses dimensionally accurate 3D modeling of the Clark CM41x1000 lathe and the Labusig laboratory at UFPR. The machine behavior replicates the real one. The realism is functional, focused on procedures and operational risks, not just visual fidelity.",
    latheHighlights: [
      "Dimensionally accurate 3D modeling of the Clark CM41x1000 lathe",
      "Machine behavior replicates the real one",
      "Safety fault controls: unsafe gear change cuts power instantly",
      "Reset protocol mimics correct real-world lathe procedures",
    ],
    checklist: [
      "Does realism prioritize physics, proportion and mechanics of the objects over mere visual fidelity?",
      "Does it replace the excess of floating menus with diegetic elements (such as a tablet, an integrated screen, or others)?",
      "Does it respond to the user's actions realistically?",
    ],
    figureLabel: "Figure A: Dimensionally accurate Clark CM41x1000 3D model",
    figureLabelB: "Figure B: Safety fault response — power cut on unsafe action",
  },
  {
    id: 7,
    priority: 7,
    title: "Embodied Interaction",
    iconName: "Hand",
    shortDesc: "Design interactions that align with natural body movements while accommodating differences in users' physical characteristics and mobility.",
    fullDescription: [
      "The system should tolerate natural variations in users' movements, accounting for differences in height, arm span, and mobility limitations while still recognizing intended gestures.",
    ],
    latheExample: "The system tolerates natural variations in movement and automatically readjusts to the user's height.",
    latheHighlights: [
      "The system tolerates natural variations in movement",
      "Automatic readjustment to the user's height",
      "Recognition of intended gestures",
      "Reduction of frustration with unrecognized gestures",
    ],
    checklist: [
      "Does it align virtual actions with physical movements?",
      "Does it tolerate natural variations in movement?",
      "Does the system avoid pressing buttons on the controllers for actions that, in real life, would require full-body movement (e.g. turning a crank)?",
    ],
    figureLabel: "Figure A: Height adjustment system in the lathe training",
    figureLabelB: "Figure B: Gesture recognition tolerance thresholds",
  },
  {
    id: 8,
    priority: 8,
    title: "Accessibility and User Adaptation",
    iconName: "Accessibility",
    shortDesc: "Adapt the interface to users' abilities, experience with VR, and individual characteristics by providing flexible interaction techniques, multimodal feedback, and inclusive design solutions.",
    fullDescription: [
      "Even though accessibility emerged implicitly throughout several discussions, such as in multimodal interaction, embodied interaction, and ergonomic comfort, the experts agreed that it should be represented as an independent design guideline.",
      "The panel argued that developers should accommodate differences in users' physical characteristics, perceptual abilities, previous experience with VR, and motor capabilities, enabling a broader range of users to successfully complete training activities.",
    ],
    latheExample: "The lathe training simulator offers multiple interaction mechanisms: direct grab for objects, raycast for UI and foot pedal, and virtual physical buttons. The tutorial scene accommodates users with no prior VR experience. The foot pedal is accessible via raycast, accommodating users with mobility limitations. Multimodal feedback (visual, auditory, haptic) addresses different perceptual abilities. The system adapts to users' physical characteristics.",
    latheHighlights: [
      "Multiple interaction mechanisms: grab, raycast, physical buttons",
      "Tutorial scene for users with no prior VR experience",
      "Foot pedal accessible via raycast for mobility limitations",
      "Multimodal feedback for different perceptual abilities",
    ],
    checklist: [
      "Does it adapt to different physical, visual and auditory abilities?",
      "Does it adjust to the user's eye level?",
      "Does it feature adjustable fonts and high contrast to facilitate navigation?",
    ],
    figureLabel: "Figure A: user adaptation and instrutor to oversee",
    figureLabelB: "Figure B: Foot pedal raycast — accessibility in practice",
  },
  {
    id: 9,
    priority: 9,
    title: "Gamification",
    iconName: "Gamepad2",
    shortDesc: "Introduce gamified elements only when they reinforce learning objectives, motivation, and engagement without compromising realism or safety-oriented decision making.",
    fullDescription: [
      "Experts agreed that game mechanics can increase engagement, motivation, and training adherence, backed by scientific literature. However, they emphasized that gamification should never compromise the primary learning objectives or distort risk perception.",
      "Therefore, gamification was regarded as a context-dependent recommendation whose adoption should be determined according to the instructional goals and characteristics of each training scenario.",
    ],
    latheExample: "The lathe training simulator does not use traditional gamification (points, rankings, competition). The focus is on safety and learning the correct procedure. Task completion feedback (sound, UI, vibration) provides a sense of progress without distorting risk perception. The linear progression through the 10 tasks functions as a form of intrinsic 'progress.'",
    latheHighlights: [
      "No traditional gamification (points, rankings, competition)",
      "Intrinsic progress: completing the 10 preparation tasks",
      "Task completion feedback provides a sense of progress",
      "Gamification avoided to preserve risk perception",
    ],
    checklist: [
      "Does the user have steps to complete?",
      "Does it use multisensory feedback to indicate whether the user was correct or incorrect?",
      "Does it have a storyline (a beginning, middle and end)?",
    ],
    figureLabel: "Figure A: Intrinsic progress - highlighted tasks",
    figureLabelB: "Figure B: Feedback system without gamification elements",
  },
];

export const priorityBadgeClass = (priority: number): string => {
  const classes: Record<number, string> = {
    1: "priority-1",
    2: "priority-2",
    3: "priority-3",
    4: "priority-4",
    5: "priority-5",
    6: "priority-6",
    7: "priority-7",
    8: "priority-8",
    9: "priority-9",
  };
  return classes[priority] ?? "priority-9";
};
