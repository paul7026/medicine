import { UsersTable } from '@widgets/tables/UsersTable'

import { Page } from '@shared/ui/Page'

const UsersPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Users', icon: 'groups' }]}
      id="users-page"
    >
      <UsersTable />
    </Page>
  )
}

export default UsersPage
