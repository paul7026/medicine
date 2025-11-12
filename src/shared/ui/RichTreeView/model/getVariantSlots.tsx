import { RichTreeViewSlots } from '@mui/x-tree-view/RichTreeView'

import {
  CollapseIconConnectionBorder,
  EndIconConnectionBorder,
  ExpandIconConnectionBorder,
} from './helpers'

import { CustomTreeItemConnectionBorder } from '../ui/RichTreeView.styled'

export const getVariantSlots = (
  variant?: 'connectionBorder',
  slots?: RichTreeViewSlots
) => {
  switch (variant) {
    case 'connectionBorder':
      return {
        item: CustomTreeItemConnectionBorder,
        expandIcon: ExpandIconConnectionBorder,
        collapseIcon: CollapseIconConnectionBorder,
        endIcon: EndIconConnectionBorder,
      }

    default:
      return slots
  }
}
