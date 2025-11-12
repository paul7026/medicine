import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List as ListMui,
  useTheme,
} from '@mui/material'

import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '@shared/ui/Icon'

import { getParentIdsForSelectedIndex } from '../model/helpers'
import { ListItem, ListProps } from '../model/types'

export const List = ({
  listItems,
  sx: sxProps,
  subheader,
  withNavigation = false,
  setSelectedListIndex,
  colorMode = 'light',
  selectedIndex,
}: ListProps) => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({})

  const navigate = useNavigate()
  const { palette } = useTheme()

  useEffect(() => {
    const parentIds = getParentIdsForSelectedIndex(listItems, selectedIndex)
    const initialOpenState = parentIds.reduce(
      (acc, id) => ({ ...acc, [id]: true }),
      {}
    )
    setOpenItems(initialOpenState)
  }, [listItems, selectedIndex])

  const clickHandler = (id: string, value: string, hasChildren: boolean) => {
    if (!hasChildren) {
      if (withNavigation) {
        navigate(value)
      } else {
        setSelectedListIndex?.(value)
      }

      return
    }

    setOpenItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  //рекурсивно добавляем ListItemButton если есть массив children
  const renderListItems = (items: ListItem[], level = 0) => {
    return items.map(({ id, icon, name, children, value, disabled }) => {
      const isItemOpen = openItems[id] || false
      const hasChildren = Boolean(children)

      return (
        <Fragment key={id}>
          <ListItemButton
            disabled={disabled}
            selected={selectedIndex === value}
            sx={[
              { pl: 3 * level },
              !level && { pl: 1 },
              colorMode === 'dark' && {
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                },
                '&.Mui-selected:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                },
              },
            ]}
            onClick={() => clickHandler(id, value, hasChildren)}
          >
            <ListItemIcon>
              <Icon
                sx={[
                  colorMode === 'dark' && { color: palette.whiteColor.main },
                ]}
              >
                {icon}
              </Icon>
            </ListItemIcon>
            <ListItemText primary={name} />
            {hasChildren &&
              (isItemOpen ? (
                <ExpandLess sx={{ marginLeft: 5 }} />
              ) : (
                <ExpandMore sx={{ marginLeft: 5 }} />
              ))}
          </ListItemButton>
          {hasChildren && (
            <Collapse unmountOnExit in={isItemOpen} timeout="auto">
              <ListMui disablePadding component="div">
                {renderListItems(children || [], level + 1)}
              </ListMui>
            </Collapse>
          )}
        </Fragment>
      )
    })
  }

  return (
    <ListMui
      component="nav"
      subheader={subheader}
      sx={[
        { width: '100%' },
        colorMode === 'dark' && {
          color: palette.whiteColor.main,
          backgroundColor: palette.blackColor.main,
        },
        ...(Array.isArray(sxProps) ? sxProps : [sxProps]),
      ]}
    >
      {renderListItems(listItems)}
    </ListMui>
  )
}
