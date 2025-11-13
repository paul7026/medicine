import { UserById } from '@entities/users'

import { isArray } from '@shared/helpers/isArray'

export const getData = (userById: UserById) => {
  return [
    { title: 'id', subtitle: userById.id },
    { title: 'external_id', subtitle: userById.external_id },
    { title: 'tenant', subtitle: userById.tenant },
    { title: 'clinic_id', subtitle: userById.clinic_id },
    { title: 'name', subtitle: userById.name },
    { title: 'country', subtitle: userById.country },
    { title: 'date_of_birth', subtitle: userById.date_of_birth },
    { title: 'height', subtitle: `${userById.height} cm` },
    { title: 'weight', subtitle: `${userById.weight} kg` },
    { title: 'gender', subtitle: userById.gender },
    { title: 'goal', subtitle: userById.goal },
    { title: 'custom_goal', subtitle: userById.custom_goal },
    {
      title: 'complaints',
      subtitle: isArray(userById.complaints)
        ? userById.complaints.join(', ')
        : userById.complaints,
    },
    { title: 'custom_complaint', subtitle: userById.custom_complaint },
    { title: 'is_onboarded', subtitle: userById.is_onboarded ? 'Yes' : 'No' },
  ]
}
