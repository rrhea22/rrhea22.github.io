# Project Setup Checklist

Files every project should have. Ask Claude to create them during
planning if they don't exist.

## Required

| File | Purpose | When to create |
|------|---------|----------------|
| `CLAUDE.md` | How Claude should work in this project. | /starter-pack creates this for you. |
| `.gitignore` | Keeps secrets and junk out of your repo. | /starter-pack creates this for you. |

## Create During Planning

| File | Purpose | When to create |
|------|---------|----------------|
| `ARCHITECTURE.md` | Why the system is built this way. Prevents Claude from redesigning things. | After /plan-eng-review locks the approach. |
| `TODOS.md` | Current tasks and scope. Prevents Claude from inventing work. | After planning. Update as you go. |
| `CHANGELOG.md` | What already shipped. Prevents re-solving solved problems. | After each feature ships. |
| `LESSONS.md` | Mistakes and corrections. Prevents repeating errors. | /starter-pack creates this. Claude updates it when corrected. |

## For Larger Projects

If your project has subfolders (like a frontend/ and a backend/),
create a CLAUDE.md inside each subfolder with rules specific to
that part of the code. Then add this to your root CLAUDE.md:

```markdown
## Subfolder Rules

When working in /frontend, read frontend/CLAUDE.md first.
When working in /backend, read backend/CLAUDE.md first.
```

Claude doesn't automatically read subfolder CLAUDE.md files.
You need to tell it to in the root file.
