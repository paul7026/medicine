import type dayjs from 'dayjs'

export interface EditUserFormValues {
  name: string
  country: string
  date_of_birth: dayjs.Dayjs | null
  height: string
  weight: string
  gender: string
  goal: string
  custom_goal: string
  complaints: string[]
  custom_complaint: string
  is_onboarded: boolean
  // Lifestyle
  lifestyle_workout_frequency: string
  lifestyle_physical_activities: string[]
  lifestyle_custom_activities: string[]
  lifestyle_eating_habits: string[]
  lifestyle_custom_habits: string
  lifestyle_meal_frequency: string
  lifestyle_water_intake: string
  lifestyle_stress_level: string
  // Contraindications
  contraindications_allergies: string[]
  contraindications_custom_allergies: string[]
  contraindications_chronic_conditions: string[]
  contraindications_custom_conditions: string[]
  contraindications_health_conditions: string[]
  contraindications_medication_restrictions: string[]
  contraindications_custom_restrictions: string[]
  contraindications_ethical_choices: string[]
  contraindications_custom_features: string[]
}

export interface EditUserFormProps {
  onClose: () => void
  userId: string
}
