import {
  FormControlLabel,
  Switch as SwitchMui,
  SwitchProps as SwitchPropsMui,
} from '@mui/material'

import { ReactNode } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Box } from '@shared/ui/Box'

type SwitchProps = Omit<SwitchPropsMui, 'form'> & {
  label?: ReactNode
}

type SwitchControlControlProps<T extends FieldValues> = SwitchProps & {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

export const SwitchControl = <T extends FieldValues>({
  form,
  name,
  label,
  required,
  disabled,
  sx,
  ...props
}: SwitchControlControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Box>
          <FormControlLabel
            sx={sx}
            {...field}
            control={
              <SwitchMui
                {...props}
                checked={field.value}
                onChange={field.onChange}
              />
            }
            disabled={disabled}
            label={label}
            required={required}
          />
          {fieldState.error && (
            <Box sx={{ color: 'error.main', fontSize: 12, m: 0.5 }}>
              {fieldState.error.message}
            </Box>
          )}
        </Box>
      )}
    />
  )
}
