import { ScheduleConnectionsActions } from '@features/ScheduleConnectionsActions'

import { ScheduleConnectionsTable } from '@widgets/tables/ScheduleConnectionsTable'

import { Page } from '@shared/ui/Page'

const ScheduleConnectionsPage = () => {
  return (
    <Page
      breadcrumbsList={[
        { id: '0', name: 'Schedule Connections', icon: 'link' },
      ]}
      id="schedule-connections-page"
    >
      <ScheduleConnectionsActions />
      <ScheduleConnectionsTable />
    </Page>
  )
}

export default ScheduleConnectionsPage
