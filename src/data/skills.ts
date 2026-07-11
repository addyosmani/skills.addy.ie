// Skill catalog - generated from the agent-skills repository.
// Source: https://github.com/addyosmani/agent-skills

export type PhaseId =
  | 'meta'
  | 'define'
  | 'plan'
  | 'build'
  | 'verify'
  | 'review'
  | 'ship';

export interface Phase {
  id: PhaseId;
  label: string;
  short: string;
  order: number;
  /** Hue used for muted accenting. */
  hue: number;
  blurb: string;
  command?: string;
}

export const phases: Phase[] = [
  {
    id: 'meta',
    label: 'Meta',
    short: 'Meta',
    order: 0,
    hue: 220,
    blurb: 'Route work to the right skill and set shared operating rules.',
  },
  {
    id: 'define',
    label: 'Define',
    short: 'Define',
    order: 1,
    hue: 205,
    blurb: 'Clarify what to build before a line of code is written.',
    command: '/spec',
  },
  {
    id: 'plan',
    label: 'Plan',
    short: 'Plan',
    order: 2,
    hue: 255,
    blurb: 'Break the spec into small, verifiable, ordered tasks.',
    command: '/plan',
  },
  {
    id: 'build',
    label: 'Build',
    short: 'Build',
    order: 3,
    hue: 175,
    blurb: 'Write the code in thin, tested vertical slices.',
    command: '/build',
  },
  {
    id: 'verify',
    label: 'Verify',
    short: 'Verify',
    order: 4,
    hue: 40,
    blurb: 'Prove it works with real runtime evidence.',
    command: '/test',
  },
  {
    id: 'review',
    label: 'Review',
    short: 'Review',
    order: 5,
    hue: 340,
    blurb: 'Quality, security and performance gates before merge.',
    command: '/review',
  },
  {
    id: 'ship',
    label: 'Ship',
    short: 'Ship',
    order: 6,
    hue: 145,
    blurb: 'Deploy with confidence - rollout, rollback, observe.',
    command: '/ship',
  },
];

export const phaseMap: Record<PhaseId, Phase> = Object.fromEntries(
  phases.map((p) => [p.id, p]),
) as Record<PhaseId, Phase>;

export interface Skill {
  slug: string;
  name: string;
  phase: PhaseId;
  /** Short punchy summary for cards. */
  summary: string;
  /** One-line "use when" trigger. */
  useWhen: string;
  /** Full description from SKILL.md frontmatter. */
  description: string;
  /** Filter tags. */
  tags: string[];
  /** Slash command that activates this skill, if any. */
  command?: string;
  /** Marks a headline skill worth featuring. */
  featured?: boolean;
}

export const skills: Skill[] = [
  {
    slug: 'using-agent-skills',
    name: 'using-agent-skills',
    phase: 'meta',
    summary: 'Maps incoming work to the right skill and defines shared operating rules.',
    useWhen: 'Starting a session or deciding which skill applies.',
    description:
      'Discovers and invokes agent skills. The meta-skill that governs how all other skills are discovered and invoked - load it first and it routes each task to the right workflow.',
    tags: ['routing', 'workflow'],
  },
  {
    slug: 'interview-me',
    name: 'interview-me',
    phase: 'define',
    summary: 'One-question-at-a-time interview that extracts what you actually want.',
    useWhen: 'The ask is underspecified, or you invoke "interview me" / "grill me".',
    description:
      'Extracts what the user actually wants instead of what they think they should want, through a one-question-at-a-time interview until ~95% confidence about the underlying intent.',
    tags: ['requirements', 'discovery'],
    featured: true,
  },
  {
    slug: 'idea-refine',
    name: 'idea-refine',
    phase: 'define',
    summary: 'Structured divergent/convergent thinking to sharpen a vague concept.',
    useWhen: 'You have a rough idea that needs exploration and stress-testing.',
    description:
      'Refines raw ideas into sharp, actionable concepts through structured divergent and convergent thinking. Stress-test assumptions and expand options before converging on one.',
    tags: ['ideation', 'discovery'],
  },
  {
    slug: 'spec-driven-development',
    name: 'spec-driven-development',
    phase: 'define',
    command: '/spec',
    summary: 'Write a PRD covering objectives, structure, style, testing and boundaries - before code.',
    useWhen: 'Starting a new project, feature, or significant change.',
    description:
      'Creates specs before coding. Writes a PRD covering objectives, commands, structure, code style, testing, and boundaries when requirements are unclear, ambiguous, or only exist as a vague idea.',
    tags: ['spec', 'planning', 'requirements'],
    featured: true,
  },
  {
    slug: 'planning-and-task-breakdown',
    name: 'planning-and-task-breakdown',
    phase: 'plan',
    command: '/plan',
    summary: 'Decompose specs into small, verifiable tasks with acceptance criteria and ordering.',
    useWhen: 'You have a spec and need implementable units.',
    description:
      'Breaks work into ordered tasks with acceptance criteria and dependency ordering. Use when a task feels too large to start, when you need to estimate scope, or when parallel work is possible.',
    tags: ['planning', 'tasks'],
  },
  {
    slug: 'incremental-implementation',
    name: 'incremental-implementation',
    phase: 'build',
    command: '/build',
    summary: 'Thin vertical slices - implement, test, verify, commit. Rollback-friendly changes.',
    useWhen: 'Any change touching more than one file.',
    description:
      'Delivers changes incrementally as thin vertical slices with feature flags, safe defaults, and rollback-friendly changes. Use when you’re about to write a large amount of code at once.',
    tags: ['implementation', 'workflow'],
    featured: true,
  },
  {
    slug: 'test-driven-development',
    name: 'test-driven-development',
    phase: 'build',
    command: '/test',
    summary: 'Red-Green-Refactor, the test pyramid, DAMP over DRY, the Beyoncé Rule.',
    useWhen: 'Implementing logic, fixing bugs, or changing behavior.',
    description:
      'Drives development with tests. Red-Green-Refactor, test pyramid (80/15/5), test sizes, DAMP over DRY, the Beyoncé Rule, and browser testing. Tests are proof, not an afterthought.',
    tags: ['testing', 'tdd', 'quality'],
    featured: true,
  },
  {
    slug: 'context-engineering',
    name: 'context-engineering',
    phase: 'build',
    summary: 'Feed agents the right information at the right time - rules files, context packing, MCP.',
    useWhen: 'Starting a session, switching tasks, or when output quality drops.',
    description:
      'Optimizes agent context setup. Configure rules files, pack context deliberately, and wire MCP integrations so the agent has exactly what it needs - no more, no less.',
    tags: ['context', 'agents', 'mcp'],
  },
  {
    slug: 'source-driven-development',
    name: 'source-driven-development',
    phase: 'build',
    summary: 'Ground every framework decision in official docs - verify, cite, flag the unverified.',
    useWhen: 'You want authoritative, source-cited code for any framework or library.',
    description:
      'Grounds every implementation decision in official documentation. Verify against sources, cite them, and flag anything unverified so the code stays free of outdated patterns.',
    tags: ['documentation', 'correctness'],
  },
  {
    slug: 'doubt-driven-development',
    name: 'doubt-driven-development',
    phase: 'build',
    summary: 'Adversarial fresh-context review of every non-trivial decision, in-flight.',
    useWhen: 'Stakes are high, code is unfamiliar, or verifying now beats debugging later.',
    description:
      'Subjects every non-trivial decision to a fresh-context adversarial review before it stands: CLAIM → EXTRACT → DOUBT → RECONCILE → STOP, with optional user-authorized cross-model escalation.',
    tags: ['verification', 'quality', 'agents'],
    featured: true,
  },
  {
    slug: 'frontend-ui-engineering',
    name: 'frontend-ui-engineering',
    phase: 'build',
    summary: 'Component architecture, design systems, state, responsive, WCAG 2.1 AA accessibility.',
    useWhen: 'Building or modifying user-facing interfaces.',
    description:
      'Builds production-quality, accessible, responsive user-facing UIs. Component architecture, design systems, state management, responsive design, and WCAG 2.1 AA accessibility - output that looks production-quality, not AI-generated.',
    tags: ['frontend', 'ui', 'accessibility'],
    featured: true,
  },
  {
    slug: 'api-and-interface-design',
    name: 'api-and-interface-design',
    phase: 'build',
    summary: 'Contract-first design, Hyrum’s Law, the One-Version Rule, error semantics.',
    useWhen: 'Designing APIs, module boundaries, or public interfaces.',
    description:
      'Guides stable API and interface design. Contract-first design, Hyrum’s Law, the One-Version Rule, error semantics, and boundary validation for REST, GraphQL, and type contracts between modules.',
    tags: ['api', 'architecture'],
  },
  {
    slug: 'browser-testing-with-devtools',
    name: 'browser-testing-with-devtools',
    phase: 'verify',
    summary: 'Chrome DevTools MCP for live runtime data - DOM, console, network, profiling.',
    useWhen: 'Building or debugging anything that runs in a browser.',
    description:
      'Tests in real browsers via the Chrome DevTools MCP. Inspect the DOM, capture console errors, analyze network requests, profile performance, and verify visual output with real runtime data.',
    tags: ['testing', 'browser', 'mcp'],
  },
  {
    slug: 'debugging-and-error-recovery',
    name: 'debugging-and-error-recovery',
    phase: 'verify',
    summary: 'Five-step triage: reproduce, localize, reduce, fix, guard. Stop-the-line rule.',
    useWhen: 'Tests fail, builds break, or behavior is unexpected.',
    description:
      'Guides systematic root-cause debugging. Reproduce, localize, reduce, fix, guard - with a stop-the-line rule and safe fallbacks, so you fix the cause instead of guessing.',
    tags: ['debugging', 'quality'],
  },
  {
    slug: 'code-review-and-quality',
    name: 'code-review-and-quality',
    phase: 'review',
    command: '/review',
    summary: 'Five-axis review, ~100-line change sizing, severity labels, review-speed norms.',
    useWhen: 'Before merging any change.',
    description:
      'Conducts multi-axis code review across correctness, readability, architecture, security, and performance. Change sizing (~100 lines), severity labels (Nit/Optional/FYI), review speed norms, and splitting strategies.',
    tags: ['review', 'quality', 'security'],
    featured: true,
  },
  {
    slug: 'code-simplification',
    name: 'code-simplification',
    phase: 'review',
    command: '/code-simplify',
    summary: 'Chesterton’s Fence, the Rule of 500 - cut complexity while preserving behavior.',
    useWhen: 'Code works but is harder to read or maintain than it should be.',
    description:
      'Simplifies code for clarity. Chesterton’s Fence, the Rule of 500 - reduce complexity while preserving exact behavior when code has accumulated unnecessary weight.',
    tags: ['refactoring', 'quality'],
  },
  {
    slug: 'security-and-hardening',
    name: 'security-and-hardening',
    phase: 'review',
    summary: 'OWASP Top 10 prevention, auth patterns, secrets, dependency auditing.',
    useWhen: 'Handling user input, auth, data storage, or external integrations.',
    description:
      'Hardens code against vulnerabilities. OWASP Top 10 prevention, auth patterns, secrets management, dependency auditing, and a three-tier boundary system for any feature that accepts untrusted data.',
    tags: ['security', 'hardening'],
    featured: true,
  },
  {
    slug: 'performance-optimization',
    name: 'performance-optimization',
    phase: 'review',
    command: '/webperf',
    summary: 'Measure-first - Core Web Vitals targets, profiling, bundle analysis, N+1 fixes.',
    useWhen: 'Performance requirements exist or you suspect regressions.',
    description:
      'Optimizes application performance across frontend, backend, queries, and databases. Measure-first approach - Core Web Vitals targets, profiling workflows, bundle analysis, and anti-pattern detection. Run the audit via /webperf.',
    tags: ['performance', 'web-vitals'],
    featured: true,
  },
  {
    slug: 'git-workflow-and-versioning',
    name: 'git-workflow-and-versioning',
    phase: 'ship',
    summary: 'Trunk-based development, atomic commits, ~100-line changes, commit-as-save-point.',
    useWhen: 'Making any code change (always).',
    description:
      'Structures git workflow practices. Trunk-based development, atomic commits, change sizing (~100 lines), and the commit-as-save-point pattern - plus branching, conflicts, releases, and semantic versioning.',
    tags: ['git', 'workflow'],
  },
  {
    slug: 'ci-cd-and-automation',
    name: 'ci-cd-and-automation',
    phase: 'ship',
    summary: 'Shift Left, Faster is Safer, feature flags, quality-gate pipelines.',
    useWhen: 'Setting up or modifying build and deploy pipelines.',
    description:
      'Automates CI/CD pipeline setup. Shift Left, Faster is Safer, feature flags, quality-gate pipelines, and failure feedback loops - automate the gates so speed and safety compound.',
    tags: ['ci-cd', 'automation'],
  },
  {
    slug: 'deprecation-and-migration',
    name: 'deprecation-and-migration',
    phase: 'ship',
    summary: 'Code-as-liability mindset, compulsory vs advisory deprecation, zombie-code removal.',
    useWhen: 'Removing old systems, migrating users, or sunsetting features.',
    description:
      'Manages deprecation and migration. A code-as-liability mindset, compulsory vs advisory deprecation, migration patterns, and zombie-code removal for deciding whether to maintain or sunset existing code.',
    tags: ['migration', 'maintenance'],
  },
  {
    slug: 'documentation-and-adrs',
    name: 'documentation-and-adrs',
    phase: 'ship',
    summary: 'Architecture Decision Records, API docs, inline standards - document the why.',
    useWhen: 'Making architectural decisions, changing APIs, or shipping features.',
    description:
      'Records decisions and documentation. Architecture Decision Records, API docs, and inline documentation standards - capture the context future engineers and agents need to understand the codebase.',
    tags: ['documentation', 'adr'],
  },
  {
    slug: 'observability-and-instrumentation',
    name: 'observability-and-instrumentation',
    phase: 'ship',
    summary: 'Structured logging, RED metrics, OpenTelemetry tracing, symptom-based alerting.',
    useWhen: 'Adding telemetry, or shipping anything that runs in production.',
    description:
      'Instruments code so production behavior is visible and diagnosable. Structured logging, RED metrics, OpenTelemetry tracing, and symptom-based alerting - instrument as you build, not after an incident.',
    tags: ['observability', 'production'],
  },
  {
    slug: 'shipping-and-launch',
    name: 'shipping-and-launch',
    phase: 'ship',
    command: '/ship',
    summary: 'Pre-launch checklists, feature-flag lifecycle, staged rollouts, rollback procedures.',
    useWhen: 'Preparing to deploy to production.',
    description:
      'Prepares production launches. Pre-launch checklists, feature-flag lifecycle, staged rollouts, rollback procedures, and monitoring setup. Run via /ship to fan out review personas, then merge into a go/no-go.',
    tags: ['launch', 'production', 'rollout'],
    featured: true,
  },
];

export const skillsByPhase = phases.map((phase) => ({
  phase,
  skills: skills.filter((s) => s.phase === phase.id),
}));

export const featuredSkills = skills.filter((s) => s.featured);

export function getSkill(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

export const totalSkills = skills.length;

export const REPO_URL = 'https://github.com/addyosmani/agent-skills';
export const INSTALL_CMD = 'npx skills add addyosmani/agent-skills';
