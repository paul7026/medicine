import { useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { Box } from '@shared/ui/Box'

import { CustomNoRowsOverlay } from './CustomNoRowsOverlay'

import { TableProps } from '../model/types'

export const Table = ({
  isSingleSelection = false,
  multilineRow = false,
  ...props
}: TableProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      <DataGrid
        {...props}
        disableRowSelectionOnClick
        disableVirtualization
        showCellVerticalBorder
        showColumnVerticalBorder
        checkboxSelection={!isSingleSelection}
        getRowClassName={({ row }) =>
          row.status ? `super-app-theme--${row.status}` : ''
        }
        getRowHeight={multilineRow ? () => 'auto' : undefined}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        rowHeight={42}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{
          '& .MuiDataGrid-cell': multilineRow
            ? {
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                display: 'flex',
                alignItems: 'center',
                minHeight: '52px',
              }
            : {},
          '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          },

          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          backgroundColor: 'white',
          '& .super-app-theme--FAILED': {
            color: theme.palette.error.main,
          },
          '& .super-app-theme--CREATING': {
            color: theme.palette.info.main,
          },
          '& .super-app-theme--PARTIAL': {
            color: theme.palette.warning.main,
          },
        }}
      />
    </Box>
  )
}
