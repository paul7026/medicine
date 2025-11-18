import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { CreateEmployeeScheduleForm } from '@features/forms/CreateEmployeeScheduleForm'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

export const EmployeeScheduleActions = () => {
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
        Add schedule
      </Button>
      <Modal
        withoutActionButtons
        formId="create-employee-schedule-form"
        maxWidth="lg"
        open={open}
        title="Create employee schedule"
        onClose={handleClose}
      >
        <CreateEmployeeScheduleForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
