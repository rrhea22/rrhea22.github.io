# Creating a Skill

A skill is a reusable slash command. When you type /your-skill,
Claude follows the instructions in SKILL.md every time. Same flow,
same quality, consistent results.

## Minimum Structure

```
~/.claude/skills/your-skill/
  SKILL.md          # The only required file
```

## SKILL.md Format

```yaml
---
name: your-skill
description: |
  What it does and when to use it.
  Use when: "trigger phrase 1", "trigger phrase 2"
---

# /your-skill

[Instructions for Claude to follow when this skill is invoked]
```

## Rules

- Keep SKILL.md under 500 lines.
- Write instructions as if briefing a colleague who just walked in.
- Be specific about what Claude should do, not vague.
- Use AskUserQuestion for decisions, not assumptions.
- If the skill needs reference material, put it in a references/ folder
  one level deep from SKILL.md.

## Example

A skill that reviews code before committing:

```yaml
---
name: pre-commit-check
description: |
  Reviews staged changes before committing. Checks for secrets,
  console.logs, and TODO comments.
  Use when: "check my code", "review before commit", "pre-commit"
---

# /pre-commit-check

1. Run `git diff --staged` to see what's about to be committed.
2. Check for: hardcoded secrets, console.log/print statements,
   TODO/FIXME comments, files over 500 lines.
3. Report findings. If clean, say "Ready to commit."
4. If issues found, ask: fix them now or commit anyway?
```

## Installing Your Skill

Save the folder to `~/.claude/skills/your-skill/`.
Type `/your-skill` in any Claude Code session. It just works.
