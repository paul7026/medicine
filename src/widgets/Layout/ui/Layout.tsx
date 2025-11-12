import { CssBaseline, Toolbar } from '@mui/material'

import { Header } from '@widgets/Header'
import { NavigationPanel } from '@widgets/NavigationPanel'

import { Box } from '@shared/ui/Box'

import { LayoutProps } from '../model/types'

export const Layout = ({ children }: LayoutProps) => {
  const drawerWidth = 240

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Header drawerWidth={drawerWidth} />

      <NavigationPanel drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
