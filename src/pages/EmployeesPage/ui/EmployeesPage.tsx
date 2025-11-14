import { EmployeesActions } from '@features/EmployeesActions'

import { EmployeesTable } from '@widgets/tables/EmployeesTable'

import { Page } from '@shared/ui/Page'

const EmployeesPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Employees', icon: 'account_circle' }]}
      id="employees-page"
    >
      <EmployeesActions />

      <EmployeesTable />
    </Page>
  )
}

export default EmployeesPage
