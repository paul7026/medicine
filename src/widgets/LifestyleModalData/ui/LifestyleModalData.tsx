import { Box } from '@shared/ui/Box'
import { DataGrid } from '@shared/ui/DataGrid'
import { Typography } from '@shared/ui/Typography'

import { getData, getNutritionData, getStressData } from '../model/helpers'
import { LifestyleModalDataProps } from '../model/types'

export const LifestyleModalData = ({ lifestyle }: LifestyleModalDataProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">Activity</Typography>
        <DataGrid
          dense
          wordBreakOff
          data={getData(lifestyle)}
          subtitleMaxWidth="350px"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">Nutrition</Typography>
        <DataGrid
          dense
          wordBreakOff
          data={getNutritionData(lifestyle)}
          subtitleMaxWidth="350px"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">Stress</Typography>
        <DataGrid
          dense
          wordBreakOff
          data={getStressData(lifestyle)}
          subtitleMaxWidth="350px"
        />
      </Box>
    </Box>
  )
}
