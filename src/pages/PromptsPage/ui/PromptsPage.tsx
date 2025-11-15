import { PromptsTable } from '@widgets/tables/PromptsTable'

import { Page } from '@shared/ui/Page'

const PromptsPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Prompts', icon: 'smart_toy' }]}
      id="prompts-page"
    >
      <PromptsTable />
    </Page>
  )
}

export default PromptsPage
