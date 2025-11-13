import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid'

import { Box } from '@shared/ui/Box'

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
    minWidth: 330,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 330,
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'tenant',
    headerName: 'Tenant',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'clinic_id',
    headerName: 'Clinic id',
    minWidth: 330,
    headerAlign: 'center',
    align: 'center',
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
]
