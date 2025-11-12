import { Box } from '@shared/ui/Box'
import { ProgressBar } from '@shared/ui/ProgressBar'

import { RenderCellParams } from '../types'

export const renderProgress = (params: RenderCellParams) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <ProgressBar value={params.value} />
    </Box>
  )
}
