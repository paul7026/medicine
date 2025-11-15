import { useFormContext } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { TextFieldControl } from '@shared/ui/TextField'

import { EditScheduleConnectionFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<EditScheduleConnectionFormValues>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextFieldControl
        form={form}
        label="Partner token"
        name="partner_token"
      />

      <TextFieldControl form={form} label="User token" name="user_token" />

      <TextFieldControl form={form} label="Login" name="login" />

      <TextFieldControl
        form={form}
        label="Password"
        name="password"
        type="password"
      />
    </Box>
  )
}
