// Specialist review personas — from agent-skills/agents/
export interface Persona {
  slug: string;
  name: string;
  role: string;
  perspective: string;
  command?: string;
}

export const personas: Persona[] = [
  {
    slug: 'code-reviewer',
    name: 'code-reviewer',
    role: 'Senior Staff Engineer',
    perspective:
      'Five-axis code review with a "would a staff engineer approve this?" standard.',
  },
  {
    slug: 'test-engineer',
    name: 'test-engineer',
    role: 'QA Specialist',
    perspective: 'Test strategy, coverage analysis, and the Prove-It pattern.',
  },
  {
    slug: 'security-auditor',
    name: 'security-auditor',
    role: 'Security Engineer',
    perspective: 'Vulnerability detection, threat modeling, and OWASP assessment.',
  },
  {
    slug: 'web-performance-auditor',
    name: 'web-performance-auditor',
    role: 'Web Performance Engineer',
    perspective:
      'Core Web Vitals audit with Quick/Deep modes and a metric-honesty rule. Run via /webperf.',
    command: '/webperf',
  },
];

// Slash commands mapped to the lifecycle.
export interface Command {
  cmd: string;
  doing: string;
  principle: string;
}

export const commands: Command[] = [
  { cmd: '/spec', doing: 'Define what to build', principle: 'Spec before code' },
  { cmd: '/plan', doing: 'Plan how to build it', principle: 'Small, atomic tasks' },
  { cmd: '/build', doing: 'Build incrementally', principle: 'One slice at a time' },
  { cmd: '/test', doing: 'Prove it works', principle: 'Tests are proof' },
  { cmd: '/review', doing: 'Review before merge', principle: 'Improve code health' },
  { cmd: '/webperf', doing: 'Audit web performance', principle: 'Measure before you optimize' },
  { cmd: '/code-simplify', doing: 'Simplify the code', principle: 'Clarity over cleverness' },
  { cmd: '/ship', doing: 'Ship to production', principle: 'Faster is safer' },
];

// Reference checklists — from agent-skills/references/
export const references = [
  { name: 'definition-of-done', covers: 'The standing bar every change clears.' },
  { name: 'testing-patterns', covers: 'Structure, naming, mocking, React/API/E2E examples.' },
  { name: 'security-checklist', covers: 'Pre-commit checks, auth, headers, OWASP Top 10.' },
  { name: 'performance-checklist', covers: 'Core Web Vitals targets and measurement commands.' },
  { name: 'accessibility-checklist', covers: 'Keyboard nav, screen readers, ARIA, testing tools.' },
  { name: 'observability-checklist', covers: 'Structured logging, RED/USE metrics, tracing, alerting.' },
  { name: 'orchestration-patterns', covers: 'Multi-persona orchestration patterns and anti-patterns.' },
];
