# Paternity Leave Request

## Summary

In `#team-leave`, Sarah asks who's taking leave this month. Alex says he wants leave, then opens Slackbot and applies for paternity leave. The bot collects his dates and sends the request to Sarah. When Sarah approves, Alex gets a confirmation.

## Personas

| Name | Role | In the demo |
|------|------|-------------|
| Sarah Chen | Manager | Asks in the channel; later approves in Slackbot |
| Alex Kim | Employee | Replies in the channel; applies for leave via Slackbot |
| Slackbot | App | Guides the leave flow and routes the approval |

## Flow (ordered)

1. **Channel `#team-leave`:** Sarah asks: "Who's taking leave this month?"
2. **Channel:** Alex replies: "I'd like to take leave."
3. **Alex opens Slackbot** — demo shows channel and Slackbot side by side.
4. **DM (Alex & Slackbot):** Alex: "I want to apply for paternity leave."
5. Slackbot shares policy and a **Choose dates** button.
6. Alex clicks **Choose dates**; a date picker opens.
7. Alex selects **March 15–22** and submits.
8. **Sarah's view:** She sees in Slackbot: Alex requested paternity leave Mar 15–22 — approve or reject?
9. Sarah clicks **Approve**.
10. Slackbot confirms to Sarah that Alex was informed.
11. **Back to Alex:** Slackbot confirms: leave approved for March 15–22.
