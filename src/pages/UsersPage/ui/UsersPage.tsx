import { Page } from '@shared/ui/Page'

const UsersPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Users', icon: 'groups' }]}
      id="users-page"
    >
      UsersPage
    </Page>
  )
}

export default UsersPage
