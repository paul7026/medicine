import AccessTimeIcon from '@mui/icons-material/AccessTime'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import DoneIcon from '@mui/icons-material/Done'
import LinkOffIcon from '@mui/icons-material/LinkOff'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import { ChipOwnProps } from '@mui/material'

import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'

export const COLOR_MAP: Record<string, ChipOwnProps['color']> = {
  ACTIVE: 'success',
  FAILED: 'error',
  SUCCESS: 'success',
  IN_PROGRESS: 'info',
  LOST: 'error',
  PARTIAL: 'warning',
  CANCELED: 'error',
  CREATING: 'info',
  Online: 'success',
  Linkdown: 'error',
  DELETING: 'warning',
  HERMIT: 'info',
}

export const ICON_MAP = {
  ACTIVE: <DoneIcon fontSize="small" />,
  SUCCESS: <DoneIcon fontSize="small" />,
  IN_PROGRESS: <AccessTimeIcon fontSize="small" />,
  LOST: <LinkOffIcon fontSize="small" />,
  PARTIAL: <StarHalfIcon fontSize="small" />,
  CANCELED: <DoNotDisturbIcon fontSize="small" />,
  CREATING: (
    <Box>
      <CircularProgress color="info" size={15} sx={{ mr: 1 }} />
    </Box>
  ),
  Online: <DoneIcon fontSize="small" />,
  Linkdown: <LinkOffIcon fontSize="small" />,
  HERMIT: <AccessTimeIcon fontSize="small" />,
}
