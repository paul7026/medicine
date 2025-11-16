import { useFormContext } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { SwitchControl } from '@shared/ui/Switch'
import { TextFieldControl } from '@shared/ui/TextField'

import { EditAdminFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<EditAdminFormValues>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextFieldControl form={form} label="Username *" name="username" />

      <TextFieldControl
        form={form}
        label="Password *"
        name="password"
        type="password"
      />

      <SwitchControl form={form} label="Is superuser" name="is_superuser" />
    </Box>
  )
}
