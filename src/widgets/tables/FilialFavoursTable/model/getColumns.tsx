import { GridColDef } from '@mui/x-data-grid'

export const getColumns = (): GridColDef[] => [
  {
    field: 'id',
    headerName: 'Id',
    width: 250,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'title',
    headerName: 'Title',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'clinic_name',
    headerName: 'Clinic name',
    minWidth: 220,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
]
