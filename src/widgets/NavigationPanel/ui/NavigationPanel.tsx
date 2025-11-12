import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom'

import { Icon } from '@shared/ui/Icon'

import { getNavPanelListItems } from '../model/helpers'

interface NavigationPanelProps {
  drawerWidth: number
}

export const NavigationPanel = ({ drawerWidth }: NavigationPanelProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const items = getNavPanelListItems()

  const clickHandler = (path: string) => navigate(path)

  return (
    <Drawer
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#E0F7FA', // light cyan base
          color: '#004D56', // dark cyan text for contrast
        },
      }}
      variant="permanent"
    >
      <Toolbar />
      <Divider sx={{ borderColor: '#B2EBF2' }} />
      <List>
        {items.map(({ id, icon, name, value }) => {
          const isSelected = location.pathname.startsWith(`/${value}`)

          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                selected={isSelected}
                sx={{
                  position: 'relative',
                  color: isSelected ? '#FFFFFF' : '#004D56',
                  fontWeight: isSelected ? 600 : 400,
                  transition: 'background-color 0.25s ease, color 0.25s ease',
                  '& .MuiListItemIcon-root': {
                    color: isSelected ? '#FFFFFF' : '#007B89',
                    minWidth: 40,
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#26C6DA', // bold cyan highlight
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '4px',
                      backgroundColor: '#4DD0E1', // soft accent edge
                      borderRadius: '0 4px 4px 0',
                    },
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: '#4DD0E1',
                  },
                  '&:hover': {
                    backgroundColor: '#B2EBF2', // gentle hover
                  },
                }}
                onClick={() => clickHandler(value)}
              >
                <ListItemIcon>
                  <Icon>{icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}
