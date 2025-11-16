import { Box } from '@shared/ui/Box'
import { DataGrid } from '@shared/ui/DataGrid'

import { getData } from '../model/helpers'
import { ContraindicationsModalDataProps } from '../model/types'

export const ContraindicationsModalData = ({
  contraindications,
}: ContraindicationsModalDataProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <DataGrid
        dense
        wordBreakOff
        data={getData(contraindications)}
        subtitleMaxWidth="350px"
      />
    </Box>
  )
}
