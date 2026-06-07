---
name: meta-skill
description: Design, create, audit, and refine Codex skills. Use when Codex needs to make a new skill folder, update an existing skill, write SKILL.md instructions, decide what scripts/references/assets belong in a skill, validate skill metadata, or turn a repeated workflow into a reusable Codex capability.
---

# Meta Skill

Use this skill to turn a repeated workflow, domain practice, or tool integration into a compact Codex skill that another agent can use without extra explanation.

## Workflow

1. Clarify the target behavior with concrete prompts the skill should handle. Ask only for missing details that change the skill's scope, destination, or safety profile.
2. Choose a lowercase hyphenated skill name under 64 characters. Name the folder exactly after the skill name.
3. Decide the smallest useful file set:
   - `SKILL.md` for trigger metadata and essential workflow instructions.
   - `references/` for longer docs that should be loaded only when relevant.
   - `scripts/` for deterministic or repeated operations that should not be rewritten each time.
   - `assets/` for templates, fonts, icons, examples, or other files used in final outputs.
4. Initialize the folder with the local skill initializer when available. Prefer:

```bash
python3 /Users/huangzhou/.codex/skills/.system/skill-creator/scripts/init_skill.py <skill-name> --path <parent-dir>
```

Add `--resources scripts,references,assets` only for resource directories the skill truly needs. Pass `--interface display_name=...`, `--interface short_description=...`, and `--interface default_prompt='Use $skill-name to ...'` when creating UI metadata.

5. Replace all placeholders. Keep frontmatter to only `name` and `description`; put all trigger conditions in `description`, because the body loads only after the skill triggers.
6. Write the body as instructions for another Codex instance. Use imperative language, compact examples, and explicit references to bundled files only when those files should be read.
7. Validate the folder before delivery:

```bash
python3 /Users/huangzhou/.codex/skills/.system/skill-creator/scripts/quick_validate.py <path-to-skill-folder>
```

8. For complex skills, forward-test with realistic prompts and revise based on what the skill failed to make obvious.

## Authoring Rules

- Keep `SKILL.md` concise. Move optional detail into one-level reference files and name when to open them.
- Prefer resources only when they reduce future work or prevent fragile recreation.
- Avoid extra documentation such as `README.md`, install guides, changelogs, or process notes unless the user explicitly asks.
- Use existing local conventions from nearby skills when updating an existing skill.
- Test every added script by running it at least once, or clearly state why it was not run.
- Preserve user edits in existing skill folders; patch around them rather than replacing whole files blindly.

## Quality Review

Before finishing, read `references/quality-checklist.md` and apply the checklist. Fix any failure that would stop the skill from triggering, loading, validating, or being useful to a future agent.
