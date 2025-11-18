import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid'

export const getColumns = (
  onDeleteClick: (id: GridRowId) => void,
  onEditClick: (id: GridRowId) => void,
  onViewClick: (id: GridRowId) => void
): GridColDef[] => [
  {
    field: 'actions',
    type: 'actions',
    cellClassName: 'actions',
    minWidth: 150,
    getActions: ({ id }) => {
      return [
        <GridActionsCellItem
          key={0}
          className="textPrimary"
          color="inherit"
          icon={<VisibilityIcon color="info" />}
          label="View"
          onClick={() => onViewClick(id)}
        />,
        <GridActionsCellItem
          key={1}
          className="textPrimary"
          color="inherit"
          icon={<EditIcon color="info" />}
          label="Edit"
          onClick={() => onEditClick(id)}
        />,
        <GridActionsCellItem
          key={2}
          color="inherit"
          icon={<DeleteIcon color="info" />}
          label="Delete"
          onClick={() => onDeleteClick(id)}
        />,
      ]
    },
  },
  {
    field: 'id',
    headerName: 'Id',
    width: 300,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'employee_name',
    headerName: 'Employee name',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'position',
    headerName: 'Position',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'filial_name',
    headerName: 'Filial name',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'clinic_name',
    headerName: 'Clinic name',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
]
