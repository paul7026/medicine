import { UserById } from '@entities/users'

export const getData = (contraindications: UserById['contraindications']) => {
  const normalize = (value?: string[]) => {
    return value?.join(', ')
  }

  return [
    {
      title: 'Allergies',
      subtitle: normalize(contraindications.allergies),
    },
    {
      title: 'Custom allergies',
      subtitle: normalize(contraindications.custom_allergies),
    },
    {
      title: 'Chronic conditions',
      subtitle: normalize(contraindications.chronic_conditions),
    },
    {
      title: 'Custom conditions',
      subtitle: normalize(contraindications.custom_conditions),
    },
    {
      title: 'Health conditions',
      subtitle: normalize(contraindications.health_conditions),
    },
    {
      title: 'Medication restrictions',
      subtitle: normalize(contraindications.medication_restrictions),
    },
    {
      title: 'Custom restrictions',
      subtitle: normalize(contraindications.custom_restrictions),
    },
    {
      title: 'Ethical choices',
      subtitle: normalize(contraindications.ethical_choices),
    },
    {
      title: 'Custom features',
      subtitle: normalize(contraindications.custom_features),
    },
  ]
}
