import { ChatsTable } from '@widgets/tables/ChatsTable'

import { Page } from '@shared/ui/Page'

const ChatsPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Chats', icon: 'chat' }]}
      id="chats-page"
    >
      <ChatsTable />
    </Page>
  )
}

export default ChatsPage
