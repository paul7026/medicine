import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as SelectMui,
} from '@mui/material'

import { isArray } from '@shared/helpers/isArray'
import { Box } from '@shared/ui/Box'
import { Checkbox } from '@shared/ui/Checkbox'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { Typography } from '@shared/ui/Typography'

import { SelectProps } from '../model/types'

export const Select = ({
  selectItems,
  label,
  sx,
  error,
  errorMessage,
  fullWidth,
  multiple,
  id,
  value,
  loading,
  disabled,
  ...props
}: SelectProps) => {
  return (
    <FormControl error={error} fullWidth={fullWidth} id={id} sx={sx}>
      {label && <InputLabel>{label}</InputLabel>}
      <SelectMui
        label={label}
        {...props}
        MenuProps={{
          sx: {
            '& .MuiPaper-root': {
              maxHeight: 300,
            },
          },
        }}
        disabled={disabled || loading}
        multiple={multiple}
        renderValue={(selected) => {
          if (multiple) {
            const selectedValues = isArray(selected) ? selected : []

            return selectItems
              .filter((item) => selectedValues.includes(item.value))
              .map((item) => item.name)
              .join(', ')
          }

          const selectedItem = selectItems.find(
            (item) => item.value === selected
          )

          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {selectedItem?.icon}
              <Typography>{selectedItem?.name}</Typography>
            </Box>
          )
        }}
        value={value}
      >
        {selectItems.map((item) => (
          <MenuItem key={item.id} value={item.value}>
            {multiple && (
              <Checkbox
                checked={
                  value && isArray(value)
                    ? value.includes(item.value)
                    : value === item.value
                }
              />
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item.icon && !multiple && item.icon}
              <Box>
                <Typography>{item.name}</Typography>
                {item.subText && (
                  <Typography color="textSecondary" variant="caption">
                    {item.subText}
                  </Typography>
                )}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </SelectMui>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            right: 7,
            top: 'calc(50% - 12px)',
          }}
        />
      )}

      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}
