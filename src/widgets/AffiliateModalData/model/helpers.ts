import { FilialById } from '@entities/filials'

import { formatIsoString } from '@shared/helpers/formatIsoString'

export const getData = (filialById: FilialById) => {
  return [
    { title: 'id', subtitle: filialById.id },
    { title: 'external_id', subtitle: filialById.external_id },
    { title: 'clinic_id', subtitle: filialById.clinic_id },
    { title: 'name', subtitle: filialById.name },
    { title: 'timezone', subtitle: filialById.timezone },
    { title: 'address', subtitle: filialById.address },
    { title: 'address_data', subtitle: filialById.address_data },
    { title: 'phones', subtitle: filialById.phones },
    { title: 'description', subtitle: filialById.description },
    { title: 'social_media', subtitle: filialById.social_media },
    { title: 'email', subtitle: filialById.email },
    { title: 'created_at', subtitle: formatIsoString(filialById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(filialById.updated_at) },
  ]
}
