import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { GridColDef } from '@mui/x-data-grid'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { Box } from '@shared/ui/Box'

export const getColumns = (): GridColDef[] => [
  {
    field: 'id',
    headerName: 'Id',
    width: 300,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'clinic_id',
    headerName: 'Clinic ID',
    width: 300,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'filial_id',
    headerName: 'Filial ID',
    width: 300,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'employee_id',
    headerName: 'Employee ID',
    width: 300,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'start_time',
    headerName: 'Start time',
    width: 150,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (value: string) => formatIsoString(value),
  },
  {
    field: 'end_time',
    headerName: 'End time',
    width: 150,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (value: string) => formatIsoString(value),
  },
  {
    field: 'format',
    headerName: 'Format',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'is_available',
    headerName: 'Is available',
    width: 110,
    headerAlign: 'center',
    align: 'center',
    renderCell: ({ value }) => {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {value ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
        </Box>
      )
    },
  },
]
