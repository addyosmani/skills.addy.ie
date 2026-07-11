// Teach / media-kit resources. Files live in public/teach/.

export interface Diagram {
  slug: string;
  title: string;
  blurb: string;
  hue: number;
  /** aspect ratio label for the preview frame */
}

export const diagrams: Diagram[] = [
  {
    slug: 'lifecycle',
    title: 'The SDLC lifecycle',
    blurb: 'Define to Ship, one command per phase. The core mental model in a single frame.',
    hue: 205,
  },
  {
    slug: 'solo-workflow',
    title: 'Solo daily loop',
    blurb: 'How one developer drives spec, build, test, ship, plus the hands-off /build auto option.',
    hue: 175,
  },
  {
    slug: 'team-workflow',
    title: 'Team review panel',
    blurb: '/ship fans out to four specialist personas in parallel, then merges one go / no-go.',
    hue: 145,
  },
  {
    slug: 'skill-anatomy',
    title: 'Anatomy of a skill',
    blurb: 'Frontmatter, workflow, guardrails, and verification. Why a skill is a process, not a prompt.',
    hue: 255,
  },
  {
    slug: 'customize',
    title: 'Four ways to customize',
    blurb: 'Install all, pick a few, edit them, or write your own. Skills are plain Markdown.',
    hue: 340,
  },
];

export interface Deck {
  slug: string;
  level: string;
  title: string;
  blurb: string;
  slides: number;
  hue: number;
  covers: string[];
}

export const decks: Deck[] = [
  {
    slug: 'agent-skills-101',
    level: '101',
    title: 'Intro: what and why',
    blurb: 'The problem with default agents, what a skill is, and how to install and get a first win.',
    slides: 8,
    hue: 205,
    covers: ['The shortest-path problem', 'Skill anatomy', 'The lifecycle', 'Your first spec'],
  },
  {
    slug: 'agent-skills-201',
    level: '201',
    title: 'The SDLC, in practice',
    blurb: 'The eight commands, the solo daily loop, and how each phase actually plays out.',
    slides: 8,
    hue: 175,
    covers: ['Eight commands', 'The daily loop', 'Define to Ship', '/build auto'],
  },
  {
    slug: 'agent-skills-301',
    level: '301',
    title: 'Teams and customization',
    blurb: 'Review panels, context budgets, four ways to customize, evals, and rolling out to a team.',
    slides: 7,
    hue: 340,
    covers: ['Review panel', 'Customize 4 ways', 'Context engineering', 'Evals and rollout'],
  },
];

export interface UsageMode {
  slug: string;
  label: string;
  diagram: string;
  headline: string;
  body: string;
  points: string[];
}

export const usageModes: UsageMode[] = [
  {
    slug: 'solo',
    label: 'Solo projects',
    diagram: 'solo-workflow',
    headline: 'Move through the whole SDLC on your own',
    body: 'Install once, then drive each lifecycle phase with a single command. You approve at every checkpoint, and every slice is tested and committed on its own.',
    points: [
      '/spec writes a short PRD before any code',
      '/build lands thin, tested vertical slices',
      '/build auto runs an approved plan hands-off',
    ],
  },
  {
    slug: 'team',
    label: 'Team projects',
    diagram: 'team-workflow',
    headline: 'Ship past a panel, not a rubber stamp',
    body: 'The same lifecycle scales to a team. /ship fans out to specialist review personas in parallel, then merges their findings into one honest go / no-go with the blocking items called out.',
    points: [
      'code-reviewer, security-auditor, test-engineer, web-performance-auditor',
      'Anti-rationalization guards keep every phase honest',
      'Commit skills to version control for one shared source of truth',
    ],
  },
  {
    slug: 'customize',
    label: 'Customize',
    diagram: 'customize',
    headline: 'Bend the workflow to your stack',
    body: 'Skills are plain Markdown, so you own them. Install all 24, load only the few a task needs, fork a SKILL.md to add your house style, or write your own with the same anatomy.',
    points: [
      'Context is a budget: load only what the task needs',
      'Fork any SKILL.md to encode team standards',
      'New skills follow the same process, guardrails, and verification',
    ],
  },
];

export const REPO = 'https://github.com/addyosmani/agent-skills';
