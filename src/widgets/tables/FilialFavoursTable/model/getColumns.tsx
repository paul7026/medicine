import { GridColDef } from '@mui/x-data-grid'

import { Link } from '@shared/ui/Link'

export const getColumns = (
  onNameClick: (favoursId: string) => void
): GridColDef[] => [
  {
    field: 'title',
    headerName: 'Title',
    minWidth: 400,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
    renderCell: (params) => (
      <Link
        color="info"
        variant="button"
        onClick={() => onNameClick(params.row.id)}
      >
        {params.value}
      </Link>
    ),
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
