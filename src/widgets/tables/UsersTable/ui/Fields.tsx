import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { InputAdornment } from '@mui/material'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { IconButton } from '@shared/ui/IconButton'
import { SelectControl } from '@shared/ui/Select'
import { SwitchControl } from '@shared/ui/Switch'
import { TextFieldControl } from '@shared/ui/TextField'

import { EditUserFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<EditUserFormValues>()

  const { control } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'complaints' as const,
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextFieldControl form={form} label="Name" name="name" />

      <TextFieldControl form={form} label="Country" name="country" />

      <TextFieldControl
        form={form}
        label="Date of birth"
        name="date_of_birth"
        type="date"
      />

      <TextFieldControl
        form={form}
        label="Height"
        name="height"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          },
        }}
        type="number"
      />

      <TextFieldControl
        form={form}
        label="Weight"
        name="weight"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          },
        }}
        type="number"
      />

      <SelectControl
        form={form}
        label="Gender"
        name="gender"
        selectItems={[
          { id: '0', name: 'Male', value: 'male' },
          { id: '1', name: 'Female', value: 'female' },
          { id: '2', name: 'Other', value: 'other' },
        ]}
      />

      <TextFieldControl form={form} label="Goal" name="goal" />

      <TextFieldControl form={form} label="Custom Goal" name="custom_goal" />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <h4>Complaints</h4>
          <IconButton color="success" size="large" onClick={() => append('')}>
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Box>

        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
          >
            <TextFieldControl
              fullWidth
              form={form}
              label={`Complaint ${index + 1}`}
              name={`complaints.${index}`}
            />
            <IconButton color="error" onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

      <TextFieldControl
        form={form}
        label="Custom complaint"
        name="custom_complaint"
      />

      <SwitchControl form={form} label="Is onboarded" name="is_onboarded" />
    </Box>
  )
}
