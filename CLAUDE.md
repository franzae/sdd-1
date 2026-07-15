# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This repository is currently a skeleton with no application code yet. The only files are `AGENTS.md` (the project spec), `README.md`, and `community_contributions/` (example AGENTS.md variations from other students). The `frontend/` directory described below does not exist yet — it must be scaffolded as part of implementation.

## What This Project Is

A Kanban-style project management web app, built as a course exercise (The Complete AI Coder Course, Week 1). The authoritative spec lives in `AGENTS.md` — read it in full before starting work, since it defines both the product requirements and the required strategy/workflow, not just style preferences.

## Business Requirements (from AGENTS.md)

- Single board only, with fixed 5 columns that can be renamed
- Each card has a title and details only
- Drag-and-drop to move cards between columns
- Add a new card to a column; delete an existing card
- No archive, no search/filter — do not add functionality beyond this list
- Priority is a slick, professional, gorgeous UI/UX with very simple features
- App opens pre-populated with dummy data (no persistence, no backend, no user management)

## Technical Details

- Modern Next.js app, client-rendered
- Must be created in a subdirectory named `frontend`
- No persistence layer, no auth — all state is in-memory/client-side
- Use popular, well-supported libraries; use latest versions and idiomatic patterns
- Favor simplicity over configurability everywhere

## Color Scheme

| Role | Color | Hex |
|---|---|---|
| Accent lines, highlights | Accent Yellow | `#ecad0a` |
| Links, key sections | Blue Primary | `#209dd7` |
| Submit buttons, important actions | Purple Secondary | `#753991` |
| Main headings | Dark Navy | `#032147` |
| Supporting text, labels | Gray Text | `#888888` |

## Required Strategy

1. Write a plan with success criteria for each phase before implementing. Include project scaffolding (including `.gitignore`) and rigorous unit testing in the plan.
2. Execute the plan, checking off each criterion.
3. Carry out extensive integration testing with Playwright (or similar), fixing defects found.
4. Only consider the work complete when the MVP is finished and tested, with the dev server running and ready for the user.

## Coding Standards

- Never over-engineer; always simplify; no unnecessary defensive programming or extra features beyond the spec.
- Be concise. Keep the README minimal. Never use emojis, anywhere.

## Community Contributions

`community_contributions/` contains alternative AGENTS.md files submitted by other students, showing different product directions built on the same skeleton (e.g. `mluck134.md` reimagines this as a "Supply Chain Workflow Tracker" with a detail panel, flags, and notes). These are reference examples only — they do not apply to this repo's own build unless the user explicitly asks to follow one of them instead of the root `AGENTS.md`.
