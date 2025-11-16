import { GetFavourByIdResponse } from '@entities/favours'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { isArray } from '@shared/helpers/isArray'
import { Link } from '@shared/ui/Link'

import { FavourModalValues } from './types'

export const getData = ({
  setModalValue,
  favourById,
  onItemClick,
}: {
  setModalValue: (formValue: FavourModalValues) => void
  favourById: GetFavourByIdResponse
  onItemClick: (
    type: 'clinic' | 'category' | 'employees' | 'filials',
    id: string
  ) => void
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
    {
      title: 'filials',
      subtitle: isArray(favourById.employees)
        ? favourById.filials.map((f, i, arr) => (
            <span key={f.id}>
              <Link
                color="info"
                variant="button"
                onClick={() => onItemClick('filials', f.id)}
              >
                {f.name}
              </Link>
              {i < arr.length - 1 ? ', ' : ''}
            </span>
          ))
        : '--',
      tooltipTitle: 'Change filials',
      onClick: () => setModalValue('changeFilials'),
    },
    {
      title: 'employees',
      subtitle: isArray(favourById.employees)
        ? favourById.employees.map((f, i, arr) => (
            <span key={f.id}>
              <Link
                color="info"
                variant="button"
                onClick={() => onItemClick('employees', f.id)}
              >
                {f.name}
              </Link>
              {i < arr.length - 1 ? ', ' : ''}
            </span>
          ))
        : '--',
      tooltipTitle: 'Change employees',
      onClick: () => setModalValue('changeEmployees'),
    },
    { title: 'created_at', subtitle: formatIsoString(favourById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(favourById.updated_at) },
  ]
}
