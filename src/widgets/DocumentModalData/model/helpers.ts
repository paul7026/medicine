import { GetDocumentByIdResponse } from '@entities/documents'

import { formatIsoString } from '@shared/helpers/formatIsoString'

export const getData = (documentById: GetDocumentByIdResponse) => {
  return [
    { title: 'id', subtitle: documentById.id },
    { title: 'clinic_id', subtitle: documentById.clinic_id },
    { title: 'name', subtitle: documentById.name },
    {
      title: 's3_link',
      subtitle: documentById.s3_link ? documentById.s3_link : '--',
      noWrap: true,
    },
    {
      title: 'chunk',
      subtitle: documentById.chunk,
    },
    {
      title: 'created_at',
      subtitle: formatIsoString(documentById.created_at),
    },
    {
      title: 'updated_at',
      subtitle: formatIsoString(documentById.updated_at),
    },
  ]
}
