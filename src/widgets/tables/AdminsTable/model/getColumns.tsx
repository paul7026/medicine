import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { Box } from '@shared/ui/Box'

export const getColumns = (
  onDeleteClick: (id: GridRowId) => void,
  onEditClick: (id: GridRowId) => void
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
    field: 'tenant',
    headerName: 'Tenant',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'clinic_id',
    headerName: 'Clinic id',
    width: 300,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'username',
    headerName: 'Username',
    minWidth: 330,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'is_superuser',
    headerName: 'Is superuser',
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
  {
    field: 'is_active',
    headerName: 'Is active',
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
  {
    field: 'created_at',
    headerName: 'Created at',
    width: 160,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (value: string) => formatIsoString(value),
  },
  {
    field: 'updated_at',
    headerName: 'Updated at',
    width: 160,
    headerAlign: 'center',
    align: 'center',
    valueGetter: (value: string) => formatIsoString(value),
  },
]
