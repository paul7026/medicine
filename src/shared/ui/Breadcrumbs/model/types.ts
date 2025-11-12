import { BreadcrumbsProps as BreadcrumbsPropsMui } from '@mui/material'

export type BreadcrumbsProps = BreadcrumbsPropsMui & {
  breadcrumbsList: Breadcrumb[]
}

export interface Breadcrumb {
  id: string
  name: string
  href?: string
  icon?: string
}
