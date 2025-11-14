import { GetFavourByIdResponse } from '@entities/favours'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { isArray } from '@shared/helpers/isArray'

export const getData = (favourById: GetFavourByIdResponse) => {
  return [
    { title: 'id', subtitle: favourById.id },
    {
      title: 'clinic_id',
      subtitle: favourById.clinic_id,
    },
    { title: 'title', subtitle: favourById.title },
    { title: 'favour_category_id', subtitle: favourById.favour_category_id },
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
      subtitle: isArray(favourById.filials)
        ? favourById.filials.map((filial) => filial.name).join(', ')
        : favourById.filials,
    },
    {
      title: 'employees',
      subtitle: isArray(favourById.employees)
        ? favourById.employees.map((filial) => filial.name).join(', ')
        : favourById.employees,
    },
    { title: 'created_at', subtitle: formatIsoString(favourById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(favourById.updated_at) },
  ]
}
