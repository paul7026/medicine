import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { CreateEmployeeForm } from '@features/forms/CreateEmployeeForm'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

export const EmployeesActions = () => {
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
        Add employee
      </Button>
      <Modal
        formId="create-employee-form"
        open={open}
        title="Create new employee"
        onClose={handleClose}
      >
        <CreateEmployeeForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
