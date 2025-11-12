import { JSX, ReactNode } from 'react'

export interface ActionsBoxProps {
  children?: ReactNode
  actionBtns?: ActionBtn[]
  withoutSearch?: boolean
  onRefresh: () => void
}

export interface ActionBtn {
  id: string
  title: string
  icon: JSX.Element
  onClick: () => void
  disable?: boolean
}
