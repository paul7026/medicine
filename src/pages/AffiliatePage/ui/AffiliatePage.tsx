import { AffiliateActions } from '@features/AffiliateActions'

import { AffiliateTable } from '@widgets/tables/AffiliateTable'

import { Page } from '@shared/ui/Page'

const AffiliatePage = () => {
  return (
    <Page
      breadcrumbsList={[{ id: '0', name: 'Filials', icon: 'corporate_fare' }]}
      id="filials-page"
    >
      <AffiliateActions />

      <AffiliateTable />
    </Page>
  )
}

export default AffiliatePage
