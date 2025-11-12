import { Tab, Tabs as TabsMui } from '@mui/material'

import { Box } from '@shared/ui/Box'

import { TabsProps } from '../model/types'

export const Tabs = ({ value, tabsList, ...rest }: TabsProps) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabsMui {...rest} value={value}>
          {tabsList.map((tab) => (
            <Tab key={tab.id} label={tab.label} />
          ))}
        </TabsMui>
      </Box>
      <Box
        sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {tabsList[value].component}
      </Box>
    </Box>
  )
}
