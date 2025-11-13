import { AffiliateTable } from '@widgets/tables/AffiliateTable'

import { Page } from '@shared/ui/Page'

const AffiliatePage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Filials', icon: 'corporate_fare' }]}
      id="filials-page"
    >
      <AffiliateTable />
    </Page>
  )
}

export default AffiliatePage
