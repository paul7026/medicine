import { AppBar, Toolbar } from '@mui/material'

import { Typography } from '@shared/ui/Typography'

interface HeaderProps {
  drawerWidth: number
}

export const Header = ({ drawerWidth }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: '#E0F7FA',
      }}
    >
      <Toolbar>
        <Typography noWrap component="div" variant="h6">
          Permanent drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
