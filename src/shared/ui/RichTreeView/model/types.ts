import { SxProps, Theme } from '@mui/material'
import { RichTreeViewProps as RichTreeViewPropsMui } from '@mui/x-tree-view/RichTreeView'

export type RichTreeViewProps<
  R extends object,
  Multiple extends boolean | undefined,
> = RichTreeViewPropsMui<R, Multiple> & {
  sx?: SxProps<Theme>
  variant?: 'connectionBorder'
}
