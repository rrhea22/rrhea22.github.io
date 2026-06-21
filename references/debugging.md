# Debugging Guide

When something breaks, follow this order. Don't skip steps.

## 1. Investigate

- Read the full error message. Don't skim it.
- Copy the error and paste it to Claude: "I got this error: [paste]. What happened?"
- Check what changed recently: ask Claude "What did you just change?"

## 2. Analyze

- Claude traces backward from the error to the source.
- If the error is in a file Claude just edited, the fix is usually in that file.
- If the error is in a dependency, it might be a version issue.

## 3. Hypothesize

- Claude forms a theory about what's wrong.
- Claude tests the theory before writing a fix (log statement, assertion).
- If the theory is wrong, Claude tries another one. No blind patching.

## 4. Fix

- Smallest possible change that fixes the root cause.
- Claude runs the code to verify the fix works.
- Claude commits after verifying.

## Hard Stop

If three theories fail, the problem is probably structural, not a
simple bug. Ask Claude: "Is this a design problem, not a code
problem?" Step back and look at the bigger picture.

## Quick Fixes

- "I got this error: [paste error]" - Claude debugs it.
- "Something broke after the last change. Undo it." - Claude reverts.
- "This worked before but doesn't now." - Claude checks git log for what changed.
- `/clear` then re-explain the problem - fresh start if Claude is going in circles.
