import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { CreateAppointmentForm } from '@features/forms/CreateAppointmentForm'

export const AppointmentsActions = () => {
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
        Add appointment
      </Button>
      <Modal
        formId="create-appointment-form"
        open={open}
        title="Create new appointment"
        onClose={handleClose}
      >
        <CreateAppointmentForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
