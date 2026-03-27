# AI Platform Readiness

Created by: Salesforce HR Service x Cornerstone

## Overview

Marcus, an Engineering Manager, needs a fast answer to a critical question: is his team ready for an upcoming AI platform rollout? Instead of pulling reports across multiple systems, he asks the Employee Agent directly in Slack.

The agent aggregates signals from Salesforce and Cornerstone, including skill coverage, learning progress, and compliance status, then returns a concise readiness summary with actionable next steps.

Marcus can act immediately in-flow from Slack (assign learning and send compliance reminders), while the agent continues to monitor outcomes and proactively reports progress.

## Personas

- **Marcus Lee** - Engineering Manager who needs a clear readiness readout and fast execution.
- **Engineering Team** - Engineers with mixed readiness levels, varying skill gaps, and compliance completion.
- **Employee Agent (Slack app)** - AI agent that synthesizes readiness signals, recommends interventions, and orchestrates execution.

## Story steps

1. **Marcus opens a DM with Employee Agent** in Slack.
2. **Marcus asks:** "Is my team ready for the upcoming AI platform rollout?"
3. **The agent analyzes data** from Salesforce and Cornerstone:
   - Skill coverage
   - Learning progress
   - Compliance status
   - Team performance signals
4. **The agent returns a summary:** team is partially ready (3 ready, 4 at-risk, 2 not ready), with a CTA to show breakdown.
5. **Marcus opens breakdown** from Slack.
6. **Breakdown view appears** with:
   - Readiness distribution (Ready / At-risk / Not ready)
   - Top skill gaps (deployment workflows, monitoring, pipeline debugging)
   - Compliance risk (2 missing governance training)
7. **Agent recommends actions** Marcus can trigger in-flow.
8. **Marcus executes actions:** assign learning for at-risk engineers and send compliance reminders.
9. **Agent confirms execution** and starts progress tracking.
10. **Marcus optionally opens individual details** (readiness %, skill gaps, learning progress, mentor suggestions).
11. **Two days later, proactive update:** 2 improved to ready, 1 compliance task completed, 1 still at risk.
12. **Marcus clicks "Nudge them"** to trigger follow-up.
13. **End-of-week update:** team reaches 80% readiness, with one final mentor recommendation.

## Design notes

- Slackbot voice is proactive, concise, and human-centered.
- Actionability is in-flow: Marcus can accept recommendations without leaving Slack.
- Message formatting uses clear hierarchy with short intros, bullets, and explicit calls-to-action.
