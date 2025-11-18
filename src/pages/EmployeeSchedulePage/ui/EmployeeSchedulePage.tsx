import { EmployeeScheduleActions } from '@features/EmployeeScheduleActions'

import { EmployeeScheduleTable } from '@widgets/tables/EmployeeScheduleTable'

import { Page } from '@shared/ui/Page'

const EmployeeSchedulePage = () => {
  return (
    <Page
      breadcrumbsList={[
        { id: '0', name: 'Employee Schedule', icon: 'schedule' },
      ]}
      id="employee-schedule-page"
    >
      <EmployeeScheduleActions />
      <EmployeeScheduleTable />
    </Page>
  )
}

export default EmployeeSchedulePage
