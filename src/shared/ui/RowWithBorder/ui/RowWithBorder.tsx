import { SxProps, Theme } from '@mui/material'

import { Box } from '@shared/ui/Box'

export interface RowWithBorderProps {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export const RowWithBorder = ({ children, sx }: RowWithBorderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 1,
        minHeight: '60px',
        borderBottom: '0.9px solid rgba(0, 0, 0, 0.12)',

        '&:last-child': {
          borderBottom: 'none',
          pb: 0,
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}
