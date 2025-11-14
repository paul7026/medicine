import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

import { CreateFilialForm } from './CreateFilialForm'

export const AffiliateActions = () => {
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
        New filial
      </Button>
      <Modal
        formId="create-filial-form"
        open={open}
        title="Create new filial"
        onClose={handleClose}
      >
        <CreateFilialForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
