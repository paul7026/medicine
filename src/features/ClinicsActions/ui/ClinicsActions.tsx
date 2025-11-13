import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

import { CreateClinicForm } from './CreateClinicForm'

export const ClinicsActions = () => {
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
        New clinic
      </Button>
      <Modal
        formId="create-form"
        open={open}
        title="Create new admin"
        onClose={handleClose}
      >
        <CreateClinicForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
