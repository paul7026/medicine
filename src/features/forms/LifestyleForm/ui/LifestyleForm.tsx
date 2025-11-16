import { useFormContext } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { TextFieldControl } from '@shared/ui/TextField'

import { LifestyleList } from './LifestyleList'

export const LifestyleForm = () => {
  const form = useFormContext()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextFieldControl
        form={form}
        label="Workout frequency"
        name="lifestyle_workout_frequency"
      />

      <LifestyleList
        label="Physical activity"
        name="lifestyle_physical_activities"
      />

      <LifestyleList
        label="Custom activity"
        name="lifestyle_custom_activities"
      />

      <LifestyleList label="Eating habit" name="lifestyle_eating_habits" />

      <TextFieldControl
        form={form}
        label="Custom habits"
        name="lifestyle_custom_habits"
      />

      <TextFieldControl
        form={form}
        label="Meal frequency"
        name="lifestyle_meal_frequency"
      />

      <TextFieldControl
        form={form}
        label="Water intake"
        name="lifestyle_water_intake"
      />

      <TextFieldControl
        form={form}
        label="Stress level"
        name="lifestyle_stress_level"
      />
    </Box>
  )
}
