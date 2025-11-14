import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'

import { Prompt } from '@entities/prompts'

export const getColumns = (
  onViewClick: (prompt: Prompt) => void
): GridColDef[] => [
  {
    field: 'actions',
    type: 'actions',
    cellClassName: 'actions',
    minWidth: 120,
    getActions: ({ row }) => {
      return [
        <GridActionsCellItem
          key={0}
          className="textPrimary"
          color="inherit"
          icon={<VisibilityIcon color="info" />}
          label="View"
          onClick={() => onViewClick(row)}
        />,
      ]
    },
  },
  {
    field: 'id',
    headerName: 'Id',
    minWidth: 330,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'clinic_name',
    headerName: 'Clinic name',
    minWidth: 300,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'prettify_name',
    headerName: 'Prettify name',
    minWidth: 300,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
]
