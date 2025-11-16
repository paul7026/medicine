import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { CreateChatbotForm } from '@features/forms/CreateChatbotForm'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

export const ChatbotActions = () => {
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
        Add chatbot
      </Button>
      <Modal
        formId="create-chatbot-form"
        open={open}
        title="Create new chatbot"
        onClose={handleClose}
      >
        <CreateChatbotForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
