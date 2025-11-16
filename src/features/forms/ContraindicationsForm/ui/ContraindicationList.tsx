import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { IconButton } from '@shared/ui/IconButton'
import { TextFieldControl } from '@shared/ui/TextField'

import { ContraindicationListProps } from '../model/types'

export const ContraindicationList = ({
  label,
  name,
}: ContraindicationListProps) => {
  const form = useFormContext()
  const { control } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: name as never,
  })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h4>{label}</h4>
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
            label={`${label} ${index + 1}`}
            name={`${name}.${index}` as never}
          />
          <IconButton color="error" onClick={() => remove(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  )
}
