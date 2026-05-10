---
name: agent-pair-work-flow
description: Run issue-driven modes directly with Dev in chat. Use when Dev is pairing with Codex or ClaudeCode on a local machine.
---

# Agent Pair Work Flow

Use this skill when Dev works directly with an agent in chat.
Pair-work mode is not the default mode.
Use it only when Dev explicitly requests collaborative work for a complex issue.

## Roles

- Dev is the coordinator, lead, and reviewer.
- The agent is Codex or ClaudeCode.
- GitHub issues and PRs remain the durable task log.
- Chat is the immediate collaboration channel.

## Agent Identity

Use the matching GitHub App bot for GitHub writes when shared app credentials are available:

- Codex: `codex-coder`
- ClaudeCode: `claudecode-coder`

Commands should use:

```bash
./.agents/scripts/with-github-app.sh <agent-slug> -- gh <...>
```

The helper checks `../github-apps/<agent-slug>/`.
If credentials are not present, it runs the command with the current authenticated `gh` user.

## Modes

Pair-work mode uses the standard issue modes:

- `init`
- `reinit`
- `plan`
- `code`
- `pr`
- `merge`

Every mode starts by fetching full issue details and all comments, then reconciling labels.
Pair-work issues must be labeled `agent` and `co-op`, and must not keep `agent-only`.

## Chat Contract

In pair-work mode, the agent must respond to Dev in chat as well as writing durable GitHub updates.
Unlike agent-only mode, the agent may ask clarifying questions in chat when the answer materially affects scope, design, risk, or correctness.
When a decision changes the durable task definition, also record it in the GitHub issue.

Chat updates should include:

- mode
- issue number
- branch name
- worktree path when applicable
- status: completed, blocked, failed, ready for review, or merged
- validation result
- next action or decision needed

Keep long implementation detail in GitHub issue comments, PR body, commits, and code.

## Workflow

1. Dev gives project, issue number, and mode in chat.
2. Agent reads root and local `AGENTS.md`.
3. Agent uses `common-documentation-lookup`.
4. Agent uses `common-git-issue`.
5. Agent uses `common-git-pr` when PR work is needed.
6. Agent writes durable status to GitHub.
7. Agent responds to Dev in chat with a concise status summary.

## Pair-Work Coding Guidelines

Use these guidelines when writing, reviewing, or refactoring code in pair-work mode.
They are adapted from Karpathy-style LLM coding guidance: reduce overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.

### Think Before Coding

- State assumptions explicitly.
- If multiple interpretations exist, present them before coding.
- Ask Dev when ambiguity affects scope, architecture, risk, or correctness.
- Push back when a simpler approach is clearly better.

### Simplicity First

- Build the minimum code that solves the issue.
- Do not add speculative features, extension points, or configuration.
- Do not add abstractions for single-use code.
- If the solution becomes large, pause and explain the simpler alternative.

### Surgical Changes

- Touch only files needed for the issue.
- Match existing style even when another style might be preferable.
- Do not refactor unrelated code.
- Remove only unused code created by the current change unless Dev asks for cleanup.
- Mention unrelated issues instead of fixing them silently.

### Goal-Driven Execution

- Convert the issue into verifiable success criteria.
- For multi-step work, keep a short plan with checks.
- Prefer tests or concrete validation that prove the behavior changed.
- Keep looping until the agreed checks pass or a blocker is posted.

## Code Mode

When coding:

- create or reuse `issue-<number>-<short-kebab-title>`
- create or reuse `worktrees/<branch-name>`
- work inside the worktree
- commit before ending the chat
- push before ending the chat
- report validation clearly

## Merge Mode

Only merge when Dev explicitly asks for merge and the PR is ready.
If checks, review state, or scope are uncertain, block and explain why.
