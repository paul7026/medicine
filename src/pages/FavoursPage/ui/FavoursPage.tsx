import { FavoursActions } from '@features/FavoursActions'

import { FavoursTable } from '@widgets/tables/FavoursTable'

import { Page } from '@shared/ui/Page'

const FavoursPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Favours', icon: 'medical_services' }]}
      id="favours-page"
    >
      <FavoursActions />

      <FavoursTable />
    </Page>
  )
}

export default FavoursPage
