import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'

import { Admin } from '@entities/admins'

import { Box } from '@shared/ui/Box'

export const getColumns = (
  onDeleteClick: (admin: Admin) => void,
  onEditClick: (admin: Admin) => void
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
]
