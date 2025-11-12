import { SxProps, Theme } from '@mui/material'

import { Dispatch, ReactNode, SetStateAction } from 'react'

export interface ListItem {
  id: string
  name: string
  value: string
  icon?: string
  disabled?: boolean
  children?: ListItem[]
}

export interface ListProps {
  listItems: ListItem[]
  selectedIndex: string | null
  withNavigation?: boolean
  sx?: SxProps<Theme>
  subheader?: ReactNode
  colorMode?: 'light' | 'dark'
  setSelectedListIndex?: Dispatch<SetStateAction<string>>
}
