import AccountCircle from '@mui/icons-material/AccountCircle'
import { AppBar, Toolbar } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { logout, whoAmISelector } from '@entities/auth'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Typography } from '@shared/ui/Typography'

interface HeaderProps {
  drawerWidth: number
}

export const Header = ({ drawerWidth }: HeaderProps) => {
  const { whoAmI } = useAppSelector(whoAmISelector)

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
            {whoAmI && (
              <Typography variant="h6">{`${whoAmI.username} (${whoAmI.tenant})`}</Typography>
            )}
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
