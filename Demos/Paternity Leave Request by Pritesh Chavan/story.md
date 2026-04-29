# Paternity Leave Request

## One short summary
Alex requests paternity leave through Slackbot, which presents the company policy, collects his preferred dates via a date picker, and routes the request to his manager Sarah for approval — completing the full loop with a confirmation back to Alex.

## Personas
- **Alex** – Senior Developer (Employee requesting leave)
- **Sarah** – Engineering Manager (Approver)
- **Slackbot** – AI Assistant (policy guide, request router, and approval orchestrator)

## Story flow
1. Alex opens his DM with Slackbot.
2. Alex says: "I want to apply for paternity leave."
3. Slackbot replies with the Acme Inc paternity leave policy and a "Choose Dates" button.
4. Alex clicks "Choose Dates" and a date picker modal opens.
5. Alex selects March 15–22, 2026 and submits.
6. Slackbot confirms the request has been submitted and that Sarah will be notified.
7. We switch to Sarah's screen. She sees a message from Slackbot: "Alex Kim has requested paternity leave March 15–22. Approve or reject?"
8. Sarah clicks Approve.
9. Slackbot tells Sarah it has recorded the approval and informed Alex.
10. We switch back to Alex's screen. Slackbot tells Alex: "Your leave has been approved. You're all set for March 15–22!"
