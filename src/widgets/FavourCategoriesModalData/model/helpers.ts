import { GetFavourCategoryByIdResponse } from '@entities/favourCategory'

import { formatIsoString } from '@shared/helpers/formatIsoString'

export const getData = (favourCategoryById: GetFavourCategoryByIdResponse) => {
  return [
    { title: 'id', subtitle: favourCategoryById.id },
    { title: 'clinic_id', subtitle: favourCategoryById.clinic_id },
    { title: 'title', subtitle: favourCategoryById.title },
    {
      title: 'description',
      subtitle: favourCategoryById.description
        ? favourCategoryById.description
        : '--',
      noWrap: true,
    },
    {
      title: 'is_default',
      subtitle: favourCategoryById.is_default ? 'Yes' : 'No',
    },
    {
      title: 'created_at',
      subtitle: formatIsoString(favourCategoryById.created_at),
    },
    {
      title: 'updated_at',
      subtitle: formatIsoString(favourCategoryById.updated_at),
    },
  ]
}
