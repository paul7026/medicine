import { TabsProps as TabsPropsMui } from '@mui/material'

export type TabsProps = {
  tabsList: { id: string; label: string; component: React.ReactNode }[]
} & TabsPropsMui
