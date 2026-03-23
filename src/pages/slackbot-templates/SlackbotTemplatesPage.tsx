import { useState, useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  getAllTemplates,
  getTemplateComponent,
  type SlackResponseTemplate,
} from '@/extensions/slackResponseTemplateRegistry'
import { OAuthPermissionModal } from '@/components/demo/OAuthPermissionModal'

export function SlackbotTemplatesPage() {
  const [templates, setTemplates] = useState<SlackResponseTemplate[]>([])

  const loadTemplates = () => setTemplates(getAllTemplates())
  useEffect(() => { loadTemplates() }, [])

  const pageStyle = { backgroundColor: 'var(--slack-msg-hover)' }
  const mutedStyle = { color: 'var(--slack-msg-muted)' }
  const textStyle = { color: 'var(--slack-text)' }

  return (
    <div className="min-h-screen flex flex-col" style={pageStyle}>
      <header
        className="flex-shrink-0 px-6 py-4 border-b flex items-center justify-between"
        style={{ backgroundColor: 'var(--slack-pane-bg)', borderColor: 'var(--slack-border)' }}
      >
        <Link
          to="/"
          className="font-semibold text-[15px] hover:underline focus:outline-none focus:underline"
          style={{ color: 'var(--slack-text)' }}
        >
          ← Back
        </Link>
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
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full py-6 px-6">
        <h1 className="font-black text-xl mb-6" style={{ ...textStyle, fontSize: '60px', paddingTop: 0, paddingBottom: 0 }}>
          Slackbot templates
        </h1>
        <p className="text-sm mb-6" style={mutedStyle}>
          All Slackbot replies in demos use only these templates. Edit labels and options here; changes will reflect in every demo.
        </p>
        <div className="space-y-4">
          {templates.map((t) => (
            <TemplateCard key={t.id} template={t} />
          ))}
        </div>
      </main>
    </div>
  )
}

function TemplateCard({ template }: { template: SlackResponseTemplate }) {
  const Component = getTemplateComponent(template.type)
  const sampleContent = getSampleContent(template.type)

  if (template.id === 'connect_oauth_card' && Component) {
    return (
      <div
        className="rounded-lg border p-4 flex flex-wrap gap-4 items-start justify-between"
        style={{ backgroundColor: 'var(--slack-pane-bg)', borderColor: 'var(--slack-border)' }}
      >
        <div className="flex-1 min-w-0 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold" style={{ color: 'var(--slack-text)' }}>{template.name}</span>
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{ backgroundColor: 'var(--slack-msg-hover)', color: 'var(--slack-msg-muted)' }}
              >
                {template.id}
              </span>
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--slack-msg-muted)' }}>{template.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--slack-text)' }}>
              Slack message (in-flow connect card)
            </h4>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--slack-msg-muted)' }}>
              How the template appears in chat when you use <code className="px-1 py-0.5 rounded text-[11px]" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>templateId: &quot;connect_oauth_card&quot;</code> on an{' '}
              <code className="px-1 py-0.5 rounded text-[11px]" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>app_message</code> (same layout as the live demo).
            </p>
            <div
              className="rounded border p-4 overflow-x-auto"
              style={{ borderColor: 'var(--slack-border)', backgroundColor: '#ffffff' }}
            >
              <SlackbotMessageRowPreview
                author="HR Service Agent"
                timestamp="Just now"
              >
                <Component content={sampleContent} config={template.config} />
              </SlackbotMessageRowPreview>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--slack-text)' }}>
              OAuth permission modal (after Allow Access)
            </h4>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--slack-msg-muted)' }}>
              Shown when the story chains <code className="px-1 py-0.5 rounded text-[11px]" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>user_action</code> →{' '}
              <code className="px-1 py-0.5 rounded text-[11px]" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>modal_open</code> with{' '}
              <code className="px-1 py-0.5 rounded text-[11px]" style={{ backgroundColor: 'var(--slack-msg-hover)' }}>view: &quot;oauth-permission&quot;</code>. Buttons here are inert in this preview.
            </p>
            <div
              className="rounded border p-4 flex justify-center"
              style={{
                borderColor: 'var(--slack-border)',
                backgroundColor: 'var(--slack-main-bg)',
              }}
            >
              <OAuthPermissionModal
                embedded
                modalTitle="Sign in to Cornerstone with Slack"
                integrationName="Cornerstone"
                appName="HR Service Agent"
                onAllow={() => {}}
                onCancel={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-lg border p-4 flex flex-wrap gap-4 items-start justify-between"
      style={{ backgroundColor: 'var(--slack-pane-bg)', borderColor: 'var(--slack-border)' }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold" style={{ color: 'var(--slack-text)' }}>{template.name}</span>
          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--slack-msg-hover)', color: 'var(--slack-msg-muted)' }}>
            {template.id}
          </span>
        </div>
        <p className="text-sm mb-3" style={{ color: 'var(--slack-msg-muted)' }}>{template.description}</p>
        {Component && (
          <div className="rounded border p-3 mt-[8px]" style={{ borderColor: 'var(--slack-border)', backgroundColor: 'var(--slack-main-bg)' }}>
            <span className="text-xs font-medium block mb-2" style={{ color: 'var(--slack-msg-muted)' }}>Preview</span>
            <Component content={sampleContent} config={template.config} />
          </div>
        )}
      </div>
    </div>
  )
}

/** Matches ChatView message row for app (Slackbot) messages — avatar, header, body. */
function SlackbotMessageRowPreview({
  author,
  timestamp,
  children,
}: {
  author: string
  timestamp: string
  children: ReactNode
}) {
  return (
    <div className="flex gap-3 py-0 w-full max-w-[672px]">
      <img
        src="/assets/slackbot-icon.png"
        alt=""
        className="w-9 h-9 rounded-lg flex-shrink-0 object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-start gap-2 h-[18px] m-0 mb-0.5">
          <span className="font-extrabold text-[15px]" style={{ color: 'var(--slack-text)' }}>
            {author}
          </span>
          <span className="text-[11px]" style={{ color: 'var(--slack-msg-muted)' }}>
            {timestamp}
          </span>
        </div>
        {children}
      </div>
    </div>
  )
}

function getSampleContent(type: string): Record<string, unknown> {
  switch (type) {
    case 'plain_text':
      return { text: 'Sample reply text.' }
    case 'text_with_buttons':
      return { text: 'Choose an option:', choices: ['Option A', 'Option B'] }
    case 'thinking':
    case 'thinking_with_status':
      return { statusText: 'Looking into Slack history...' }
    case 'construct_case':
      return {
        caseTitle: 'Case #123',
        caseStatus: 'Open',
        caseFields: [
          { label: 'Status', value: 'Open' },
          { label: 'Priority', value: 'High' },
        ],
        choices: ['Claim Case', 'View Full Assessment'],
      }
    case 'connect_oauth_card':
      return {
        text: "I'd be happy to find those internal roles and skill gaps for you! First, I just need your permission to securely access your Cornerstone learning profile.",
        choices: ['Allow Access'],
        personaNames: ['Alex Rivera', 'Sarah Chen'],
      }
    default:
      return { text: 'Sample' }
  }
}
