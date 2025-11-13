import { Toolbar } from '@mui/material'

import { Box } from '@shared/ui/Box'
import { Breadcrumbs } from '@shared/ui/Breadcrumbs'

import { PageProps } from '../model/types'

export const Page = ({ children, id, sx, breadcrumbsList }: PageProps) => {
  return (
    <Box
      id={id}
      sx={{
        backgroundColor: '#F5F9FA',
        height: '100%',
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        p: 2,
        ...sx,
      }}
    >
      <Toolbar />
      {breadcrumbsList && (
        <Breadcrumbs
          breadcrumbsList={breadcrumbsList}
          sx={{ fontSize: '1.2rem', pt: 1, pb: 1, mb: 1 }}
        />
      )}
      {children}
    </Box>
  )
}
