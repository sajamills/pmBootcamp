export type StitchFixTicket = {
  id: string;
  title: string;
  description: string;
};

export type StitchFixTicketPhase = {
  name: string;
  summary: string;
  tickets: StitchFixTicket[];
};

export const stitchFixCaseStudy = {
  title: "StitchFix Onboarding Reimagined",
  eyebrow: "Shipped product case study",
  summary:
    "A premium, adaptive style-profile experience that turns a long apparel questionnaire into a guided conversation, then makes the user's answers tangible through a persistent interactive 3D avatar.",
  liveUrl: "https://stitchfixdemo.vercel.app",
  githubUrl: "https://github.com/sajamills/stitchfixdemo",
  shippedOn: "June 15, 2026",
  role: "Product strategy, UX design, prototyping, and engineering",
  stack: [
    "Next.js",
    "TypeScript",
    "Framer Motion",
    "React Three Fiber",
    "Three.js",
    "Tailwind CSS",
  ],
  outcomes: [
    "Nine-step onboarding flow with adaptive activewear questions",
    "Persistent local progress with a complete editable profile summary",
    "Interactive 3D avatar that reacts to apparel choices",
    "Responsive experience with the avatar hidden on smaller screens",
  ],
};

export const stitchFixFlow = [
  {
    step: "01",
    title: "Welcome",
    detail: "Capture a name and personalize the journey.",
  },
  {
    step: "02",
    title: "Shopping goals",
    detail: "Understand what the user wants help solving.",
  },
  {
    step: "03",
    title: "Body type",
    detail: "Choose an illustrated body profile.",
  },
  {
    step: "04",
    title: "Height",
    detail: "Collect measurements with guided validation.",
  },
  {
    step: "05",
    title: "Clothing sizes",
    detail: "Capture size and fit feedback by category.",
  },
  {
    step: "06",
    title: "Fit preferences",
    detail: "Identify tight or loose areas on a body map.",
  },
  {
    step: "07",
    title: "Clothing types",
    detail: "Select lifestyle needs and update the avatar.",
  },
  {
    step: "7B",
    title: "Activewear sizes",
    detail: "Conditional branch shown only when Active is selected.",
    conditional: true,
  },
  {
    step: "08",
    title: "Style inspiration",
    detail: "Like or dislike visual looks to signal taste.",
  },
  {
    step: "09",
    title: "Profile ready",
    detail: "Review the complete profile and edit any section.",
  },
];

export const stitchFixTicketPhases: StitchFixTicketPhase[] = [
  {
    name: "Core onboarding experience",
    summary:
      "Twelve tickets established the product foundation, state model, adaptive questionnaire, and profile summary.",
    tickets: [
      {
        id: "US-001",
        title: "Project scaffold",
        description:
          "Configure the Next.js App Router foundation with TypeScript, Tailwind CSS, Framer Motion, and the visual brand system.",
      },
      {
        id: "US-002",
        title: "Onboarding state management",
        description:
          "Create a typed shared profile state, navigation actions, and localStorage persistence so progress survives refreshes.",
      },
      {
        id: "US-003",
        title: "Step transition shell",
        description:
          "Build the reusable header, progress, navigation, and directional slide transitions used throughout the flow.",
      },
      {
        id: "US-004",
        title: "Welcome and name",
        description:
          "Open with a warm personalized introduction, focused name input, and guarded Get Started action.",
      },
      {
        id: "US-005",
        title: "Shopping priorities",
        description:
          "Let users multi-select the outcomes that matter most using animated choice pills.",
      },
      {
        id: "US-006",
        title: "Body type",
        description:
          "Present four illustrated body-type cards with a single-select interaction and optional skip.",
      },
      {
        id: "US-007",
        title: "Height",
        description:
          "Collect feet and inches with validation, smart focus movement, and a responsive visual ruler.",
      },
      {
        id: "US-008",
        title: "Clothing sizes",
        description:
          "Use an accordion to capture size and fit feedback across shirt, waist, inseam, blazer, and shoe categories.",
      },
      {
        id: "US-009",
        title: "Fit preferences",
        description:
          "Guide users through shoulder, chest, midsection, and hip fit questions alongside an animated body illustration.",
      },
      {
        id: "US-010",
        title: "Clothing types and adaptive activewear",
        description:
          "Capture lifestyle categories and insert an activewear sizing step only when Active is selected.",
      },
      {
        id: "US-011",
        title: "Style inspiration image quiz",
        description:
          "Use a visual masonry grid with like and dislike signals to capture aesthetic preferences.",
      },
      {
        id: "US-012",
        title: "Profile summary",
        description:
          "Summarize every answer in editable sections and provide clear completion and restart actions.",
      },
    ],
  },
  {
    name: "3D avatar and experience enhancement",
    summary:
      "Eight follow-on tickets made the profile visible, interactive, and persistent throughout the desktop journey.",
    tickets: [
      {
        id: "US-001",
        title: "Install the 3D rendering foundation",
        description:
          "Add Three.js, React Three Fiber, Drei, and their TypeScript support to the application.",
      },
      {
        id: "US-002",
        title: "Build a stylized 3D avatar",
        description:
          "Create the initial full-body avatar and establish its lighting, camera, proportions, and visual language.",
      },
      {
        id: "US-003",
        title: "Create clothing layers",
        description:
          "Support selectable shirt, pants, and shoe treatments with clear default outfit states.",
      },
      {
        id: "US-004",
        title: "Add spin interaction",
        description:
          "Let users drag to inspect the avatar, constrain the camera, and resume auto-rotation after inactivity.",
      },
      {
        id: "US-005",
        title: "Build the clothing selector",
        description:
          "Add shared outfit state and compact color-matched controls beneath the avatar.",
      },
      {
        id: "US-006",
        title: "Create the persistent split-screen layout",
        description:
          "Keep the avatar visible beside Steps 2-9 on desktop while preserving a focused mobile questionnaire.",
      },
      {
        id: "US-007",
        title: "React to onboarding answers",
        description:
          "Update the suggested outfit as users choose clothing types while still allowing manual overrides.",
      },
      {
        id: "US-008",
        title: "Fix summary scrollability",
        description:
          "Make the summary independently scrollable so every profile section and CTA remains reachable beside the fixed avatar.",
      },
    ],
  },
];
