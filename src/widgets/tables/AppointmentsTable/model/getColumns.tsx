import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid'

import { formatIsoString } from '@shared/helpers/formatIsoString'

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
          key={0}
          className="textPrimary"
          color="inherit"
          icon={<EditIcon color="info" />}
          label="Edit"
          onClick={() => onEditClick(id)}
        />,
        <GridActionsCellItem
          key={1}
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
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'user_name',
    headerName: 'User name',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'filial_name',
    headerName: 'Filial name',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'employee_name',
    headerName: 'Employee name',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'favour_name',
    headerName: 'Favour name',
    minWidth: 200,
    headerAlign: 'center',
    align: 'center',
  },
]
