import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

import { CreateScheduleConnectionForm } from './CreateScheduleConnectionForm'

export const ScheduleConnectionsActions = () => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        mb: 4,
      }}
    >
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add connection
      </Button>
      <Modal
        formId="create-form"
        open={open}
        title="Add connection"
        onClose={handleClose}
      >
        <CreateScheduleConnectionForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
