import { ScheduleConnectionById } from '@entities/schedule_connections'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { Link } from '@shared/ui/Link'

export const getData = (
  scheduleConnectionById: ScheduleConnectionById,
  onClinicClick: () => void
) => {
  return [
    { title: 'id', subtitle: scheduleConnectionById.id },
    {
      title: 'clinic_id',
      subtitle: (
        <Link color="info" variant="button" onClick={onClinicClick}>
          {scheduleConnectionById.clinic_id}
        </Link>
      ),
    },
    { title: 'type', subtitle: scheduleConnectionById.type },
    { title: 'partner_token', subtitle: scheduleConnectionById.partner_token },
    { title: 'user_token', subtitle: scheduleConnectionById.user_token },
    { title: 'login', subtitle: scheduleConnectionById.login },
    { title: 'password', subtitle: scheduleConnectionById.password },
    {
      title: 'created_at',
      subtitle: formatIsoString(scheduleConnectionById.created_at),
    },
    {
      title: 'updated_at',
      subtitle: formatIsoString(scheduleConnectionById.updated_at),
    },
  ]
}
