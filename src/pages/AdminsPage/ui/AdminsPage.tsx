import { AdminsActions } from '@features/AdminsActions'

import { AdminsTable } from '@widgets/tables/AdminsTable'

import { Page } from '@shared/ui/Page'

const AdminsPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Admins', icon: 'manage_accounts' }]}
      id="admins-page"
    >
      <AdminsActions />

      <AdminsTable />
    </Page>
  )
}

export default AdminsPage
