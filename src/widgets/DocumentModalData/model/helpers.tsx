import { GetDocumentByIdResponse } from '@entities/documents'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { Link } from '@shared/ui/Link'

export const getData = (
  documentById: GetDocumentByIdResponse,
  onClinicClick: () => void
) => {
  return [
    { title: 'id', subtitle: documentById.id },
    {
      title: 'clinic_id',
      subtitle: (
        <Link color="info" variant="button" onClick={onClinicClick}>
          {documentById.clinic_id}
        </Link>
      ),
    },
    { title: 'name', subtitle: documentById.name },
    {
      title: 's3_link',
      subtitle: documentById.s3_link,
      link: documentById.s3_link,
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
