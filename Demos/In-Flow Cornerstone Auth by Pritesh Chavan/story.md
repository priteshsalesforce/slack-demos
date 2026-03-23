# In-Flow Cornerstone Auth

## Overview

This demo shows **in-flow context preservation** when an employee asks the HR Service Agent for personalized learning guidance. Today, many flows force people out of Slack—through Salesforce, then Cornerstone or Workday—breaking conversational context. Here, an **in-channel Block Kit–style authorization card** (rendered in the demo UI as a structured message with a primary CTA) requests permission, drives OAuth via Slack’s stored site context (**Unified Live**), and returns the user to the same Slack thread so the agent can finish the original request without a repeat prompt.

## Personas

- **Alex Rivera** — Employee asking a user-specific career question in DM with the HR Service Agent.
- **HR Service Agent (Agentforce)** — App persona that detects missing Cornerstone authorization, surfaces the auth card, and after connection delivers role-based course recommendations.

## User journey

1. **Trigger** — Alex asks what courses to take toward a Senior Analyst role.
2. **401 path** — The agent calls the multi-cloud layer; Cornerstone returns unauthorized. The agent immediately posts the **Connect to Cornerstone** card: header, purpose, fine print, and **Authenticate Account**.
3. **Action** — Alex clicks **Authenticate Account**. Behind the scenes, the redirect uses Slack’s stored context so Cornerstone OAuth opens without a Salesforce portal detour.
4. **Return** — After sign-in, the callback brings Alex back to Slack; the card state updates to **Cornerstone connected**.
5. **Resolution** — The agent resumes the original intent and replies with concrete course recommendations and skill gaps—no need to re-type the question.

## Design notes

- Copy is conversational, trustworthy, and actionable (one-time connection, no password storage).
- Slackbot voice follows the project Slack persona: proactive, clear, warm, with *I’ve noticed…* / *I’ve handled…* framing where it fits.
