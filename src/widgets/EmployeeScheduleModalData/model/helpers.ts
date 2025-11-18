import { GetEmployeeScheduleByIdResponse } from '@entities/employee_schedules'

export const getData = (
  employeeScheduleById: GetEmployeeScheduleByIdResponse
) => {
  return [
    { title: 'id', subtitle: employeeScheduleById.id },
    { title: 'employee_id', subtitle: employeeScheduleById.employee_id },
    { title: 'filial_id', subtitle: employeeScheduleById.filial_id },
    { title: 'clinic_id', subtitle: employeeScheduleById.clinic_id },
    { title: 'name', subtitle: employeeScheduleById.name },
    { title: 'gender', subtitle: employeeScheduleById.gender },
    { title: 'position', subtitle: employeeScheduleById.position },
    {
      title: 'specialization',
      subtitle: employeeScheduleById.specialization,
    },
    {
      title: 'work_experience',
      subtitle: String(employeeScheduleById.work_experience),
    },
    {
      title: 'medical_degree',
      subtitle: employeeScheduleById.medical_degree,
    },
    { title: 'created_at', subtitle: employeeScheduleById.created_at },
    { title: 'updated_at', subtitle: employeeScheduleById.updated_at },
  ]
}
