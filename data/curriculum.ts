export type Task = {
  id: string;
  title: string;
  type: "lesson" | "task" | "deliverable" | "challenge";
  description: string;
  resources?: { label: string; url: string }[];
};

export type Day = {
  day: number;
  title: string;
  tasks: Task[];
};

export type Week = {
  week: number;
  theme: string;
  goal: string;
  portfolioDeliverable: string;
  days: Day[];
};

export const curriculum: Week[] = [
  {
    week: 1,
    theme: "PM Foundations",
    goal: "Understand what PMs actually do day-to-day and learn the core mental models you'll use all bootcamp.",
    portfolioDeliverable: "A 1-page 'PM Operating Philosophy' doc",
    days: [
      {
        day: 1,
        title: "What does a PM actually do?",
        tasks: [
          {
            id: "w1d1-t1",
            title: "Lesson: The PM role across company stages",
            type: "lesson",
            description:
              "The PM role shifts dramatically by company stage. At an early-stage startup, you're doing user research, writing specs, and sometimes QA-ing builds yourself — generalist mode. At a scaleup, you specialize: growth PM, platform PM, core product PM, each with a dedicated team. At big tech, the role narrows further but the stakes and process overhead grow. For consumer/growth roles specifically, the throughline is: you own a metric (activation, retention, referral), you run experiments to move it, and you partner closely with design, data, and engineering. Read 1-2 of the resources below and note 3 differences between startup and big-tech PM work.",
            resources: [
              { label: "Lenny's Newsletter — What is Product Management", url: "https://www.lennysnewsletter.com/p/what-is-product-management" },
              { label: "Reforge — The PM Career Path", url: "https://www.reforge.com/blog" },
              { label: "Silicon Valley Product Group — Good Product Team / Bad Product Team", url: "https://www.svpg.com/good-product-team-bad-product-team/" },
            ],
          },
          {
            id: "w1d1-t2",
            title: "Task: Map your target companies",
            type: "task",
            description:
              "List 10 consumer/growth companies you'd want to work at. For each, write 1 sentence on what their growth loop looks like (referral, content, paid, viral, etc.)",
          },
        ],
      },
      {
        day: 2,
        title: "Core frameworks: JTBD & RICE",
        tasks: [
          {
            id: "w1d2-t1",
            title: "Lesson: Jobs To Be Done",
            type: "lesson",
            description:
              "Jobs To Be Done reframes products around progress, not features. The core idea (from Clayton Christensen's milkshake study): people 'hire' a product to make progress in a specific situation. Every job has three dimensions — functional (the practical task: 'help me track my spending'), emotional (how the user wants to feel: 'in control, not anxious'), and social (how they want to be perceived: 'responsible'). Great consumer products nail all three. When you do competitive analysis or write a PRD later in this bootcamp, JTBD helps you ask 'what job is this replacing or improving?' instead of just listing features.",
            resources: [
              { label: "Clayton Christensen — Milkshake Marketing (HBR)", url: "https://hbswk.hbs.edu/item/clay-christensen-milkshake-marketing" },
              { label: "JTBD.info — Primer", url: "https://jtbd.info" },
            ],
          },
          {
            id: "w1d2-t2",
            title: "Lesson: RICE prioritization",
            type: "lesson",
            description:
              "RICE is a simple scoring model for ranking competing ideas: Reach (how many users does this affect per quarter?), Impact (how much will it move the needle — score 0.25/0.5/1/2/3 for minimal to massive), Confidence (how sure are you, as a %, given your evidence), and Effort (person-months/weeks to build). The formula is (Reach × Impact × Confidence) ÷ Effort. The output isn't gospel — it's a forcing function that makes your assumptions explicit and comparable, and gives you a defensible answer when someone asks 'why are we building X instead of Y?'",
            resources: [
              { label: "Intercom — RICE Scoring Model", url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/" },
            ],
          },
          {
            id: "w1d2-t3",
            title: "Task: JTBD interview yourself",
            type: "task",
            description:
              "Pick an app you use daily (e.g. Spotify, Instagram). Write out the functional, emotional, and social 'job' it's doing for you.",
          },
        ],
      },
      {
        day: 3,
        title: "Growth metrics 101: AARRR",
        tasks: [
          {
            id: "w1d3-t1",
            title: "Lesson: The Pirate Metrics (AARRR)",
            type: "lesson",
            description:
              "AARRR ('pirate metrics', coined by Dave McClure) breaks the user lifecycle into five stages: Acquisition (how do people find you?), Activation (do they have a great first experience — the 'aha moment'?), Retention (do they come back?), Referral (do they tell others?), Revenue (do they pay, directly or indirectly?). Most consumer apps lose the majority of users at Activation or early Retention — not Acquisition. As a growth PM, your first job is usually to find the biggest leak in this funnel, not to drive more top-of-funnel traffic into a leaky bucket.",
            resources: [
              { label: "ProductPlan — AARRR Framework Guide", url: "https://www.productplan.com/glossary/aarrr-metrics-model/" },
              { label: "Andrew Chen — Activation & Retention basics", url: "https://andrewchen.com/new-to-andrews-blog-heres-what-to-read/" },
            ],
          },
          {
            id: "w1d3-t2",
            title: "Task: Funnel-map a consumer app",
            type: "task",
            description:
              "Pick a consumer app and write out what you THINK their AARRR funnel looks like, with rough numbers/guesses for each stage.",
          },
        ],
      },
      {
        day: 4,
        title: "User research basics",
        tasks: [
          {
            id: "w1d4-t1",
            title: "Lesson: Qualitative vs quantitative research",
            type: "lesson",
            description:
              "Quant tells you WHAT is happening at scale (e.g. '30% of users drop off at step 3'); qual tells you WHY (e.g. 'they don't understand what step 3 is for'). Use surveys/analytics when you need statistical confidence across a large population; use interviews when you need depth and don't yet know what questions to ask. The biggest interview pitfall is the leading question — 'Would you find a feature that does X useful?' almost always gets a polite 'yes.' Better: ask about past behavior ('tell me about the last time you tried to do X') rather than hypothetical future behavior.",
            resources: [
              { label: "NN/g — Qualitative vs Quantitative UX Research", url: "https://www.nngroup.com/articles/quant-vs-qual/" },
              { label: "The Mom Test (concept summary)", url: "https://www.momtestbook.com/" },
            ],
          },
          {
            id: "w1d4-t2",
            title: "Task: Write a 5-question user interview script",
            type: "task",
            description:
              "Write 5 open-ended, non-leading interview questions for understanding why people use (or stopped using) a habit-forming app like a fitness or budgeting app.",
          },
        ],
      },
      {
        day: 5,
        title: "Synthesize: Your PM Operating Philosophy",
        tasks: [
          {
            id: "w1d5-t1",
            title: "Deliverable: PM Operating Philosophy doc",
            type: "deliverable",
            description:
              "Write a 1-page doc covering: (1) what kind of PM you want to be, (2) the 3 frameworks from this week and how you'll use them, (3) one app you'll use as your 'practice subject' for the rest of the bootcamp.",
          },
          {
            id: "w1d5-t2",
            title: "Advanced Challenge: Define your AI-native PM thesis",
            type: "challenge",
            description:
              "You've already shipped LLM-powered conversational features (mySet's Claude-based discovery assistant). Write a half-page thesis: what does 'AI-native product management' mean beyond 'add a chatbot'? Cover at least: how AI changes the discovery/activation funnel (not just adds a feature), what new metrics matter for AI features (e.g. task completion rate, trust/accuracy, fallback-to-human rate), and one example from your own experience where AI changed user behavior in a measurable way. This becomes the opening framing for your portfolio.",
          },
        ],
      },
    ],
  },
  {
    week: 2,
    theme: "User Research",
    goal: "Practice running real research: interviews, surveys, and persona-building.",
    portfolioDeliverable: "1 user research summary with 3 real interviews + persona",
    days: [
      {
        day: 6,
        title: "Recruiting & running interviews",
        tasks: [
          {
            id: "w2d1-t1",
            title: "Lesson: How to recruit interview subjects",
            type: "lesson",
            description:
              "Recruiting doesn't need a research panel. Your fastest options: friends/family who use your practice app (easiest, but watch for bias), niche subreddits or Discord communities for that app, or a short post on LinkedIn/Twitter offering a $10 gift card for 15 minutes. Aim for users with real, recent experience — not people doing you a favor with no context. Structure each call as: 2 min warm-up/context, 10 min open questions about their behavior and pain points, 3 min wrap-up ('anything else that's been frustrating?'). Always ask permission to take notes.",
            resources: [
              { label: "User Interviews — How to recruit participants", url: "https://www.userinterviews.com/blog/how-to-recruit-participants-for-user-research" },
            ],
          },
          {
            id: "w2d1-t2",
            title: "Task: Recruit 3 people for interviews",
            type: "task",
            description:
              "Using your practice app from Week 1, find and schedule (or message) 3 people who use it - ask if they'll do a 15 min chat about their experience.",
          },
        ],
      },
      {
        day: 7,
        title: "Conduct interview #1",
        tasks: [
          {
            id: "w2d2-t1",
            title: "Task: Run interview 1 + take notes",
            type: "task",
            description:
              "Conduct your first interview using the script from Week 1. Take verbatim notes - capture quotes, not just summaries.",
          },
          {
            id: "w2d2-t2",
            title: "Lesson: Active listening & follow-up questions",
            type: "lesson",
            description:
              "The single highest-value interview move is silence followed by 'tell me more about that.' When someone mentions a frustration, resist jumping to solutions — dig into the root cause first using the 5 Whys (keep asking 'why' until you hit something emotional or structural, usually 3-5 levels deep). Example: 'I deleted the app' → why? 'too many notifications' → why did that bother you? 'I felt like I was being sold to' → why does that matter? '...I don't trust the company.' That's a much more useful insight than 'reduce notifications.'",
            resources: [
              { label: "NN/g — The 5 Whys", url: "https://www.nngroup.com/articles/five-whys-process/" },
            ],
          },
        ],
      },
      {
        day: 8,
        title: "Conduct interviews #2-3",
        tasks: [
          {
            id: "w2d3-t1",
            title: "Task: Run interviews 2 and 3",
            type: "task",
            description: "Complete your remaining 2 interviews. Note patterns and differences vs interview 1.",
          },
        ],
      },
      {
        day: 9,
        title: "Affinity mapping & persona creation",
        tasks: [
          {
            id: "w2d4-t1",
            title: "Lesson: Affinity mapping",
            type: "lesson",
            description:
              "Affinity mapping turns messy interview notes into patterns you can act on. Write each notable quote or observation on its own sticky note (FigJam, Miro, or even a spreadsheet row). Spread them out, then group notes that feel related — themes will emerge organically, like 'confusion during onboarding' or 'distrust around notifications.' Don't force categories upfront; let them surface. Once grouped, name each cluster and count how many of your 3 interviewees mentioned it — even with 3 people, if all 3 hit the same theme, that's a strong signal.",
            resources: [
              { label: "NN/g — Affinity Diagramming", url: "https://www.nngroup.com/articles/affinity-diagram/" },
            ],
          },
          {
            id: "w2d4-t2",
            title: "Task: Build a user persona",
            type: "task",
            description:
              "Using your interview notes, build a 1-page persona: name, goals, frustrations, a representative quote, and 2-3 needs the product should address.",
          },
        ],
      },
      {
        day: 10,
        title: "Synthesize: Research summary",
        tasks: [
          {
            id: "w2d5-t1",
            title: "Deliverable: User Research Summary",
            type: "deliverable",
            description:
              "Combine your interviews, affinity map, and persona into a 1-2 page research summary doc. Include: methodology, key findings (3-5), persona, and 2 recommendations.",
          },
          {
            id: "w2d5-t2",
            title: "Advanced Challenge: Research the 'trust gap' in AI features",
            type: "challenge",
            description:
              "Add a section to your research summary specifically probing how your interviewees feel about AI-driven recommendations or chat assistants in apps they use (even if your practice app doesn't have one). Ask: do they trust AI suggestions less than human ones, and why? What would make them trust an AI recommendation more (e.g. showing sources, confidence levels, a 'why am I seeing this' explanation)? This is exactly the kind of insight that informs AI feature design — and most candidates won't have it.",
          },
        ],
      },
    ],
  },
  {
    week: 3,
    theme: "Product Sense & Strategy",
    goal: "Practice writing PRDs and developing product strategy / vision documents.",
    portfolioDeliverable: "A 1-page PRD for a new feature",
    days: [
      {
        day: 11,
        title: "What makes a good PRD",
        tasks: [
          {
            id: "w3d1-t1",
            title: "Lesson: PRD anatomy",
            type: "lesson",
            description:
              "A good PRD answers 'what are we building and why' so clearly that an engineer, designer, and exec could each read it and know what to do next. Core sections: Problem statement (the user pain, backed by evidence — not 'we should build X'), Goals & Non-goals (non-goals prevent scope creep — explicitly say what's out of bounds), User stories (who needs what and why), Success metrics (how you'll know it worked), Requirements (functional specs, often split must-have vs nice-to-have), and Open questions (unresolved decisions — writing these down builds trust, it doesn't look like weakness). Keep it to 1 page; longer PRDs get skimmed, not read.",
            resources: [
              { label: "ProductPlan — PRD Template & Guide", url: "https://www.productplan.com/glossary/product-requirements-document/" },
              { label: "Atlassian — How to write a PRD", url: "https://www.atlassian.com/agile/product-management/requirements" },
            ],
          },
          {
            id: "w3d1-t2",
            title: "Task: Identify a feature gap",
            type: "task",
            description:
              "Using your practice app + Week 2 research, identify ONE feature gap or improvement opportunity. Write a 2-sentence problem statement.",
          },
          {
            id: "w3d1-t3",
            title: "Lesson: What's different about an LLM-feature PRD",
            type: "lesson",
            description:
              "A PRD for an AI-powered feature needs everything a normal PRD has, plus three things traditional PRDs don't cover. First, a behavior spec for the non-deterministic parts — since outputs vary, define the boundaries of acceptable responses (tone, length, what it should never say) rather than exact outputs. Second, an evaluation plan — how will you measure quality before and after launch (golden test sets, human eval rubrics, automated checks for hallucination/refusals)? Third, a fallback/escalation design — what happens when the model is wrong, unsure, or the user is frustrated (hand off to search, human support, or a simpler deterministic flow)? You've built this in practice with mySet's Claude-based discovery assistant — this lesson formalizes that into a repeatable PRD structure.",
            resources: [
              { label: "Anthropic — Building Effective AI Agents", url: "https://www.anthropic.com/research/building-effective-agents" },
              { label: "Eugene Yan — Evaluating LLM Applications", url: "https://eugeneyan.com/writing/llm-patterns/" },
            ],
          },
        ],
      },
      {
        day: 12,
        title: "Writing user stories & success metrics",
        tasks: [
          {
            id: "w3d2-t1",
            title: "Lesson: User stories & acceptance criteria",
            type: "lesson",
            description:
              "The format 'As a [type of user], I want to [do something], so that [benefit]' forces you to justify every requirement in terms of user value, not just functionality. The 'so that' clause is the part most people skip — but it's what lets engineers make smart tradeoffs when edge cases come up. Acceptance criteria turn each story into something testable: 'Given [context], when [action], then [expected result].' If you can't write acceptance criteria for a story, the story is probably too vague to build.",
            resources: [
              { label: "Atlassian — User Stories with Examples", url: "https://www.atlassian.com/agile/project-management/user-stories" },
            ],
          },
          {
            id: "w3d2-t2",
            title: "Task: Write 3-5 user stories + success metrics",
            type: "task",
            description:
              "For your feature idea from Day 11, write 3-5 user stories and define 2-3 success metrics (how you'd know it worked).",
          },
        ],
      },
      {
        day: 13,
        title: "Competitive analysis",
        tasks: [
          {
            id: "w3d3-t1",
            title: "Lesson: Competitive teardown framework",
            type: "lesson",
            description:
              "Feature-by-feature comparison tables are table stakes — the real insight is in positioning and strategy. For each competitor, ask: who are they trying to win (their target user might differ from yours), how do they make money (subscription, ads, transaction fees — this shapes what they'll prioritize), and what bet are they making with their roadmap? Two competitors can solve the 'same' problem in opposite ways because they're optimizing for different things (e.g. one prioritizes simplicity for casual users, another prioritizes power-features for retention of heavy users). Identify the bet, not just the feature.",
            resources: [
              { label: "Lenny's Newsletter — How to do competitive analysis", url: "https://www.lennysnewsletter.com" },
            ],
          },
          {
            id: "w3d3-t2",
            title: "Task: Teardown 2 competitors",
            type: "task",
            description:
              "Pick 2 apps that compete with your practice app on the feature you identified. Compare their approaches in a table.",
          },
        ],
      },
      {
        day: 14,
        title: "Drafting the PRD",
        tasks: [
          {
            id: "w3d4-t1",
            title: "Task: Draft full PRD",
            type: "task",
            description:
              "Combine everything from this week into a full 1-page PRD: problem, goals/non-goals, user stories, success metrics, requirements, open questions.",
          },
        ],
      },
      {
        day: 15,
        title: "Synthesize: Polish & publish PRD",
        tasks: [
          {
            id: "w3d5-t1",
            title: "Deliverable: Published PRD",
            type: "deliverable",
            description:
              "Polish your PRD for portfolio-readiness. Add a short intro paragraph explaining the context (your research from Week 2 informed this).",
          },
          {
            id: "w3d5-t2",
            title: "Advanced Challenge: Write a second PRD for an AI-powered feature",
            type: "challenge",
            description:
              "Write a second, shorter PRD (can be 1 page) for an AI-powered version of your feature idea — e.g. instead of a static filter/search UI, a conversational assistant that helps users find what they need. Include the three LLM-specific sections from Day 11: behavior boundaries (what it should/shouldn't do), an evaluation plan (how would you build a golden test set of 10-15 example queries with expected good/bad responses?), and a fallback design. Draw directly on what you built at mySet — this PRD should feel like it's informed by real shipping experience, not theory.",
          },
        ],
      },
    ],
  },
  {
    week: 4,
    theme: "UX Audit & Design Literacy (Figma)",
    goal: "Build comfort in Figma and practice critiquing UX using heuristics.",
    portfolioDeliverable: "A full UX audit of a consumer app with Figma annotations",
    days: [
      {
        day: 16,
        title: "Figma basics for PMs",
        tasks: [
          {
            id: "w4d1-t1",
            title: "Lesson: Figma fundamentals",
            type: "lesson",
            description:
              "As a PM, you don't need to design from scratch — you need to navigate Figma confidently. Key concepts: Frames are containers (like artboards) that represent screens. Components are reusable elements (buttons, cards) — recognizing when something is a component vs a one-off helps you understand design systems. Comments let you leave feedback pinned to a specific spot, which is how PMs typically collaborate with designers. Auto Layout makes elements resize responsively — useful when duplicating/editing. Spend time just clicking around an existing public Figma file before building anything.",
            resources: [
              { label: "Figma — Getting Started Guide", url: "https://www.figma.com/resources/learn-design/" },
              { label: "Figma — Auto Layout basics", url: "https://www.figma.com/best-practices/everything-you-need-to-know-about-layout-grids/" },
            ],
          },
          {
            id: "w4d1-t2",
            title: "Task: Recreate a screen in Figma",
            type: "task",
            description:
              "Take a screenshot of a screen from your practice app and recreate the basic layout in Figma using frames and rectangles (doesn't need to be pixel perfect).",
          },
        ],
      },
      {
        day: 17,
        title: "Nielsen's 10 usability heuristics",
        tasks: [
          {
            id: "w4d2-t1",
            title: "Lesson: Nielsen heuristics",
            type: "lesson",
            description:
              "Jakob Nielsen's 10 heuristics are a 30-year-old checklist that's still the fastest way to spot usability problems in any interface. The ones most relevant for consumer apps: (1) Visibility of system status — does the app show loading/progress states? (2) Match real-world conventions — does it use familiar icons/patterns? (3) User control & freedom — can users undo/exit easily? (4) Consistency — do similar actions look and behave the same throughout? (5) Error prevention — does it stop mistakes before they happen, or just show errors after? (6) Recognition over recall — does the user need to remember things, or is everything visible? Memorize these 6 first; they catch most issues.",
            resources: [
              { label: "NN/g — 10 Usability Heuristics", url: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
            ],
          },
          {
            id: "w4d2-t2",
            title: "Task: Heuristic walkthrough",
            type: "task",
            description:
              "Pick a flow in your practice app (e.g. onboarding, checkout). Go through it screen by screen and note which heuristics are followed/violated.",
          },
        ],
      },
      {
        day: 18,
        title: "Annotating screenshots in Figma",
        tasks: [
          {
            id: "w4d3-t1",
            title: "Lesson: Annotation best practices",
            type: "lesson",
            description:
              "Good design feedback is structured so a designer can act on it without a meeting. Use numbered callouts (1, 2, 3...) placed directly on the screenshot, pointing to the specific element. For each, write: what's wrong (1 sentence), which heuristic it violates, severity (Critical = blocks task completion, Medium = causes confusion/friction, Low = minor polish), and why it matters (impact on the user or business metric). Avoid vague feedback like 'this feels off' — be specific: 'the CTA button color matches the disabled-state gray used elsewhere, so users may think it's inactive (violates Heuristic #6, Medium severity).'",
            resources: [
              { label: "NN/g — Severity Ratings for Usability Problems", url: "https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/" },
            ],
          },
          {
            id: "w4d3-t2",
            title: "Task: Annotate 3-5 screens in Figma",
            type: "task",
            description:
              "Import screenshots of your practice app into Figma. Add numbered annotations for usability issues found in Day 17, with severity tags.",
          },
        ],
      },
      {
        day: 19,
        title: "Proposing fixes",
        tasks: [
          {
            id: "w4d4-t1",
            title: "Task: Sketch proposed fixes",
            type: "task",
            description:
              "For your top 3 issues, sketch a rough 'after' version in Figma (low-fidelity is fine) showing how you'd fix each one.",
          },
        ],
      },
      {
        day: 20,
        title: "Synthesize: Full UX audit",
        tasks: [
          {
            id: "w4d5-t1",
            title: "Deliverable: UX Audit Report",
            type: "deliverable",
            description:
              "Compile into a UX audit report: intro, methodology (heuristics used), 3-5 findings with annotated screenshots, severity ratings, and proposed fixes with sketches.",
          },
          {
            id: "w4d5-t2",
            title: "Advanced Challenge: Audit an AI chat/assistant interface",
            type: "challenge",
            description:
              "Pick an app with an AI chat or recommendation interface (ChatGPT, Perplexity, a shopping app's 'AI assistant,' or your practice app if it has one). Apply Nielsen heuristics PLUS three AI-specific heuristics: (1) Does it show *why* it's making a suggestion (transparency)? (2) Is there a clear, low-friction way to correct it when it's wrong (recoverability)? (3) Does it set expectations about what it can/can't do (calibrated trust)? Annotate 2-3 screens in Figma with these AI-specific findings — this is a UX skillset most PMs haven't developed yet.",
            resources: [
              { label: "Google PAIR — People + AI Guidebook", url: "https://pair.withgoogle.com/guidebook" },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 5,
    theme: "Metrics & Analytics",
    goal: "Get comfortable with the metrics PMs live in: funnels, retention curves, and basic SQL.",
    portfolioDeliverable: "A metrics dashboard mockup with defined KPIs",
    days: [
      {
        day: 21,
        title: "North star metrics & KPI trees",
        tasks: [
          {
            id: "w5d1-t1",
            title: "Lesson: North star metrics & KPI trees",
            type: "lesson",
            description:
              "A north star metric (NSM) is the single number that best captures the value your product delivers to users — and that correlates with long-term business success. Good examples: Spotify's 'time spent listening,' Airbnb's 'nights booked.' A bad NSM is a vanity metric (total signups) that doesn't reflect ongoing value. Once you have an NSM, build a KPI tree below it — 3-5 metrics that, if improved, would move the NSM. Each input metric should be ownable by a specific team (e.g. 'onboarding completion rate' is ownable by the activation team). This is how growth orgs assign accountability without everyone chasing the same vague goal.",
            resources: [
              { label: "Amplitude — North Star Metric Guide", url: "https://amplitude.com/blog/north-star-metric" },
              { label: "Reforge — Building a Growth Model", url: "https://www.reforge.com/blog" },
            ],
          },
          {
            id: "w5d1-t2",
            title: "Task: Build a KPI tree for your practice app",
            type: "task",
            description:
              "Propose a north star metric for your practice app and break it into 3-5 input metrics in a simple tree diagram.",
          },
        ],
      },
      {
        day: 22,
        title: "Retention curves & cohorts",
        tasks: [
          {
            id: "w5d2-t1",
            title: "Lesson: Retention curves & cohort analysis",
            type: "lesson",
            description:
              "A retention curve plots % of users still active on Day 1, 7, 14, 30, etc. after signup. Most curves decline sharply then flatten — the 'smile curve' (or more accurately, an asymptote) is when the curve stabilizes above zero, meaning you've found a core group of users who stick around long-term. If the curve keeps declining toward zero, you have a leaky bucket no amount of acquisition will fix. A cohort is a group of users who started on the same date — comparing cohorts over time (Jan signups vs Feb signups) shows whether retention is improving as you ship changes. Averages hide this: a flat 'average DAU' can mask a shrinking core user base offset by new signups.",
            resources: [
              { label: "Reforge — Retention Curves Explained", url: "https://www.reforge.com/blog" },
              { label: "Lenny's Newsletter — Retention basics", url: "https://www.lennysnewsletter.com" },
            ],
          },
          {
            id: "w5d2-t2",
            title: "Task: Sketch a retention curve hypothesis",
            type: "task",
            description:
              "Sketch (by hand or in a spreadsheet) what you think your practice app's Day 1/7/30 retention curve looks like, and what would need to be true for it to look 'good.'",
          },
        ],
      },
      {
        day: 23,
        title: "SQL basics for PMs",
        tasks: [
          {
            id: "w5d3-t1",
            title: "Lesson: SQL fundamentals (SELECT, WHERE, GROUP BY, JOIN)",
            type: "lesson",
            description:
              "PMs who can self-serve data move faster and ask sharper questions. Four commands cover most day-to-day needs: SELECT (which columns you want), WHERE (filter rows — e.g. WHERE country = 'US'), GROUP BY (aggregate — e.g. count of signups per day), and JOIN (combine data from two tables, e.g. users + their events). A realistic PM query: 'SELECT date, COUNT(user_id) FROM events WHERE event_name = \\'completed_onboarding\\' GROUP BY date' — this answers 'how many users completed onboarding each day?' without needing an analyst. Practice on a free sandbox; the syntax sticks fastest by writing it yourself.",
            resources: [
              { label: "Mode Analytics — SQL Tutorial", url: "https://mode.com/sql-tutorial/" },
              { label: "SQLZoo — Interactive Practice", url: "https://sqlzoo.net/" },
            ],
          },
          {
            id: "w5d3-t2",
            title: "Task: Write 3 practice SQL queries",
            type: "task",
            description:
              "Using a free SQL practice tool (e.g. SQLZoo, Mode SQL tutorial), write 3 queries: total count with a filter, group by with count, and a simple join.",
          },
        ],
      },
      {
        day: 24,
        title: "Designing a metrics dashboard",
        tasks: [
          {
            id: "w5d4-t1",
            title: "Task: Design a dashboard mockup",
            type: "task",
            description:
              "In Figma or a spreadsheet, design a mockup of a metrics dashboard for your practice app - include north star, 3-4 input metrics, and retention chart placeholder.",
          },
        ],
      },
      {
        day: 25,
        title: "Synthesize: Metrics framework doc",
        tasks: [
          {
            id: "w5d5-t1",
            title: "Deliverable: Metrics Framework + Dashboard",
            type: "deliverable",
            description:
              "Combine your KPI tree, retention hypothesis, and dashboard mockup into a 'Metrics Framework' doc explaining how you'd measure success for your practice app.",
          },
          {
            id: "w5d5-t2",
            title: "Advanced Challenge: Design an AI feature scorecard",
            type: "challenge",
            description:
              "Add a section to your metrics framework specifically for AI features: define a scorecard with (1) quality metrics — e.g. task completion rate, response relevance (could be human-rated 1-5 on a sample), hallucination/error rate on a golden test set; (2) trust metrics — e.g. % of users who edit/reject AI suggestions, fallback-to-manual rate; (3) business metrics — does the AI feature move your north star (e.g. conversion, time-to-value)? Most teams only track #3 — having a framework for all three is a differentiator. Reference how you'd have measured this for mySet's AI discovery assistant.",
            resources: [
              { label: "Hamel Husain — Evals are All You Need", url: "https://hamel.dev/blog/posts/evals/" },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 6,
    theme: "Growth Frameworks & Experimentation",
    goal: "Learn how growth PMs design experiments and think about A/B testing.",
    portfolioDeliverable: "An experiment design doc (hypothesis + A/B test plan)",
    days: [
      {
        day: 26,
        title: "Growth loops vs funnels",
        tasks: [
          {
            id: "w6d1-t1",
            title: "Lesson: Growth loops",
            type: "lesson",
            description:
              "A funnel is linear: input → output, end of story. A growth loop is circular: the output of one cycle becomes the input for the next, compounding over time. Common loop types: referral loops (existing users invite new users, e.g. Dropbox's extra storage for referrals), content loops (user-generated content gets indexed/shared, drawing in new users, e.g. Pinterest, TikTok), and paid loops (revenue from users funds ads that acquire more users, viable when LTV > CAC with margin). The key question for a growth PM: where does this loop leak, and what's the smallest change that increases the 'conversion rate' of one step in the loop?",
            resources: [
              { label: "Reforge — Growth Loops vs Funnels", url: "https://www.reforge.com/blog" },
              { label: "Brian Balfour — The Never Ending Game of Growth", url: "https://brianbalfour.com/essays" },
            ],
          },
          {
            id: "w6d1-t2",
            title: "Task: Diagram your practice app's growth loop",
            type: "task",
            description:
              "Draw (in Figma or on paper) the growth loop you believe drives your practice app's user acquisition.",
          },
        ],
      },
      {
        day: 27,
        title: "Forming hypotheses",
        tasks: [
          {
            id: "w6d2-t1",
            title: "Lesson: Hypothesis-driven thinking",
            type: "lesson",
            description:
              "The hypothesis format — 'If we [change], then [metric] will [increase/decrease], because [underlying reason], measured by [specific metric/method]' — forces three things: a testable change (not vague), a causal mechanism (so you learn something even if you're wrong), and a way to measure success before you build. Weak hypothesis: 'Adding social proof will help.' Strong: 'If we show \"12,000 people completed this today\" on the signup screen, signup completion rate will increase by 5%+ because social proof reduces hesitation for new users, measured by completion rate in the signup funnel over 2 weeks.'",
            resources: [
              { label: "Reforge — Writing Strong Hypotheses", url: "https://www.reforge.com/blog" },
            ],
          },
          {
            id: "w6d2-t2",
            title: "Task: Write 3 growth hypotheses",
            type: "task",
            description:
              "Using your growth loop from Day 26, write 3 hypotheses for changes that could strengthen the weakest part of the loop.",
          },
        ],
      },
      {
        day: 28,
        title: "A/B testing fundamentals",
        tasks: [
          {
            id: "w6d3-t1",
            title: "Lesson: A/B testing basics",
            type: "lesson",
            description:
              "In an A/B test, users are randomly split between control (current experience) and variant (your change). Statistical significance (commonly p < 0.05) tells you whether a difference is likely real vs random noise — but you need enough sample size to detect the effect you expect; small effects on low-traffic features may take weeks to reach significance. Guardrail metrics are things that shouldn't get worse even if your primary metric improves (e.g. a change that boosts signups but tanks retention is a bad trade). The two most common mistakes: peeking at results early and stopping as soon as it 'looks significant' (this inflates false positives), and running too many variants at once, which splits your sample size and slows everything down.",
            resources: [
              { label: "CXL — A/B Testing Statistics Guide", url: "https://cxl.com/blog/ab-testing-statistics/" },
              { label: "Airbnb Engineering — Experimentation Platform", url: "https://medium.com/airbnb-engineering" },
            ],
          },
          {
            id: "w6d3-t2",
            title: "Task: Design an A/B test",
            type: "task",
            description:
              "Pick your top hypothesis from Day 27. Design the A/B test: control vs variant, primary metric, guardrail metrics, and rough sample size needed.",
          },
        ],
      },
      {
        day: 29,
        title: "Reading experiment results",
        tasks: [
          {
            id: "w6d4-t1",
            title: "Lesson: Interpreting results & making ship decisions",
            type: "lesson",
            description:
              "Reading a results readout is rarely a clean 'it worked' or 'it didn't.' Common scenarios: (1) Primary metric significant and positive, guardrails flat → ship it. (2) Primary metric positive but a guardrail metric (e.g. retention, revenue per user) is negative → this is the hard case; you weigh the size of each effect and whether the guardrail regression is acceptable or a dealbreaker. (3) Not statistically significant → don't conclude 'it doesn't work,' conclude 'we don't have enough evidence yet' — you may need more time/traffic, or the effect may genuinely be too small to matter. Document your reasoning, not just the decision — that's what builds trust with stakeholders over time.",
            resources: [
              { label: "Lenny's Newsletter — How to read experiment results", url: "https://www.lennysnewsletter.com" },
            ],
          },
          {
            id: "w6d4-t2",
            title: "Task: Write a mock results readout",
            type: "task",
            description:
              "Write a fictional results readout for your A/B test from Day 28 (made-up numbers), including a ship/no-ship recommendation with reasoning.",
          },
        ],
      },
      {
        day: 30,
        title: "Synthesize: Experiment design doc",
        tasks: [
          {
            id: "w6d5-t1",
            title: "Deliverable: Experiment Design Doc",
            type: "deliverable",
            description:
              "Combine hypothesis, growth loop diagram, A/B test design, and mock readout into a single experiment design doc.",
          },
          {
            id: "w6d5-t2",
            title: "Advanced Challenge: Design a prompt/model experiment",
            type: "challenge",
            description:
              "Classic A/B testing assumes a deterministic change. For AI features, you're often testing prompts, model versions, or retrieval strategies — where outputs vary even within a 'variant.' Design an experiment for an AI feature (e.g. two different system prompts for a conversational assistant): define what you'd hold in a fixed evaluation set (so you can compare quality offline before any user sees it), what you'd A/B test live (user-facing metrics once you've cleared an offline quality bar), and how 'guardrails' differ — e.g. a guardrail might be 'refusal rate doesn't increase' or 'response length stays within X tokens.' This two-stage approach (offline eval → online A/B) is how mature AI teams ship model/prompt changes safely.",
            resources: [
              { label: "Anthropic — Building Effective Agents (evaluation section)", url: "https://www.anthropic.com/research/building-effective-agents" },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 7,
    theme: "Roadmapping & Prioritization",
    goal: "Practice prioritization frameworks and stakeholder communication.",
    portfolioDeliverable: "A quarterly roadmap with prioritization rationale",
    days: [
      {
        day: 31,
        title: "Prioritization frameworks",
        tasks: [
          {
            id: "w7d1-t1",
            title: "Lesson: RICE, MoSCoW, and tradeoffs",
            type: "lesson",
            description:
              "RICE is great for ranking internally — it gives you a defensible number. But in a room with stakeholders, raw scores can feel arbitrary or spark debate over decimals. MoSCoW (Must have, Should have, Could have, Won't have this time) is a complementary framework for that conversation: it buckets items by necessity rather than precise score, which is easier for non-PMs to engage with. A common pattern: use RICE to do your own ranking, then translate the top items into 'Must/Should' and the bottom into 'Could/Won't' when presenting to stakeholders — translating data into a shared vocabulary is itself a PM skill.",
            resources: [
              { label: "ProductPlan — MoSCoW Method", url: "https://www.productplan.com/glossary/moscow-prioritization/" },
            ],
          },
          {
            id: "w7d1-t2",
            title: "Task: Brainstorm a feature backlog",
            type: "task",
            description:
              "Brainstorm 8-10 feature ideas for your practice app (mix of small fixes and big bets) based on everything you've learned so far.",
          },
        ],
      },
      {
        day: 32,
        title: "Scoring your backlog",
        tasks: [
          {
            id: "w7d2-t1",
            title: "Task: RICE-score your backlog",
            type: "task",
            description:
              "Score each of your 8-10 features using RICE. Build a simple spreadsheet and sort by score.",
          },
        ],
      },
      {
        day: 33,
        title: "Building a roadmap",
        tasks: [
          {
            id: "w7d3-t1",
            title: "Lesson: Now/Next/Later roadmaps",
            type: "lesson",
            description:
              "Date-based roadmaps ('Feature X ships March 15') create a trap: dates get treated as commitments, and missing them erodes trust even when the delay was reasonable (e.g. you learned something in user testing that changed scope). Now/Next/Later roadmaps communicate relative priority without false precision: Now = actively being built/refined, Next = scoped and queued, Later = directionally important but not yet detailed. This format also makes it easier to reshuffle when priorities change — moving something from Next to Later isn't 'breaking a promise,' it's normal roadmap hygiene. Date-based roadmaps can still work for hard external deadlines (e.g. a contractual integration) — but those should be the exception, not the default.",
            resources: [
              { label: "ProductPlan — Now/Next/Later Roadmaps", url: "https://www.productplan.com/learn/now-next-later-roadmap/" },
            ],
          },
          {
            id: "w7d3-t2",
            title: "Task: Build a Now/Next/Later roadmap",
            type: "task",
            description:
              "Organize your RICE-scored backlog into a Now/Next/Later roadmap for the next quarter.",
          },
        ],
      },
      {
        day: 34,
        title: "Communicating tradeoffs to stakeholders",
        tasks: [
          {
            id: "w7d4-t1",
            title: "Lesson: Saying no without saying no",
            type: "lesson",
            description:
              "Stakeholders rarely need a flat 'no' — they need to feel heard and understand the tradeoff. The reframe: 'not now' instead of 'no,' paired with the reasoning. Structure: (1) acknowledge the request and why it matters to them, (2) explain what it would displace (be specific — 'this would push back the onboarding redesign by 3 weeks'), (3) state where it sits on the roadmap and what would change its priority (e.g. 'if we see churn data showing this is the top driver, we'd revisit'). This shows you've actually considered it — most pushback comes from people feeling dismissed, not from disagreement with the logic itself.",
            resources: [
              { label: "Lenny's Newsletter — Saying No as a PM", url: "https://www.lennysnewsletter.com" },
            ],
          },
          {
            id: "w7d4-t2",
            title: "Task: Write a roadmap announcement",
            type: "task",
            description:
              "Write a short stakeholder-facing message announcing your roadmap, including 1-2 sentences on why something was NOT prioritized.",
          },
        ],
      },
      {
        day: 35,
        title: "Synthesize: Final roadmap doc",
        tasks: [
          {
            id: "w7d5-t1",
            title: "Deliverable: Quarterly Roadmap",
            type: "deliverable",
            description:
              "Compile your RICE scoring, Now/Next/Later roadmap, and stakeholder announcement into one polished roadmap doc.",
          },
          {
            id: "w7d5-t2",
            title: "Advanced Challenge: Add an 'AI capability' lane to your roadmap",
            type: "challenge",
            description:
              "Add a parallel lane to your Now/Next/Later roadmap specifically for AI capabilities — e.g. Now: ship a basic AI assistant with a narrow scope and strong fallbacks; Next: expand scope based on eval data from Now, add personalization; Later: proactive AI suggestions (the assistant reaches out, vs. only responding). Write 2-3 sentences on why AI roadmaps often need a 'crawl-walk-run' structure more explicitly than traditional features — narrow scope first lets you build trust and gather real usage data before expanding capability, since AI failure modes are often only visible at scale.",
          },
        ],
      },
    ],
  },
  {
    week: 8,
    theme: "Technical Fluency",
    goal: "Build confidence working with engineers: APIs, agile ceremonies, and writing technical specs.",
    portfolioDeliverable: "A technical spec / engineering handoff doc",
    days: [
      {
        day: 36,
        title: "How APIs work (PM-level)",
        tasks: [
          {
            id: "w8d1-t1",
            title: "Lesson: APIs explained for PMs",
            type: "lesson",
            description:
              "An API is a contract: your app sends a request (e.g. 'give me this user's order history') to another system, and gets back a response (usually structured data in JSON). For PMs, the practical implications: every integration or third-party data source involves an API, and APIs have constraints — rate limits (how many requests per minute), required fields (you can't get data the API doesn't expose), and latency (response time, which affects perceived speed). When scoping a feature that 'just needs to pull data from X,' check the API docs first — sometimes the data you assumed was available simply isn't exposed, which changes your entire approach.",
            resources: [
              { label: "freeCodeCamp — APIs Explained Simply", url: "https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/" },
              { label: "Postman — API Fundamentals", url: "https://learning.postman.com/docs/introduction/overview/" },
            ],
          },
          {
            id: "w8d1-t2",
            title: "Task: Find and read an API doc",
            type: "task",
            description:
              "Find the public API documentation for your practice app (or a similar one) and identify 3 endpoints relevant to a feature you'd want to build.",
          },
        ],
      },
      {
        day: 37,
        title: "Agile & scrum basics",
        tasks: [
          {
            id: "w8d2-t1",
            title: "Lesson: Agile ceremonies & PM's role",
            type: "lesson",
            description:
              "In Scrum, work happens in sprints (usually 1-2 weeks). Sprint planning is where the team commits to what they'll build this sprint — the PM's job is to bring a prioritized, well-defined backlog so the team isn't guessing at scope. Daily standups are brief status syncs (15 min) — PMs attend to stay informed and unblock things, not to micromanage. Backlog grooming is ongoing refinement of upcoming work — PMs write/clarify tickets before they're needed, not the night before. Retros are team reflections on what went well/poorly — PMs should participate as a team member, not just present findings. The common thread: the PM's job in ceremonies is providing clarity, not chasing status.",
            resources: [
              { label: "Atlassian — Agile Ceremonies Overview", url: "https://www.atlassian.com/agile/scrum/ceremonies" },
            ],
          },
          {
            id: "w8d2-t2",
            title: "Task: Write sprint-ready tickets",
            type: "task",
            description:
              "Take 2-3 user stories from Week 3 and break them into engineering tickets with clear acceptance criteria, ready for a sprint.",
          },
        ],
      },
      {
        day: 38,
        title: "Technical tradeoffs & estimation",
        tasks: [
          {
            id: "w8d3-t1",
            title: "Lesson: Understanding technical debt & tradeoffs",
            type: "lesson",
            description:
              "Technical debt is the accumulated cost of shortcuts taken to ship faster — like a loan with interest: it speeds things up now but makes future changes slower/riskier. A 'simple' feature can take longer than expected because it touches a part of the codebase with existing debt, requires changes to several systems instead of one, or needs new infrastructure (e.g. a new data pipeline) that isn't visible from the user-facing side. As a PM, you don't need to evaluate code — but you should ask 'what does this touch?' and 'is there existing debt here?' early, and trust engineers' estimates more when they explain the 'why' behind them. Productive conversations frame scope as a dial, not a binary: 'what's the smallest version that still solves the core problem?'",
            resources: [
              { label: "Martin Fowler — Technical Debt Quadrant", url: "https://martinfowler.com/bliki/TechnicalDebtQuadrant.html" },
            ],
          },
          {
            id: "w8d3-t2",
            title: "Task: Write 'what could go wrong' for your feature",
            type: "task",
            description:
              "For your tickets from Day 37, write out 3 technical risks or edge cases an engineer might raise, and how you'd respond.",
          },
        ],
      },
      {
        day: 39,
        title: "Writing a technical spec",
        tasks: [
          {
            id: "w8d4-t1",
            title: "Task: Draft a technical handoff doc",
            type: "task",
            description:
              "Write a 1-page technical handoff doc: feature summary, API/data needs, edge cases, tickets, and open technical questions for eng.",
          },
        ],
      },
      {
        day: 40,
        title: "Synthesize: Polish technical spec",
        tasks: [
          {
            id: "w8d5-t1",
            title: "Deliverable: Technical Spec",
            type: "deliverable",
            description:
              "Polish your technical handoff doc for portfolio. Add context linking back to your PRD from Week 3 to show the full PM workflow.",
          },
          {
            id: "w8d5-t2",
            title: "Advanced Challenge: Write an LLM feature architecture brief",
            type: "challenge",
            description:
              "Write a 1-page technical brief for your AI feature PRD from Week 3, covering decisions a PM should understand even without writing code: Where does context come from (RAG/retrieval from your data, vs relying on the model's training knowledge, vs both)? What's the fallback chain when the model is uncertain (ask a clarifying question → escalate to search → escalate to human)? What needs human review before launch (a golden test set of prompts + expected good/bad outputs, reviewed by the team)? What's logged for evaluation post-launch? Use REST API integration language from your background — frame this as you would for engineers who'd be building on Claude or a similar model.",
            resources: [
              { label: "Anthropic — Building Effective Agents", url: "https://www.anthropic.com/research/building-effective-agents" },
            ],
          },
        ],
      },
    ],
  },
  {
    week: 9,
    theme: "Case Studies & Mock Interviews",
    goal: "Practice product sense, estimation, and strategy questions under interview conditions.",
    portfolioDeliverable: "2 written case study answers + 1 recorded mock interview",
    days: [
      {
        day: 41,
        title: "Product sense questions",
        tasks: [
          {
            id: "w9d1-t1",
            title: "Lesson: Answering 'design a product for X' questions",
            type: "lesson",
            description:
              "CIRCLES is a 7-step structure for 'design a product/feature for X' interview questions: Comprehend the situation (clarify the question — what's the goal, what platform?), Identify the customer (who are we designing for — segment, not 'everyone'), Report the customer's needs (what problem are we solving for them?), Cut through with a guiding decision (what's your prioritization principle for this exercise?), List solutions (brainstorm 3-5 ideas), Evaluate tradeoffs (pick 1-2 and justify with pros/cons), Summarize with a recommendation and next steps. The structure matters more than the 'right' answer — interviewers are evaluating your thought process, not whether they'd actually build your idea.",
            resources: [
              { label: "Product Alliance — CIRCLES Method", url: "https://www.productalliance.com/circles-method" },
              { label: "Exponent — Product Sense Interview Guide", url: "https://www.tryexponent.com/blog/product-sense-interview" },
            ],
          },
          {
            id: "w9d1-t2",
            title: "Task: Answer 1 product sense question (written)",
            type: "task",
            description:
              "Pick a product sense question (e.g. 'Design a feature for Spotify to increase podcast listening') and write a full CIRCLES-structured answer.",
          },
        ],
      },
      {
        day: 42,
        title: "Estimation questions",
        tasks: [
          {
            id: "w9d2-t1",
            title: "Lesson: Fermi estimation",
            type: "lesson",
            description:
              "Fermi estimation breaks a big unknown ('how many people search for flights on Tuesdays?') into smaller, estimable pieces using known anchors (e.g. US population, internet penetration rate, % who travel). The goal isn't accuracy — it's demonstrating structured reasoning under uncertainty. State your assumptions out loud as you go ('I'll assume roughly 300M people in the US, of which maybe 70% are online daily...'), round aggressively (300M not 331M), and sanity-check your final number against something you know (does 'X million DAU' sound plausible for a company of this size?). Interviewers care more about whether your logic is sound and your assumptions are reasonable than whether the final number is 'correct.'",
            resources: [
              { label: "Exponent — Estimation Questions Guide", url: "https://www.tryexponent.com/blog/estimation-questions" },
            ],
          },
          {
            id: "w9d2-t2",
            title: "Task: Answer 1 estimation question (written)",
            type: "task",
            description:
              "Pick an estimation question relevant to your target companies (e.g. 'How many daily active users does [app] have?') and write out your reasoning step by step.",
          },
        ],
      },
      {
        day: 43,
        title: "Strategy & 'why' questions",
        tasks: [
          {
            id: "w9d3-t1",
            title: "Lesson: Strategy questions ('Why did X do Y?')",
            type: "lesson",
            description:
              "'Why did [company] launch X?' questions test whether you can connect a product decision to the business reality behind it. Work through three lenses: Business model (how do they make money — does X create a new revenue stream, defend an existing one, or reduce cost?), Competitive landscape (is X a response to a competitor's move, or an attempt to build a moat before one arrives?), and Growth strategy (does X strengthen an existing growth loop, or open a new acquisition channel?). A strong answer connects at least two of these — e.g. 'I think they launched X primarily to defend retention against [competitor], and it also creates a new upsell path that supports their subscription revenue.' Avoid answers that only describe the feature itself.",
            resources: [
              { label: "Stratechery — Business Strategy Analysis (example writing style)", url: "https://stratechery.com" },
            ],
          },
          {
            id: "w9d3-t2",
            title: "Task: Answer 1 strategy question (written)",
            type: "task",
            description:
              "Pick a recent product launch from one of your target companies and write a short analysis of why you think they made that bet.",
          },
        ],
      },
      {
        day: 44,
        title: "Mock interview practice",
        tasks: [
          {
            id: "w9d4-t1",
            title: "Task: Record a mock interview (solo)",
            type: "task",
            description:
              "Record yourself (phone is fine) answering one product sense, one estimation, and one strategy question out loud, timed at 10-15 min total. Watch it back.",
          },
        ],
      },
      {
        day: 45,
        title: "Synthesize: Case study portfolio entries",
        tasks: [
          {
            id: "w9d5-t1",
            title: "Deliverable: 2 written case studies",
            type: "deliverable",
            description:
              "Polish your written answers from Days 41-43 into 2 portfolio-ready case study posts, with structure and headers.",
          },
          {
            id: "w9d5-t2",
            title: "Advanced Challenge: Answer an 'AI feature design' interview question",
            type: "challenge",
            description:
              "Write a third case study answering a question like 'Design an AI-powered feature for [a consumer marketplace]' using CIRCLES — but go further than most candidates by explicitly addressing: when should the AI act autonomously vs. ask for confirmation (the 'agency' question)? How do you prevent the AI from being confidently wrong in ways that erode trust? What's your 'walk before run' plan for rolling this out? This question type is increasingly common in AI-PM interviews, and your mySet experience gives you a real example to draw from — use it.",
          },
        ],
      },
    ],
  },
  {
    week: 10,
    theme: "Portfolio & Job Search Launch",
    goal: "Package everything into a job-ready portfolio and start outreach.",
    portfolioDeliverable: "Complete portfolio site + resume + 10 outreach messages sent",
    days: [
      {
        day: 46,
        title: "Auditing your portfolio",
        tasks: [
          {
            id: "w10d1-t1",
            title: "Task: Review and select your best 3 artifacts",
            type: "task",
            description:
              "Review everything you've built (research summary, PRD, UX audit, metrics framework, experiment doc, roadmap, tech spec, case studies). Pick your strongest 3 for the portfolio homepage.",
          },
          {
            id: "w10d1-t2",
            title: "Task: Write portfolio intro/bio",
            type: "task",
            description:
              "Write a 3-4 sentence bio for your portfolio site explaining your background, what you focused on in this bootcamp, and what role you're targeting.",
          },
        ],
      },
      {
        day: 47,
        title: "Resume tailoring",
        tasks: [
          {
            id: "w10d2-t1",
            title: "Lesson: Resume bullets for PM roles",
            type: "lesson",
            description:
              "PM resume bullets work best as: [Action verb] + [what you did/built] + [impact, ideally quantified]. For self-directed bootcamp projects, you can still quantify scope and process even without 'real' business metrics: 'Conducted 3 user interviews and synthesized findings into a persona that informed a feature PRD' is concrete and process-oriented. 'Designed an A/B test framework including hypothesis, sample size calculation, and guardrail metrics for a mock feature' shows you understand experimentation rigor. Avoid vague verbs like 'helped with' or 'worked on' — use 'led,' 'designed,' 'analyzed,' 'prioritized,' 'shipped' (where applicable). Tailor which 2-3 projects you feature based on the job description's emphasis (growth vs core product vs technical).",
            resources: [
              { label: "Exponent — PM Resume Guide", url: "https://www.tryexponent.com/blog/product-manager-resume" },
            ],
          },
          {
            id: "w10d2-t2",
            title: "Task: Update resume with bootcamp projects",
            type: "task",
            description:
              "Add a 'Projects' section to your resume featuring 2-3 bootcamp deliverables with quantified impact/scope where possible.",
          },
        ],
      },
      {
        day: 48,
        title: "Outreach strategy",
        tasks: [
          {
            id: "w10d3-t1",
            title: "Lesson: Cold outreach that works",
            type: "lesson",
            description:
              "Generic outreach ('I'd love to learn more about opportunities at [company]') gets ignored because it requires the recipient to do all the work of figuring out who you are and why they should care. Specific outreach references something real: a piece of your portfolio relevant to their team ('I did a UX audit of [competitor]'s onboarding flow and noticed a pattern that might be relevant to what your team is working on'), a thoughtful observation about their product, or a genuine question about their work. Keep it to 3-4 sentences, make the ask small and easy (a 15-min chat, not 'can you refer me'), and always include a link to relevant portfolio work — it does the credibility-building for you.",
            resources: [
              { label: "Lenny's Newsletter — Cold Outreach That Works", url: "https://www.lennysnewsletter.com" },
            ],
          },
          {
            id: "w10d3-t2",
            title: "Task: Build a target list of 20 people/roles",
            type: "task",
            description:
              "Build a list of 20 target roles or people (PMs, recruiters, hiring managers) at companies from Week 1's list to reach out to.",
          },
        ],
      },
      {
        day: 49,
        title: "Send outreach",
        tasks: [
          {
            id: "w10d4-t1",
            title: "Task: Send 10 outreach messages",
            type: "task",
            description:
              "Send personalized outreach messages to 10 people from your list, referencing specific portfolio work where relevant.",
          },
        ],
      },
      {
        day: 50,
        title: "Final reflection & next steps",
        tasks: [
          {
            id: "w10d5-t1",
            title: "Deliverable: Bootcamp retrospective + next 30-day plan",
            type: "deliverable",
            description:
              "Write a retrospective: what you built, what surprised you, your biggest growth area, and a 30-day plan for continued interview prep and outreach.",
          },
          {
            id: "w10d5-t2",
            title: "Advanced Challenge: Write your AI-native PM positioning statement",
            type: "challenge",
            description:
              "Write a tight 'who I am' positioning statement (3-4 sentences, usable in your LinkedIn headline/about, portfolio intro, and outreach messages) that connects your 7 years of consumer marketplace experience to AI-native product management. Don't just list tools (Claude, Cursor) — articulate the thesis: you've already shipped LLM-powered conversational features that moved real funnel metrics, and this bootcamp is you formalizing and extending that into a repeatable AI-PM skillset (evaluation frameworks, AI UX patterns, AI-aware roadmapping). This statement is your answer to 'why should we consider you for an AI-focused PM role' — make it concrete, not buzzword-driven.",
          },
        ],
      },
    ],
  },
];

export const totalDays = curriculum.reduce((acc, w) => acc + w.days.length, 0);
export const totalTasks = curriculum.reduce(
  (acc, w) => acc + w.days.reduce((a, d) => a + d.tasks.length, 0),
  0
);
