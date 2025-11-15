import AddIcon from '@mui/icons-material/Add'

import { useState } from 'react'

import { UploadDocumentForm } from '@features/UploadDocumentForm'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

export const DocumentsActions = () => {
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
        Add document
      </Button>
      <Modal
        formId="upload-document-form"
        open={open}
        title="Upload new document"
        onClose={handleClose}
      >
        <UploadDocumentForm onClose={handleClose} />
      </Modal>
    </Box>
  )
}
