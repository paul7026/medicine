import { ClinicsActions } from '@features/ClinicsActions/ui/ClinicsActions'

import { ClinicsTable } from '@widgets/tables/ClinicsTable'

import { Page } from '@shared/ui/Page'

const ClinicsPage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Clinics', icon: 'medical_services' }]}
      id="clinics-page"
    >
      <ClinicsActions />

      <ClinicsTable />
    </Page>
  )
}

export default ClinicsPage
