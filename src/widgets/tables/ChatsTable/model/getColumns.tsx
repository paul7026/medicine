import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'

import { Chat } from '@entities/chats'

import { Box } from '@shared/ui/Box'

export const getColumns = (
  onEditClick: (chat: Chat) => void,
  onViewClick: (chat: Chat) => void
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
    field: 'name',
    headerName: 'Name',
    minWidth: 200,
    flex: 1,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'channel',
    headerName: 'Channel',
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'current_intent',
    headerName: 'Current intent',
    width: 150,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'last_message_preview',
    headerName: 'Last message preview',
    minWidth: 300,
    flex: 1,
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
