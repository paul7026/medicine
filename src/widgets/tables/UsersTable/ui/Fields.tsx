import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { InputAdornment } from '@mui/material'

import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { ContraindicationsForm } from '@features/forms/ContraindicationsForm'
import { LifestyleForm } from '@features/forms/LifestyleForm'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { DatePickerControl } from '@shared/ui/DatePicker'
import { IconButton } from '@shared/ui/IconButton'
import { Modal } from '@shared/ui/Modal'
import { SelectControl } from '@shared/ui/Select'
import { SwitchControl } from '@shared/ui/Switch'
import { TextFieldControl } from '@shared/ui/TextField'

import { EditUserFormValues } from '../model/types'

export const Fields = () => {
  const [lifestyleModalOpen, setLifestyleModalOpen] = useState(false)
  const [contraindicationsModalOpen, setContraindicationsModalOpen] =
    useState(false)

  const form = useFormContext<EditUserFormValues>()

  const { control } = form

  const { fields, append, remove } = useFieldArray({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: control as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: 'complaints' as any,
  })

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextFieldControl form={form} label="Name" name="name" />

        <TextFieldControl form={form} label="Country" name="country" />

        <DatePickerControl
          form={form}
          label="Date of birth"
          name="date_of_birth"
        />

        <TextFieldControl
          form={form}
          label="Height"
          name="height"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
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
              endAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 3,
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={() => setLifestyleModalOpen(true)}
          >
            Edit lifestyle
          </Button>
          <Button
            type="button"
            variant="outlined"
            onClick={() => setContraindicationsModalOpen(true)}
          >
            Edit contraindications
          </Button>
        </Box>

        <SwitchControl form={form} label="Is onboarded" name="is_onboarded" />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={lifestyleModalOpen}
        title="Edit lifestyle"
        onClose={() => setLifestyleModalOpen(false)}
      >
        <LifestyleForm />
      </Modal>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={contraindicationsModalOpen}
        title="Edit contraindications"
        onClose={() => setContraindicationsModalOpen(false)}
      >
        <ContraindicationsForm />
      </Modal>
    </>
  )
}
