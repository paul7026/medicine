import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { CreateFavourForm } from '@features/forms/CreateFavourForm'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

export const FavoursActions = () => {
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
        Add favour
      </Button>
      <Modal
        formId="create-favour-form"
        open={open}
        title="Create new favour"
        onClose={handleClose}
      >
        <CreateFavourForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
