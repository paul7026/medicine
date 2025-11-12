import { RichTreeView as RichTreeViewMui } from '@mui/x-tree-view/RichTreeView'

import { Box } from '@shared/ui/Box'

import { getVariantSlots } from '../model/getVariantSlots'
import { RichTreeViewProps } from '../model/types'

export const RichTreeView = <
  R extends object,
  Multiple extends boolean | undefined,
>({
  sx,
  variant,
  slots,
  ...props
}: RichTreeViewProps<R, Multiple>) => {
  return (
    <Box sx={sx}>
      <RichTreeViewMui {...props} slots={getVariantSlots(variant, slots)} />
    </Box>
  )
}
