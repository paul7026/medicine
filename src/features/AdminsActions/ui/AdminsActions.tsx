import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

import { CreateAdminForm } from './CreateAdminForm'

export const AdminsActions = () => {
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
        New admin
      </Button>
      <Modal
        formId="create-admin-form"
        open={open}
        title="Create new admin"
        onClose={handleClose}
      >
        <CreateAdminForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
