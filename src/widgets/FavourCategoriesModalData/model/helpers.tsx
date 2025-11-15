import { GetFavourCategoryByIdResponse } from '@entities/favourCategory'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { Link } from '@shared/ui/Link'

export const getData = (
  favourCategoryById: GetFavourCategoryByIdResponse,
  onClinicClick: () => void
) => {
  return [
    { title: 'id', subtitle: favourCategoryById.id },
    {
      title: 'clinic_id',
      subtitle: (
        <Link color="info" variant="button" onClick={onClinicClick}>
          {favourCategoryById.clinic_id}
        </Link>
      ),
    },
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
