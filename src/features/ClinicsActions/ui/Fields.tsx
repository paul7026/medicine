import { useFormContext } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'

import { MANAGED_BY_SELECT_ITEMS } from '../model/constants'
import { CreateClinicFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<CreateClinicFormValues>()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <TextFieldControl form={form} label="Title *" name="title" />

      <SelectControl
        form={form}
        label="Managed by *"
        name="managed_by"
        selectItems={MANAGED_BY_SELECT_ITEMS}
      />

      <TextFieldControl form={form} label="Website" name="website" />

      <TextFieldControl form={form} label="Legal name *" name="legal_name" />

      <TextFieldControl
        form={form}
        label="Legal address"
        name="legal_address"
      />

      <TextFieldControl form={form} label="Phones" name="phones" />

      <TextFieldControl form={form} label="Email" name="email" type="email" />

      <TextFieldControl
        multiline
        form={form}
        label="Description"
        name="description"
        rows={4}
      />
    </Box>
  )
}
