# Skill Quality Checklist

Use this checklist before delivering a created or updated skill.

## Trigger Metadata

- `SKILL.md` frontmatter contains only `name` and `description`.
- `name` matches the folder name and uses lowercase letters, digits, and hyphens only.
- `description` says what the skill does and exactly when to use it.
- Trigger conditions are not hidden only in the body.

## Body

- The first paragraph explains what the skill enables.
- Instructions are actionable and written for another Codex instance.
- The workflow is shorter than the task it replaces.
- Examples are concrete, minimal, and directly reusable.
- Long optional detail lives in `references/`, not inline.

## Resources

- Each resource directory has a clear purpose.
- Scripts are executable, deterministic, and tested.
- Reference files are linked directly from `SKILL.md` with guidance on when to read them.
- Assets are files to copy or use, not documents the model must read.
- Placeholder example files have been removed.

## Validation

- Run `quick_validate.py` against the final skill folder.
- Inspect `agents/openai.yaml` if present; `default_prompt` should mention `$skill-name` literally.
- Check for leftover TODO markers or template prose.
- If the skill changes a risky or complex workflow, forward-test it with a realistic user request.
