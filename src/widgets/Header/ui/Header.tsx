import AccountCircle from '@mui/icons-material/AccountCircle'
import { AppBar, Toolbar } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { logout } from '@entities/auth'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useLocalStorageState } from '@shared/hooks/useLocalStorageState'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'

interface HeaderProps {
  drawerWidth: number
}

export const Header = ({ drawerWidth }: HeaderProps) => {
  const [tenant] = useLocalStorageState('tenant')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    navigate('/login')
    dispatch(logout())
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: '#E0F7FA',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography noWrap component="div" variant="h6">
          Medicine
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6">{`${tenant.username} (${tenant.tenant})`}</Typography>

            <AccountCircle />
          </Box>
          <Button color="warning" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
