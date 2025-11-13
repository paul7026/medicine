import { useFormContext, useWatch } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { SwitchControl } from '@shared/ui/Switch'
import { TextFieldControl } from '@shared/ui/TextField'

import { CLINIC_SELECT_ITEMS, TENANT_SELECT_ITEMS } from '../model/constants'
import { CreateAdminFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<CreateAdminFormValues>()

  const { control } = form

  const tenant = useWatch({ control, name: 'tenant' })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <SelectControl
        fullWidth
        form={form}
        label="Tenant *"
        name="tenant"
        selectItems={TENANT_SELECT_ITEMS}
      />

      {tenant !== 'panacea' && (
        <SelectControl
          fullWidth
          disabled={tenant === 'panacea'}
          form={form}
          label="Clinic"
          name="clinic"
          selectItems={CLINIC_SELECT_ITEMS}
        />
      )}

      <TextFieldControl form={form} label="Username *" name="username" />

      <TextFieldControl form={form} label="Password *" name="password" />

      <SwitchControl form={form} label="Is superuser" name="is_superuser" />
    </Box>
  )
}
