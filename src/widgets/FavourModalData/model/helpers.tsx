import { GetFavourByIdResponse } from '@entities/favours'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { Link } from '@shared/ui/Link'

export const getData = ({
  favourById,
  onItemClick,
}: {
  favourById: GetFavourByIdResponse
  onItemClick: (type: 'clinic' | 'category', id: string) => void
}) => {
  return [
    { title: 'id', subtitle: favourById.id },
    {
      title: 'clinic_id',
      subtitle: (
        <Link
          color="info"
          variant="button"
          onClick={() => onItemClick('clinic', favourById.clinic_id)}
        >
          {favourById.clinic_id}
        </Link>
      ),
    },
    { title: 'title', subtitle: favourById.title },
    {
      title: 'favour_category_id',
      subtitle: (
        <Link
          color="info"
          variant="button"
          onClick={() => onItemClick('category', favourById.favour_category_id)}
        >
          {favourById.favour_category_id}
        </Link>
      ),
    },
    {
      title: 'favour_category_name',
      subtitle: favourById.favour_category_name
        ? favourById.favour_category_name
        : '--',
    },
    {
      title: 'comment',
      subtitle: favourById.comment ? favourById.comment : '--',
    },
    {
      title: 'duration (min)',
      subtitle: favourById.duration,
    },
    {
      title: 'online_switch_on',
      subtitle: favourById.online_switch_on ? 'On' : 'Off',
    },
    { title: 'price', subtitle: favourById.price },
    {
      title: 'currency',
      subtitle: favourById.currency ? favourById.currency : '--',
    },
    { title: 'created_at', subtitle: formatIsoString(favourById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(favourById.updated_at) },
  ]
}
