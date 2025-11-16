import { useFormContext } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { TextFieldControl } from '@shared/ui/TextField'

import { EditChatsFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<EditChatsFormValues>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextFieldControl
        fullWidth
        form={form}
        label="Message *"
        name="message"
      />
    </Box>
  )
}
