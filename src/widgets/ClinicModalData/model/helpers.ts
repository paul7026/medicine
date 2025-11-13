import { ClinicById } from '@entities/clinics'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { isArray } from '@shared/helpers/isArray'

export const getData = (clinicById: ClinicById) => {
  return [
    { title: 'id', subtitle: clinicById.id },
    { title: 'external_id', subtitle: clinicById.external_id },
    { title: 'api_key_hash', subtitle: clinicById.api_key_hash },
    { title: 'managed_by', subtitle: clinicById.managed_by },
    {
      title: 'schedule_connection_id',
      subtitle: clinicById.schedule_connection_id,
    },
    { title: 'title', subtitle: clinicById.title },
    {
      title: 'website',
      subtitle: clinicById.website,
      link: clinicById.website,
    },
    { title: 'legal_name', subtitle: clinicById.legal_name },
    { title: 'legal_address', subtitle: clinicById.legal_address },
    { title: 'phones', subtitle: clinicById.phones },
    { title: 'email', subtitle: clinicById.email },
    { title: 'description', subtitle: clinicById.description, noWrap: true },
    { title: 'created_at', subtitle: formatIsoString(clinicById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(clinicById.updated_at) },
    { title: 'updated_at', subtitle: formatIsoString(clinicById.updated_at) },
    {
      title: 'chatbot_connections',
      subtitle: isArray(clinicById.chatbot_connections)
        ? clinicById.chatbot_connections
            .map((connection) => connection.webhook_url)
            .join(', ')
        : clinicById.chatbot_connections,
    },
    {
      title: 'filials',
      subtitle: Array.isArray(clinicById.filials)
        ? clinicById.filials.map((filial) => filial.name).join(', ')
        : clinicById.filials,
    },
  ]
}
