import { DocumentsActions } from '@features/DocumentsActions'

import { DocumentsTable } from '@widgets/tables/DocumentsTable'

import { Page } from '@shared/ui/Page'

const DocumentsPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Documents', icon: 'folder_open' }]}
      id="documents-page"
    >
      <DocumentsActions />

      <DocumentsTable />
    </Page>
  )
}

export default DocumentsPage
