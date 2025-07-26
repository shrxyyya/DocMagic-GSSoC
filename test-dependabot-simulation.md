# Test Dependabot Auto-Merge Simulation

This is a test file to simulate a Dependabot PR for testing the auto-merge functionality.

## What this simulates:
- A Dependabot PR that updates dependencies
- The CI workflow should run and pass
- Auto-approval and auto-merge should trigger

## Test Steps:
1. This branch simulates a Dependabot PR
2. Push this branch to trigger the workflow
3. Check if the dependabot-auto-merge job runs
4. Verify auto-approval and auto-merge functionality

## Expected Behavior:
- ✅ CI tests should pass
- ✅ dependabot-auto-merge job should run
- ✅ PR should be auto-approved
- ✅ PR should be auto-merged (if configured)

---
*This is a test simulation - not a real dependency update* 