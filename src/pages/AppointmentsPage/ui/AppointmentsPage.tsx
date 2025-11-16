import { AppointmentsActions } from '@features/AppointmentsActions'

import { AppointmentsTable } from '@widgets/tables/AppointmentsTable'

import { Page } from '@shared/ui/Page'

const AppointmentsPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Appointments', icon: 'event_list' }]}
      id="appointments-page"
    >
      <AppointmentsActions />

      <AppointmentsTable />
    </Page>
  )
}

export default AppointmentsPage
