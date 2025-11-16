import { ClinicsActions } from '@features/ClinicsActions/ui/ClinicsActions'

import { ClinicsTable } from '@widgets/tables/ClinicsTable'

import { getTenantType } from '@shared/helpers/getTenantType'
import { Page } from '@shared/ui/Page'

const ClinicsPage = () => {
  const tenant = getTenantType()
  const isMaintainer = tenant === 'maintainer'

  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Clinics', icon: 'medical_services' }]}
      id="clinics-page"
    >
      {isMaintainer && <ClinicsActions />}

      <ClinicsTable />
    </Page>
  )
}

export default ClinicsPage
