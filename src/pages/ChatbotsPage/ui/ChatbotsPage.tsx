import { ChatbotActions } from '@features/ChatbotActions'

import { ChatbotsTable } from '@widgets/tables/ChatbotsTable'

import { Page } from '@shared/ui/Page'

const ChatbotPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Chatbot', icon: 'chat' }]}
      id="chatbot-page"
    >
      <ChatbotActions />

      <ChatbotsTable />
    </Page>
  )
}

export default ChatbotPage
