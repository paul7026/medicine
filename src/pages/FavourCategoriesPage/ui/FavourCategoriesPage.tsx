import { FavourCategoriesActions } from '@features/FavourCategoriesActions'

import { FavourCategoriesTable } from '@widgets/tables/FavourCategoriesTable'

import { Page } from '@shared/ui/Page'

const FavourCategoriesPage = () => {
  return (
    <Page
      breadcrumbsList={[
        { id: '0', name: 'Favours categories', icon: 'medical_services' },
      ]}
      id="favour-categories-page"
    >
      <FavourCategoriesActions />

      <FavourCategoriesTable />
    </Page>
  )
}

export default FavourCategoriesPage
