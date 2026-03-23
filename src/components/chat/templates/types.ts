import type { SlackResponseTemplateConfig } from '@/extensions/slackResponseTemplateRegistry'

export interface TemplateRenderProps {
  content: {
    text?: string
    choices?: string[]
    personaNames?: string[]
    statusText?: string
    caseTitle?: string
    caseFields?: { label: string; value: string }[]
    connectCardTitle?: string
    connectCardBody?: string
    connectCardFooter?: string
    oauthConnected?: boolean
    connectConnectedTitle?: string
    connectConnectedBody?: string
    [key: string]: unknown
  }
  config: SlackResponseTemplateConfig
  timestamp?: string
}
