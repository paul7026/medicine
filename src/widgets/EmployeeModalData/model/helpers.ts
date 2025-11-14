import { GetEmployeeByIdResponse } from '@entities/employees'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { isArray } from '@shared/helpers/isArray'

export const getData = (employeeById: GetEmployeeByIdResponse) => {
  return [
    { title: 'id', subtitle: employeeById.id },
    { title: 'clinic_id', subtitle: employeeById.clinic_id },
    { title: 'name', subtitle: employeeById.name },
    { title: 'gender', subtitle: employeeById.gender },
    {
      title: 'email',
      subtitle: employeeById.email ? employeeById.email : '--',
    },
    {
      title: 'phone',
      subtitle: employeeById.phone ? employeeById.phone : '--',
    },
    {
      title: 'position',
      subtitle: employeeById.position,
    },
    { title: 'specialization', subtitle: employeeById.specialization },
    { title: 'work_experience', subtitle: employeeById.work_experience },
    {
      title: 'medical_degree',
      subtitle: employeeById.medical_degree
        ? employeeById.medical_degree
        : '--',
    },
    { title: 'created_at', subtitle: formatIsoString(employeeById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(employeeById.updated_at) },
    {
      title: 'filials',
      subtitle: isArray(employeeById.filials)
        ? employeeById.filials.map((filial) => filial.name).join(', ')
        : employeeById.filials,
    },
    {
      title: 'favours',
      subtitle: isArray(employeeById.favours)
        ? employeeById.favours.map((favour) => favour.title).join(', ')
        : employeeById.favours,
    },
    {
      title: 'schedule_templates',
      subtitle: isArray(employeeById.schedule_templates)
        ? employeeById.schedule_templates
            .map((scheduleTemplate) => scheduleTemplate.id)
            .join(', ')
        : employeeById.schedule_templates,
    },
    {
      title: 'schedule_exceptions',
      subtitle: isArray(employeeById.schedule_exceptions)
        ? employeeById.schedule_exceptions
            .map((scheduleException) => scheduleException.id)
            .join(', ')
        : employeeById.schedule_exceptions,
    },
  ]
}
