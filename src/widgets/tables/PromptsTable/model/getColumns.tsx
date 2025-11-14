import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'

import { Prompt } from '@entities/prompts'

export const getColumns = (
  onDeleteClick: (prompt: Prompt) => void,
  onEditClick: (prompt: Prompt) => void,
  onViewClick: (prompt: Prompt) => void
): GridColDef[] => [
  {
    field: 'actions',
    type: 'actions',
    cellClassName: 'actions',
    minWidth: 150,
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
        <GridActionsCellItem
          key={0}
          className="textPrimary"
          color="inherit"
          icon={<EditIcon color="info" />}
          label="Edit"
          onClick={() => onEditClick(row)}
        />,
        <GridActionsCellItem
          key={1}
          color="inherit"
          icon={<DeleteIcon color="info" />}
          label="Delete"
          onClick={() => onDeleteClick(row)}
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
    field: 'name',
    headerName: 'Name',
    minWidth: 300,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
]
