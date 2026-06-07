# meta-skill

`meta-skill` is an Agent Skill for designing better Agent Skills. It helps an agent decide whether a skill should exist, compare nearby alternatives, write a concise design brief, and give each skill a distinctive identity before implementation.

## Install from npm

Install into any local skills directory:

```bash
npx skill-meta-skill install --dest ~/.agent/skills
```

For any tool with a different skills directory, pass that parent directory explicitly:

```bash
npx skill-meta-skill install --dest /path/to/agent/skills
```

You can also set `AGENT_SKILLS_DIR`:

```bash
AGENT_SKILLS_DIR=~/.agent/skills npx skill-meta-skill install
```

The installer copies only the skill payload: `SKILL.md`, `references/`, `agents/`, and `LICENSE.txt`.

## Package Shape

This npm package keeps the Agent Skill payload at the package root so it can also be installed from GitHub or copied manually. The npm CLI is a thin convenience wrapper for environments that prefer package-manager distribution.

## Included Files

- `SKILL.md`: trigger metadata and core workflow
- `references/design-brief.md`: compact design brief template
- `references/quality-checklist.md`: delivery checklist
- `agents/openai.yaml`: optional host UI metadata for compatible environments

## License

Apache-2.0
