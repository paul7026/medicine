import clsx from 'clsx'
import { memo } from 'react'

import { Box } from '@shared/ui/Box'
import { Typography } from '@shared/ui/Typography'

import { Bar, Element, Value } from './ProgressBar.styled'

import { ProgressBarProps } from '../model/types'

export const ProgressBar = memo(function ProgressBar({
  value,
  height = 26,
  fontSize = 16,
  helperText,
  title,
}: ProgressBarProps) {
  const valueNumber = Number(value)

  return (
    <Box sx={{ width: '100%' }}>
      {title && (
        <Typography sx={{ paddingX: 1 }} variant="caption">
          {title}
        </Typography>
      )}
      <Element sx={{ height: height + 'px' }}>
        <Value
          sx={{
            fontSize: fontSize + 'px',
            lineHeight: height + 'px',
          }}
        >{`${valueNumber.toFixed(1)} %`}</Value>
        <Bar
          className={clsx({
            low: valueNumber < 30,
            medium: valueNumber >= 30 && valueNumber <= 70,
            high: valueNumber > 70,
          })}
          style={{ maxWidth: `${valueNumber}%` }}
        />
      </Element>

      {helperText && (
        <Typography
          sx={{
            fontSize: 12,
            color: 'gray',
            paddingX: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  )
})
