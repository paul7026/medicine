import { SxProps, Theme } from '@mui/material'

import { Breadcrumb } from '@shared/ui/Breadcrumbs'
import { ListItem } from '@shared/ui/List'

export interface PageProps {
  children: React.ReactNode
  breadcrumbsList?: Breadcrumb[]
  id?: string
  sx?: SxProps<Theme>
}

export interface SubPageWithNavigationProps {
  navListItems: ListItem[]
}
