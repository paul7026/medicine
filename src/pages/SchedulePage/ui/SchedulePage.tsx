import { ScheduleTable } from '@widgets/tables/ScheduleTable'

import { Page } from '@shared/ui/Page'

const SchedulePage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Schedule', icon: 'schedule' }]}
      id="schedule-page"
    >
      <ScheduleTable />
    </Page>
  )
}

export default SchedulePage
