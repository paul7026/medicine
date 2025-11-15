import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'

type ChatRow = {
  id: string
  clinic_name: string
  prettify_name: string
}

export const getColumns = (
  onEditClick: (chat: ChatRow) => void,
  onViewClick: (chat: ChatRow) => void
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
          key={1}
          className="textPrimary"
          color="inherit"
          icon={<EditIcon color="info" />}
          label="Edit"
          onClick={() => onEditClick(row)}
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
