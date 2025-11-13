import { CssBaseline } from '@mui/material'

import { Header } from '@widgets/Header'
import { NavigationPanel } from '@widgets/NavigationPanel'

import { Box } from '@shared/ui/Box'

import { LayoutProps } from '../model/types'

export const Layout = ({ children }: LayoutProps) => {
  const drawerWidth = 240

  return (
    <Box sx={{ height: '100vh' }}>
      <CssBaseline />

      <Header drawerWidth={drawerWidth} />

      <NavigationPanel drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
