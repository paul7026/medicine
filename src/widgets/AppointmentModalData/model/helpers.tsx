import { GetAppointmentByIdResponse } from '@entities/appointments'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { Link } from '@shared/ui/Link'

export const getData = (
  appointmentById: GetAppointmentByIdResponse,
  onItemClick: (
    type: 'user' | 'clinic' | 'filial' | 'favour' | 'employee',
    id: string
  ) => void
) => {
  return [
    { title: 'id', subtitle: appointmentById.id },
    { title: 'external_id', subtitle: appointmentById.external_id },
    {
      title: 'user_id',
      subtitle: (
        <Link
          color="info"
          variant="button"
          onClick={() => onItemClick('user', appointmentById.user_id)}
        >
          {appointmentById.user_id}
        </Link>
      ),
    },
    {
      title: 'clinic_id',
      subtitle: (
        <Link
          color="info"
          variant="button"
          onClick={() => onItemClick('clinic', appointmentById.clinic_id)}
        >
          {appointmentById.clinic_id}
        </Link>
      ),
    },
    { title: 'status', subtitle: appointmentById.status },
    { title: 'contact', subtitle: appointmentById.contact },
    {
      title: 'conversation',
      subtitle: appointmentById.conversation
        ? JSON.stringify(appointmentById.conversation, null, 2)
        : '--',
    },

    {
      title: 'filial_id',
      subtitle: (
        <Link
          color="info"
          variant="button"
          onClick={() => onItemClick('filial', appointmentById.filial_id)}
        >
          {appointmentById.filial_id}
        </Link>
      ),
    },
    {
      title: 'favour_id',
      subtitle: (
        <Link
          color="info"
          variant="button"
          onClick={() => onItemClick('favour', appointmentById.favour_id)}
        >
          {appointmentById.favour_id}
        </Link>
      ),
    },
    {
      title: 'employee_id',
      subtitle: (
        <Link
          color="info"
          variant="button"
          onClick={() => onItemClick('employee', appointmentById.employee_id)}
        >
          {appointmentById.employee_id}
        </Link>
      ),
    },
    {
      title: 'start_time',
      subtitle: formatIsoString(appointmentById.start_time),
    },
    {
      title: 'end_time',
      subtitle: formatIsoString(appointmentById.end_time),
    },
    { title: 'format', subtitle: appointmentById.format },
    {
      title: 'created_at',
      subtitle: formatIsoString(appointmentById.created_at),
    },
    {
      title: 'updated_at',
      subtitle: formatIsoString(appointmentById.updated_at),
    },
  ]
}
