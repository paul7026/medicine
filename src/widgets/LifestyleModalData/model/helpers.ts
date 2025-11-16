import { UserById } from '@entities/users'

export const getData = (lifestyle: UserById['lifestyle']) => {
  return [
    {
      title: 'Workout frequency',
      subtitle: lifestyle.workout_frequency,
    },
    {
      title: 'Physical activities',
      subtitle: lifestyle.physical_activities?.join(', ') || '--',
    },
    {
      title: 'Custom activities',
      subtitle: lifestyle.custom_activities?.join(', ') || '--',
    },
  ]
}

export const getNutritionData = (lifestyle: UserById['lifestyle']) => {
  return [
    {
      title: 'Eating habits',
      subtitle: lifestyle.eating_habits?.join(', ') || '--',
    },
    {
      title: 'Custom habits',
      subtitle: lifestyle.custom_habits,
    },
    {
      title: 'Meal frequency',
      subtitle: lifestyle.meal_frequency,
    },
    {
      title: 'Water intake',
      subtitle: lifestyle.water_intake,
    },
  ]
}

export const getStressData = (lifestyle: UserById['lifestyle']) => {
  return [
    {
      title: 'Stress level',
      subtitle: lifestyle.stress_level,
    },
  ]
}
