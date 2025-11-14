import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

import { CreatePromptForm } from './CreatePromptForm'

export const PromptsActions = () => {
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
        Add prompt
      </Button>
      <Modal
        formId="create-prompt-form"
        open={open}
        title="Create new prompt"
        onClose={handleClose}
      >
        <CreatePromptForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
