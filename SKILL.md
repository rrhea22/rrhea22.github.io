---
name: starter-pack
description: |
  Interactive guide for building your first project with Claude Code.
  Installs plugins, interviews you about your project, generates a
  CLAUDE.md, and launches brainstorming. Adapts to your experience.
  Use when: "start a project", "build something", "I'm new", "help me
  build", "starter pack", "guide me", "set up a new project"
---

# /starter-pack

Interactive onboarder for Claude Code. Installs what you need, asks
what you want to build, sets up your project, and gets you started.

## Preamble: Check Dependencies

**RULE FOR ALL PLUGIN INSTALLS:** When asking the user to paste a
/plugin or /reload-plugins command, show the command, say "tell me
when it's done or say skip", and STOP. Do NOT use AskUserQuestion.
Do NOT ask a follow-up. Wait for the user's next message. They
need time to paste and see the result. This applies to every
/plugin command in the setup below.

Run ALL checks below first (silently), then show the user a
progress checklist before starting any installs:

```
Setup checklist:
1. Planning tools (gstack)           — [installed/needs install]
2. Brainstorming tools (superpowers) — [installed/needs install]
3. Code intelligence (LSP)           — [installed/optional]
4. GitHub connection                 — [ready/needs setup]
```

Then work through each item that needs attention, IN ORDER,
top to bottom. Update the checklist after each step completes.
Do NOT skip ahead. Do NOT start the interview until every item
shows either "done" or "skipped."

### Step 1: Check gstack

```bash
if [ -d "$HOME/.claude/skills/gstack" ] && [ -f "$HOME/.claude/skills/gstack/VERSION" ]; then
  echo "GSTACK: installed"
else
  echo "GSTACK: missing"
fi
```

If `GSTACK: missing`:

Tell the user: "I need to install a planning toolkit called gstack.
It gives you structured workflows for brainstorming, reviewing, and
shipping your project. This takes about 30 seconds."

Run:
```bash
git clone https://github.com/garrytan/gstack.git ~/.claude/skills/gstack 2>&1
```

Then run the setup:
```bash
cd ~/.claude/skills/gstack && ./setup 2>&1
```

If setup fails with "bun is required but not installed":
```bash
which brew >/dev/null 2>&1 && echo "HAS_BREW: yes" || echo "HAS_BREW: no"
```

If `HAS_BREW: yes`, run:
```bash
brew install oven-sh/bun/bun
```

If `HAS_BREW: no`, tell the user: "I need to install bun (a tool
that gstack requires). Paste this command:"

`/bin/bash -c "$(curl -fsSL https://bun.sh/install)"`

After bun is installed, retry the setup:
```bash
cd ~/.claude/skills/gstack && ./setup 2>&1
```

If the clone fails, tell the user exactly what went wrong and how
to fix it. Common issues: no internet, git not installed, permission
denied. Don't proceed until gstack is installed.

### Step 2: Check superpowers

```bash
if [ -f "$HOME/.claude/plugins/installed_plugins.json" ]; then
  grep -q "superpowers" "$HOME/.claude/plugins/installed_plugins.json" 2>/dev/null && echo "SUPERPOWERS: installed" || echo "SUPERPOWERS: missing"
else
  echo "SUPERPOWERS: missing"
fi
```

If `SUPERPOWERS: missing`:

First check if the plugin marketplace exists:

```bash
[ -d "$HOME/.claude/plugins/marketplaces/claude-plugins-official" ] && echo "MARKETPLACE: exists" || echo "MARKETPLACE: missing"
```

If `MARKETPLACE: missing`, tell the user: "I need to set up the
plugin library first. Paste this command and hit enter:"

`/plugin marketplace add anthropics/claude-plugins-official`

"Tell me when it's done."

Once the marketplace is ready (or was already there), tell the
user: "Now paste this to install the brainstorming toolkit:"

`/plugin install superpowers@claude-plugins-official`

"Tell me when it's done, or say 'skip' to continue without it."

### Step 3: Check LSP Servers

```bash
if [ -f "$HOME/.claude/plugins/installed_plugins.json" ]; then
  grep -qi "lsp\|pyright\|typescript-language" "$HOME/.claude/plugins/installed_plugins.json" 2>/dev/null && echo "LSP: installed" || echo "LSP: missing"
else
  echo "LSP: missing"
fi
```

If `LSP: installed`, skip this section silently.

If `LSP: missing`, tell the user: "One more optional thing. LSP
servers give Claude better code intelligence so it can navigate
your project faster. Or say 'skip' to continue without them."

Install the language servers silently:

```bash
npm i -g pyright typescript-language-server typescript 2>&1
```

If the install fails (e.g. npm not found, permission denied),
tell the user what went wrong and how to fix it. Otherwise
continue without mentioning it.

Tell the user: "Paste this to add the TypeScript plugin:"

`/plugin install typescript-lsp`

"Tell me when it's done, or say 'skip'. Then we'll do Python."

Then: "And this one for Python:"

`/plugin install pyright-lsp`

"Tell me when it's done, or say 'skip'."

If the user skips it, continue without it.

### Reload plugins

If ANY plugins were installed in steps 2 or 3 (superpowers or
LSP), tell the user: "Last thing. Paste this to activate
everything you just installed:"

`/reload-plugins`

If nothing was installed (everything was already there or
skipped), skip this silently.

### Step 4: Check GitHub CLI

```bash
which gh >/dev/null 2>&1 && gh auth status 2>/dev/null && echo "GH: ready" || echo "GH: not ready"
```

If `GH: not ready`:

Tell the user: "GitHub CLI isn't set up yet. You'll need it when
you're ready to publish your project. We can set it up now or skip
it for later. Want to set it up now?"

If yes, walk them through it step by step:

On Mac:
```bash
brew install gh
```

On Windows:
```bash
winget install --id GitHub.cli
```

Then:
```bash
gh auth login
```

Walk through the prompts: GitHub.com, HTTPS, authenticate with
credentials, login with a web browser.

If no, say: "No problem. When you're ready to publish, just ask me
to set up GitHub CLI and I'll walk you through it."

### HARD GATE

Show the updated checklist with all items marked done or skipped.
Do NOT proceed until every step above is complete.

Then say: "Setup complete. Now let's figure out what you're
building."

### Run count

```bash
mkdir -p ~/.gstack/starter-pack
RUN_COUNT=$(cat ~/.gstack/starter-pack/run-count 2>/dev/null || echo "0")
RUN_COUNT=$((RUN_COUNT + 1))
echo "$RUN_COUNT" > ~/.gstack/starter-pack/run-count
echo "RUN: $RUN_COUNT"
```

## Phase 1: Interview

Ask these questions one at a time using AskUserQuestion. Wait for
each answer before asking the next. Don't rush.

If the user says "go back", "start over", "I changed my mind", or
"I want to pick something else" at any point, go back to the
previous question or restart the interview from the beginning.
Tell them: "No problem. Let's go back."

If `RUN` is 1 through 5 (beginner):

Tell the user: "Everything's set up. Now let's figure out what
you're building. I'm going to ask you a few questions so I can set
up your project properly."

Ask these questions one at a time:

1. "What do you want to build?"
   Options: Portfolio/personal site, A tool for your job, A side
   project or creative idea, Something else (describe it)

2. "Who is this for?"
   Options: Myself (personal site/portfolio), My team or company,
   A specific audience (describe them), Not sure yet

3. "Do you have content ready to use? Things like your bio, project
   descriptions, writing samples, images."
   Options: Yes I have most of it ready, I have some but not all,
   Starting from scratch

4. "How should it look?"
   Options: Clean and minimal, Bold and colorful, Professional and
   polished, I don't have a preference

If `RUN` is 6 through 10 (intermediate):

Tell the user: "Welcome back. Let's set up your next project."

Ask one question:
1. "What are you building this time?"
   Free text answer.

If `RUN` is 11+ (experienced):

Tell the user: "What are you building?"
One question. Free text. Move fast.

## Phase 2: Generate CLAUDE.md

Check if a CLAUDE.md already exists in the current directory:

```bash
[ -f CLAUDE.md ] && echo "CLAUDE_EXISTS: yes" || echo "CLAUDE_EXISTS: no"
```

If `CLAUDE_EXISTS: yes`:

Use AskUserQuestion: "This folder already has a CLAUDE.md. What
should I do?"
Options:
- A) Merge my additions into the existing file (keeps your rules)
- B) Replace it with a fresh one (starts clean)
- C) Skip, don't touch it

If A: Read the existing CLAUDE.md, then append the generated
sections below any existing content.
If B: Overwrite with the generated content.
If C: Skip this phase entirely.

Generate a CLAUDE.md using the interview answers. Structure it like
this (substitute the user's actual answers):

```markdown
# Project

[One-line description from the user's answer to question 1]

## Tech Stack

[Suggest appropriate tech based on what they're building.
For a website: Astro + Tailwind or similar.
For a tool: whatever fits the use case.
Always explain WHY you're suggesting each technology.]

## Preferences

- Explain what you're doing as you build.
- Ask before making big architectural decisions.
- Commit to git after every major feature.

## Development Workflow

Follow this loop for every change:

1. Make the change.
2. Run the project and verify it works.
3. Check for errors in the terminal output.
4. Before committing: run tests if they exist.

Don't skip steps. Don't say "this should work" without running it.

## Plan Mode

- Enter plan mode for any task with 3+ steps.
- If something goes sideways, stop and re-plan.

## Self-Improvement

When the user says "add that to LESSONS.md" or "don't do that
again", write an entry to LESSONS.md with:
- What went wrong (one line)
- The rule to follow next time (one line)

At the start of every session, read LESSONS.md before doing
anything else. Follow every rule in it.

## Code Intelligence (LSP)

If LSP plugins are installed, NEVER use grep, find, or rg to
search code. Use the LSP tools instead. They are faster, more
accurate, and understand your code's structure. This is a hard
rule, not a suggestion.

## Things You Should NOT Do

- Don't make up information. Say when you're not sure.
- Don't make changes outside of what was asked for.
- Don't delete or overwrite files without asking first.
- Don't add features that weren't asked for.
- Don't commit without verifying the code runs first.

## Commands Reference

<!-- Commands will be added as the project develops -->
```

Tell the user: "I've created your project's CLAUDE.md with your
preferences. To make sure I follow these rules right now, paste
this:"

`read CLAUDE.md and follow all rules in it for the rest of this session`

"Claude reads this file automatically on future sessions, but
since I just created it mid-conversation, I need you to tell me
to read it. You only need to do this once, right now."

## Phase 3: Create LESSONS.md

```bash
[ -f LESSONS.md ] && echo "LESSONS_EXISTS: yes" || echo "LESSONS_EXISTS: no"
```

If `LESSONS_EXISTS: no`, create it:

```markdown
# Lessons

Claude updates this file when corrected. Each entry prevents the
same mistake from happening again.

<!-- Entries are added automatically. -->
```

## Phase 4: Launch Brainstorming

Tell the user: "Your project is set up. Now let's brainstorm what
you're building. I'm going to run /office-hours, which is an
interactive brainstorming session. It'll ask you questions to shape
your idea, challenge your assumptions, and help you figure out the
best approach."

If `RUN` is 1: Add: "After brainstorming, you'll use /plan-eng-review
to lock the technical approach, then execute-plan to build it. But
one step at a time. Let's start with the idea."

Read the /office-hours skill file at
`~/.claude/skills/gstack/office-hours/SKILL.md` and follow its
instructions. Skip these sections (this skill already handled them):
- Preamble (run first)
- Context Recovery
- AskUserQuestion Format
- Completeness Principle
- Search Before Building
- Completion Status Protocol
- Telemetry (run last)

Follow every other section at full depth.

## Reference Routing

When the user asks about specific topics during or after the skill
flow, read the appropriate reference file from this skill's
references/ directory:

- "How do I debug?" or error occurs → read references/debugging.md
- "What commands are available?" → read references/commands.md
- "How do I create a skill?" → read references/new-skill.md
- "What files should my project have?" → read references/project-setup.md
