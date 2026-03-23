import type { TemplateRenderProps } from './types'
import { registerTemplateComponent } from '@/extensions/slackResponseTemplateRegistry'
import { formatMessageWithMentions } from '@/components/chat/formatMessageWithMentions'
import { ExternalLink, CheckCircle2 } from 'lucide-react'

interface ConnectOAuthCardMessageProps extends TemplateRenderProps {
  onChoiceClick?: (choice: string) => void
}

const accentPending = '#611f69'
const accentConnected = '#1d1c1d'
const cardBgPending = '#f5f5f5'

function ConnectOAuthCardMessage({ content, config, onChoiceClick }: ConnectOAuthCardMessageProps) {
  const personaNames = (content.personaNames as string[] | undefined) ?? []
  const oauthConnected = Boolean(content.oauthConnected)
  const intro = content.text as string | undefined
  const title =
    (content.connectCardTitle as string | undefined) ??
    (config.defaultCardTitle as string | undefined) ??
    'Connect'
  const body =
    (content.connectCardBody as string | undefined) ??
    (config.defaultCardBody as string | undefined) ??
    ''
  const footer =
    (content.connectCardFooter as string | undefined) ??
    (config.defaultCardFooter as string | undefined) ??
    ''
  const choices = oauthConnected ? [] : (content.choices as string[] | undefined) ?? []
  const showExternal =
    config.showExternalLinkIcon === undefined ? true : Boolean(config.showExternalLinkIcon)

  const connectedTitle =
    (content.connectConnectedTitle as string | undefined) ??
    (config.defaultConnectedTitle as string | undefined) ??
    'Cornerstone Connected'
  const connectedBody =
    (content.connectConnectedBody as string | undefined) ??
    (config.defaultConnectedBody as string | undefined) ??
    'Your account is successfully linked. Resuming your original request...'

  if (oauthConnected) {
    return (
      <>
        {intro && (
          <div
            className="text-[15px] leading-relaxed whitespace-pre-wrap break-words mb-3"
            style={{ color: 'var(--slack-text)' }}
          >
            {formatMessageWithMentions(intro, personaNames)}
          </div>
        )}
        <div
          className="rounded-lg overflow-hidden flex min-w-0 border border-solid"
          style={{
            backgroundColor: '#ffffff',
            borderColor: 'rgba(97, 96, 97, 0.13)',
            borderLeftWidth: 4,
            borderLeftColor: accentConnected,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
          }}
        >
          <div className="flex-1 min-w-0 px-4 py-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2
                className="w-5 h-5 shrink-0"
                style={{ color: 'var(--slack-btn-default-bg)' }}
                strokeWidth={2}
                aria-hidden
              />
              <span className="font-bold text-[15px]" style={{ color: 'var(--slack-text)' }}>
                {connectedTitle}
              </span>
            </div>
            <p
              className="text-[15px] leading-relaxed font-bold italic flex items-start gap-2"
              style={{ color: 'var(--slack-btn-default-bg)' }}
            >
              <span className="select-none shrink-0" aria-hidden>
                ✅
              </span>
              <span>{connectedBody}</span>
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {intro && (
        <div
          className="text-[15px] leading-relaxed whitespace-pre-wrap break-words mb-3"
          style={{ color: 'var(--slack-text)' }}
        >
          {formatMessageWithMentions(intro, personaNames)}
        </div>
      )}
      <div
        className="rounded-lg overflow-hidden flex min-w-0"
        style={{
          backgroundColor: cardBgPending,
          borderLeft: `4px solid ${accentPending}`,
        }}
      >
        <div className="flex-1 min-w-0 px-4 py-4">
          <div
            className="flex items-center gap-2 font-bold text-[15px] leading-snug mb-2"
            style={{ color: 'var(--slack-text)' }}
          >
            <span className="select-none" aria-hidden>
              🔒
            </span>
            <span>{title}</span>
          </div>
          {body && (
            <p
              className="text-[15px] leading-relaxed break-words mb-2"
              style={{ color: 'var(--slack-text)' }}
            >
              {formatMessageWithMentions(body, personaNames)}
            </p>
          )}
          {footer && (
            <p
              className="flex items-start gap-1.5 text-[13px] leading-relaxed italic mb-3"
              style={{ color: 'var(--slack-msg-muted)' }}
            >
              <span className="select-none shrink-0 mt-0.5" aria-hidden>
                🛡️
              </span>
              <span>{footer}</span>
            </p>
          )}
          {choices.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              {choices.map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => onChoiceClick?.(choice)}
                  className="inline-flex items-center justify-center gap-1.5 flex-shrink-0 px-3 py-2 rounded-lg text-[13px] font-semibold whitespace-nowrap transition hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--slack-btn-default-bg)',
                    color: 'var(--slack-btn-default-text)',
                    height: 36,
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                  }}
                >
                  {choice}
                  {showExternal && (
                    <ExternalLink className="w-3.5 h-3.5 opacity-95 shrink-0" strokeWidth={2.25} aria-hidden />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

registerTemplateComponent('connect_oauth_card', ConnectOAuthCardMessage)
export { ConnectOAuthCardMessage }
