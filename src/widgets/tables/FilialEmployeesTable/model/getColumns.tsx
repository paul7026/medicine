import { GridColDef } from '@mui/x-data-grid'

import { Link } from '@shared/ui/Link'

export const getColumns = (
  onNameClick: (employeeId: string) => void
): GridColDef[] => [
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
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
    field: 'position',
    headerAlign: 'center',
    align: 'center',
    headerName: 'Position',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'specialization',
    headerAlign: 'center',
    align: 'center',
    headerName: 'Specialization',
    minWidth: 250,
    flex: 1,
  },
]
