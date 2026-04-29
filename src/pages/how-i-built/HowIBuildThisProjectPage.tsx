import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const textStyle = { color: 'var(--slack-text)' }
const mutedStyle = { color: 'var(--slack-msg-muted)' }
const surfaceStyle = {
  backgroundColor: 'var(--slack-pane-bg)',
  borderColor: 'var(--slack-border)',
} as const

function Callout({
  title,
  children,
  tone = 'info',
}: {
  title: string
  children: ReactNode
  tone?: 'info' | 'success'
}) {
  const border =
    tone === 'success' ? 'var(--slack-btn-default-bg)' : 'var(--slack-mention)'
  const bg = tone === 'success' ? 'rgba(0, 122, 90, 0.08)' : 'var(--slack-mention-bg)'
  return (
    <aside
      className="rounded-lg border-l-4 p-4 my-6"
      style={{ borderLeftColor: border, backgroundColor: bg }}
      aria-label={title}
    >
      <p className="font-bold text-sm mb-2" style={textStyle}>
        {title}
      </p>
      <div className="text-[15px] leading-relaxed" style={mutedStyle}>
        {children}
      </div>
    </aside>
  )
}

function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto rounded-lg border my-4" style={surfaceStyle}>
      <table className="w-full text-left text-sm border-collapse">
        <thead>
          <tr style={{ backgroundColor: 'var(--slack-msg-hover)' }}>
            {headers.map((h) => (
              <th
                key={h}
                className="px-3 py-2 font-semibold border-b"
                style={{ ...textStyle, borderColor: 'var(--slack-border)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i % 2 === 1 ? '' : ''}
              style={{
                backgroundColor: i % 2 === 1 ? 'var(--slack-msg-hover)' : 'transparent',
              }}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-3 py-2 align-top border-b"
                  style={{ ...mutedStyle, borderColor: 'var(--slack-border)' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function HowIBuildThisProjectPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>
      <header
        className="sticky top-0 z-20 flex-shrink-0 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3"
        style={{ backgroundColor: 'var(--slack-pane-bg)', borderColor: 'var(--slack-border)' }}
      >
        <Link
          to="/"
          className="font-semibold text-[15px] hover:underline focus:outline-none focus:underline"
          style={{ color: 'var(--slack-text)' }}
        >
          ← Back
        </Link>
        <nav className="flex flex-wrap gap-2" aria-label="Related pages">
          <Link
            to="/design-system"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded text-sm font-semibold border transition hover:bg-[var(--slack-btn-hover-bg)]"
            style={{
              backgroundColor: 'var(--slack-btn-bg)',
              color: 'var(--slack-text)',
              borderColor: 'var(--slack-btn-secondary-border)',
            }}
          >
            Design system
          </Link>
          <Link
            to="/slackbot-templates"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded text-sm font-semibold border transition hover:bg-[var(--slack-btn-hover-bg)]"
            style={{
              backgroundColor: 'var(--slack-btn-bg)',
              color: 'var(--slack-text)',
              borderColor: 'var(--slack-btn-secondary-border)',
            }}
          >
            Slackbot templates
          </Link>
          <Link
            to="/view-headers"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded text-sm font-semibold border transition hover:bg-[var(--slack-btn-hover-bg)]"
            style={{
              backgroundColor: 'var(--slack-btn-bg)',
              color: 'var(--slack-text)',
              borderColor: 'var(--slack-btn-secondary-border)',
            }}
          >
            View headers
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 pb-16 space-y-12">
        <header className="space-y-3">
          <h1 className="font-black text-4xl sm:text-5xl leading-tight" style={textStyle}>
            How I build this project
          </h1>
          <p className="text-lg" style={mutedStyle}>
            A step-by-step journal of how I created the Slack Demos prototype system in Cursor — strategy, UI fit and
            finish, and the workflow that made it repeatable.
          </p>
          <p className="text-sm" style={mutedStyle}>
            Pritesh Chavan · Feb 27 – Apr 29, 2026 · Cursor Agent sessions + React + TypeScript + Tailwind
          </p>
        </header>

        {/* Stats */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">
            At a glance
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: '197+', label: 'Cursor sessions' },
              { value: '9', label: 'Demos in Demos/' },
              { value: '8', label: 'Step types' },
              { value: '~2 mo', label: 'Build span' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-lg border p-4 text-center"
                style={surfaceStyle}
              >
                <div className="text-2xl font-black tabular-nums" style={textStyle}>
                  {s.value}
                </div>
                <div className="text-xs font-semibold mt-1 uppercase tracking-wide" style={mutedStyle}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border p-6 bg-white space-y-4" style={{ borderColor: 'var(--slack-border)' }}>
          <h2 className="font-bold text-xl" style={textStyle}>
            1. What I set out to solve
          </h2>
          <p className="text-[15px] leading-relaxed" style={mutedStyle}>
            I needed customer- and exec-ready Slack stories without spinning up a real workspace, without screenshots
            that drift from the product, and without pulling engineering into every narrative tweak. The answer was a
            self-contained browser app that looks and behaves like Slack: channels, DMs, threads, modals, typing, and
            multi-persona perspectives — all driven by story data.
          </p>
        </section>

        <section className="rounded-xl border p-6 bg-white space-y-4" style={{ borderColor: 'var(--slack-border)' }}>
          <h2 className="font-bold text-xl" style={textStyle}>
            2. Strategy (three pillars)
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-[15px] leading-relaxed" style={mutedStyle}>
            <li>
              <strong style={textStyle}>Story-first.</strong> I write who is in the chat, what happens in order, and
              when the “camera” switches personas before I worry about JSON. The story is the contract; the demo is the
              implementation.
            </li>
            <li>
              <strong style={textStyle}>Tight loops in Cursor.</strong> One clear goal per session — preview in the
              browser, describe fixes in plain language, let the agent apply them, repeat.
            </li>
            <li>
              <strong style={textStyle}>Slack fidelity.</strong> If it doesn’t look trustworthy at a glance, it doesn’t
              ship. I used Slack Kit references, SingleFile captures of real Slack, and hundreds of SVGs aligned to the
              icon spec.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border p-6 bg-white space-y-4" style={{ borderColor: 'var(--slack-border)' }}>
          <h2 className="font-bold text-xl" style={textStyle}>
            3. How the product evolved
          </h2>
          <DocTable
            headers={['Phase', 'What I focused on', 'Outcomes']}
            rows={[
              [
                'Inception (Feb 27)',
                'Vision, stack, first demo',
                'Vite + React + TS + Tailwind; story-driven steps; Paternity Leave as proof',
              ],
              [
                'Personas & landing (Mar 1)',
                'Per-persona flows, Lato, Slack Kit',
                'Folder convention `Demos/<Title> by <Creator>/`; persona JSON with stepIds; landing + /demo routes',
              ],
              [
                'Canvas & instructions (Mar 2)',
                'Plain-text stories, generation rules',
                'Canvas page; DEMO_GENERATION_INSTRUCTIONS.md; Cursor rule; Slackbot templates page',
              ],
              [
                'Engine & surfaces (Mar 3–5)',
                'Threads, channels, lean step tape',
                'StoryEngine growth; viewport + channel/thread; auto-advance; validators',
              ],
              [
                'Pixel polish (Mar)',
                'Composer, header, rail, sidebar',
                'Inline SVGs; 28×28 composer controls; hover actions; desktop header + sprites',
              ],
              [
                'Templates & OAuth (Mar 22+)',
                'Block Kit import, connect flows',
                'OAuth card + permission modal; template registry; bulk import from Builder URLs',
              ],
              [
                'Mission Control (Apr)',
                'Split view + embedded tower',
                'MissionControlTowerPanel; Leaflet map; Order Processing Agent demo',
              ],
              [
                'Ship & narrate (Apr)',
                'Heroku, share links, talk track',
                'Shared demo URLs; demo_narration.md for leadership walkthroughs',
              ],
            ]}
          />
        </section>

        <section className="rounded-xl border p-6 bg-white space-y-4" style={{ borderColor: 'var(--slack-border)' }}>
          <h2 className="font-bold text-xl" style={textStyle}>
            4. Step types (the grammar of every demo)
          </h2>
          <DocTable
            headers={['Type', 'Role']}
            rows={[
              ['surface', 'Switch DM, channel, or app home; optional dual viewport'],
              ['user_message', 'User sends text or slash command'],
              ['app_message', 'Slackbot reply — templateId, choices, case fields'],
              ['user_action', 'Button / shortcut; drives next beat'],
              ['modal_open / modal_submit', 'Date picker, OAuth permission, etc.'],
              ['thread_reply', 'Thread under a channel message'],
              ['bot_typing', 'Thinking line + optional statusText'],
            ]}
          />
        </section>

        <section className="rounded-xl border p-6 bg-white space-y-4" style={{ borderColor: 'var(--slack-border)' }}>
          <h2 className="font-bold text-xl" style={textStyle}>
            5. UI fit and finish
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed" style={mutedStyle}>
            <li>
              <strong style={textStyle}>Design tokens</strong> in CSS variables — sidebar aubergine, mention pills,
              button green, surfaces — so the app stays on-brand with Slack.
            </li>
            <li>
              <strong style={textStyle}>Foundation page</strong> (/design-system) documents buttons, type scale,
              inputs, and cards so changes propagate intentionally.
            </li>
            <li>
              <strong style={textStyle}>Click-through overlay</strong> so → or a click advances; optional ?edit=true to
              inspect layout without the overlay eating pointer events.
            </li>
            <li>
              <strong style={textStyle}>Intro + persona bar</strong> — title, creator, keyboard hints, “View as,” and
              step context for presenters.
            </li>
            <li>
              <strong style={textStyle}>Normalization</strong> — choices attach to the right app_message; short
              acknowledgements after actions when the story doesn’t need a custom line.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border p-6 bg-white space-y-4" style={{ borderColor: 'var(--slack-border)' }}>
          <h2 className="font-bold text-xl" style={textStyle}>
            6. How I used Cursor day to day
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed" style={mutedStyle}>
            <li>
              <strong style={textStyle}>Instruction files</strong> — STORY_BUILDING_GUIDE.md and
              DEMO_GENERATION_INSTRUCTIONS.md act as persistent memory for every “generate this demo” session.
            </li>
            <li>
              <strong style={textStyle}>Browser-driven CSS</strong> — capture tweaks from preview, paste into chat,
              commit in source so the UI matches what I saw.
            </li>
            <li>
              <strong style={textStyle}>Git checkpoints</strong> before risky refactors; RESTORE_POINT.md when JSON or
              validators go wrong.
            </li>
            <li>
              <strong style={textStyle}>Rules & personas</strong> — user rules for accessibility and enterprise UX;
              Slackbot voice (concise, proactive, human-in-the-loop) encoded in generation instructions.
            </li>
          </ul>
          <Callout title="Why this mattered">
            The quality of the demos scaled with the quality of the instructions. Investing once in the generation doc
            paid back on every new scenario (relocation, payroll, confidential report, Mission Control, etc.).
          </Callout>
        </section>

        <section className="rounded-xl border p-6 bg-white space-y-4" style={{ borderColor: 'var(--slack-border)' }}>
          <h2 className="font-bold text-xl" style={textStyle}>
            7. Tech stack (where it lives)
          </h2>
          <DocTable
            headers={['Layer', 'Choice']}
            rows={[
              ['UI', 'React 19 + TypeScript + Tailwind 4'],
              ['Build', 'Vite (import.meta.glob loads Demos/**/*.json)'],
              ['Routing', 'React Router — /, /canvas, /reference, /design-system, /demo/:id, …'],
              ['Playback', 'StoryEngine.tsx — steps, personas, viewports, modals, timing'],
              ['Extensibility', 'extensions/stepTypes, validators, slackResponseTemplateRegistry'],
              ['Deploy', 'Heroku — static build + serve -s dist'],
            ]}
          />
        </section>

        <section className="rounded-xl border p-6 bg-white space-y-4" style={{ borderColor: 'var(--slack-border)' }}>
          <h2 className="font-bold text-xl" style={textStyle}>
            8. Demos in this repo
          </h2>
          <p className="text-[15px] leading-relaxed" style={mutedStyle}>
            Each folder under <code className="text-xs px-1 rounded" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>Demos/</code> has{' '}
            <code className="text-xs px-1 rounded" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>story.md</code>,{' '}
            <code className="text-xs px-1 rounded" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>demo.json</code>, and per-user{' '}
            <code className="text-xs px-1 rounded" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>*.json</code> persona configs.
          </p>
          <DocTable
            headers={['Demo', 'Notes']}
            rows={[
              ['Paternity Leave Request', 'First end-to-end flow; date picker; manager approval'],
              ['Confidential Report', 'Sensitive routing; ER handoff'],
              ['Employee Relocation Resolution', 'Channel + thread + dual view; long orchestration'],
              ['Payslip Discrepancy / Regional Payroll Sync', 'Payroll ops + batch remediation narratives'],
              ['Career Advocate Promotion Flow', 'Coaching, SMART goals, manager approval'],
              ['AI Platform Readiness', 'Readiness roll-up and in-flow actions'],
              ['In-Flow Cornerstone Auth', 'OAuth card + permission modal'],
              ['Order Processing Agent Policy Breach', 'Mission Control split view; governance story'],
            ]}
          />
        </section>

        <Callout title="Executive framing" tone="success">
          Outcome first: Slack-native fidelity, multi-persona storytelling, and a repeatable path from prose to
          shareable link — so design and partners can standardize quality without waiting on production builds for every
          narrative iteration. See <code className="text-xs px-1 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>demo_narration.md</code> in the workspace root for a ready-made talk track.
        </Callout>

        <p className="text-sm text-center pt-4" style={mutedStyle}>
          This page mirrors the structure of the Cursor canvas documentation — kept in the app so anyone with the link
          can read how the system was built, not only how it runs.
        </p>
      </main>
    </div>
  )
}
