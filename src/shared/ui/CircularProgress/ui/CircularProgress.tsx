import { CircularProgress as CircularProgressMui } from '@mui/material'

import { Box } from '@shared/ui/Box'

import { CircularProgressProps } from '../model/types'

const FULL_PAGE_SIZE = 80

export const CircularProgress = ({
  isFullPage = false,
  size = 40,
  ...props
}: CircularProgressProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(isFullPage && {
          position: 'absolute',
          top: `calc(50vh - ${FULL_PAGE_SIZE}px)`,
          left: `calc(50vw - ${FULL_PAGE_SIZE}px)`,
        }),
        ...(!isFullPage && { width: '100%', height: '100%' }),
      }}
    >
      <CircularProgressMui
        {...props}
        size={isFullPage ? FULL_PAGE_SIZE : size}
      />
    </Box>
  )
}
