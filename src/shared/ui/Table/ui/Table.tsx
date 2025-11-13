import { DataGrid } from '@mui/x-data-grid'

import { Box } from '@shared/ui/Box'

import { CustomNoRowsOverlay } from './CustomNoRowsOverlay'

import { TableProps } from '../model/types'

export const Table = ({
  isSingleSelection = false,
  multilineRow = false,
  ...props
}: TableProps) => {
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
        getRowHeight={multilineRow ? () => 'auto' : undefined}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
        sx={{
          borderColor: 'primary.light',
          '--DataGrid-rowBorderColor': '#e0e0e0',
          boxShadow: 2,
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
        }}
      />
    </Box>
  )
}
