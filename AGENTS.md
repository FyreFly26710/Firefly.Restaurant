# AGENTS.md

## Repository Role

This repository is designed for issue-driven agent collaboration.
GitHub issues define the requested work, and agents perform focused implementation work.

## Agent Modes

### Agent-only mode
Agent-only mode is the default mode for issue-driven delivery.
Dev works remotely, away from the agent.
Communication happens through OpenClaw and GitHub issue comments.
The agent must not ask questions in chat responses.
If clarification is required, the agent must write the question or blocker as a GitHub issue comment, set the issue state to blocked, and stop.
All code changes must be committed on the issue branch and pushed to GitHub before the agent ends an implementation run.
The GitHub issue must be labeled clearly with `agent` and `agent-only`.
Dev reviews through GitHub and gives follow-up instructions through issue comments or a new OpenClaw trigger.

### Pair-work mode
Pair-work mode is for complex issues where Dev decides to work directly with an agent on Dev's machine.
Dev coordinates the work in chat, and the agent may ask clarifying questions in chat while still keeping GitHub updated.
The GitHub issue must be labeled clearly with `agent` and `co-op`, and must not keep `agent-only`.
Pair-work mode follows the `agent-pair-work-flow` skill.

Use the same issue modes for issue-driven work: `init`, `reinit`, `plan`, `code`, `pr`, and `merge`.
Use GitHub issues and PRs as the durable task log.

## Default Tech Stack

Use this stack for new projects unless the project issue, docs, or local `AGENTS.md` chooses a different stack:

- Web client: React, TypeScript, Vite, TanStack Query, Zustand when client-owned global state is needed, Tailwind CSS, Vitest, Testing Library, and Playwright.
- Backend: .NET, ASP.NET Core, EF Core when persistence is relational, MediatR for write commands, Problem Details, OpenAPI, unit tests, and functional tests.
- Repository layout: web client under `src/client/web/`, backend under `src/server/`, shared project docs under `docs/`.

## Core Principles

- Treat the GitHub issue as the source of truth for issue-driven work.
- Keep one issue mapped to one focused branch and one reviewable pull request.
- Prefer small, explicit changes over broad refactors.
- Follow local `AGENTS.md` files before introducing new conventions.
- Do not rename files, folders, APIs, or public contracts unless the issue requires it.
- Do not add dependencies unless the need is clear and documented.
- Keep assumptions visible in issue comments, PR summaries, or docs.
- Update docs when architecture, workflow, or delivery behavior changes materially.

## Repository Structure

- `.agents/skills/` contains reusable agent skills for issue handling, documentation lookup, PR work, planning, frontend work, and backend work.
- `.agents/scripts/` contains reusable agent helper scripts.
- `.github/` contains the pull request template.
- `src/client/web/` contains the web client area and its local `AGENTS.md`.
- `src/server/` contains the backend/server area and its local `AGENTS.md`.
- `docs/` contains project-facing product, architecture, and development planning documentation.

## Skill Naming Convention

Skills live under `.agents/skills/<scope>-<skill-desc>/SKILL.md`.
Examples:

- `common-documentation-lookup`
- `common-git-issue`
- `common-git-pr`
- `frontend-design`
- `frontend-patterns`
- `frontend-tdd-workflow`
- `frontend-e2e-testing`
- `backend-patterns`
- `backend-tdd-workflow`
- `agent-pair-work-flow`

## Issue-Driven Workflow

For GitHub issue work:

1. Read the full issue details and all comments.
2. Read this file, relevant local `AGENTS.md` files, and relevant docs.
3. Ensure the workflow labels are correct.
4. If the issue is unclear, update derived issue sections or add a refinement comment before coding.
5. When implementation is requested, create or continue the issue branch and worktree.
6. Keep progress visible in GitHub issue or PR comments.
7. In pair-work mode, also respond clearly to Dev in chat.
8. Run relevant checks before handing work back.
9. Commit and push before ending any implementation chat.
10. Prepare a focused PR tied to the source issue when `pr` or `merge` mode requires it.

Default issue delivery mode is `agent-only`.
Use `co-op` only when Dev explicitly requests collaborative pair work.
Keep `agent-only` and `co-op` mutually exclusive.

The agent and Dev should use the same branch, worktree, issue comments, labels, and PR rules for every issue.

## Branch And PR Rules

- Branch names should be `issue-<number>-<short-kebab-title>`.
- Issue worktrees should live at `worktrees/<branch-name>` when worktrees are used.
- At issue `init`, pull latest `main` after reading issue: `git checkout main && git pull --ff-only origin main`.
- Before creating or updating a PR, fetch and merge latest `origin/main` into the issue branch, resolve conflicts if needed, validate again, and push.
- Do not rebase by default unless Dev or local repository guidance explicitly requests it.
- PR titles should be `<type>(<scope>): <description> (#<issue-number>)`.
- PR bodies should include `Closes #<issue-number>` when the PR should close the issue.
- In `pr` mode, create or update the PR and stop for Dev review.
- In `merge` mode, merge the existing PR, or create the PR first when one does not exist.
- All PR merges must use squash merge.
- After a PR is merged, return to `main` and pull latest `main` again before cleanup or new issue work.
- Use the source GitHub issue number as the canonical work item id.
- Do not use the PR number as a substitute for the issue number.

## Local Guidance

Child folders may define their own `AGENTS.md`.
When guidance conflicts, prefer the most specific `AGENTS.md` that applies to the files being changed, unless the root guidance defines a workflow rule.
