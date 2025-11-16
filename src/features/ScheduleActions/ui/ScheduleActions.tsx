import DeleteIcon from '@mui/icons-material/Delete'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'

import { DeleteSlotsForm } from './DeleteSlotsForm'
import { GenerateSlotsForm } from './GenerateSlotsForm'

export const ScheduleActions = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [generateModalOpen, setGenerateModalOpen] = useState(false)

  const handleOpenDelete = () => {
    setDeleteModalOpen(true)
  }

  const handleCloseDelete = () => {
    setDeleteModalOpen(false)
  }

  const handleOpenGenerate = () => {
    setGenerateModalOpen(true)
  }

  const handleCloseGenerate = () => {
    setGenerateModalOpen(false)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          mb: 4,
          gap: 2,
        }}
      >
        <Button
          color="error"
          startIcon={<DeleteIcon />}
          variant="contained"
          onClick={handleOpenDelete}
        >
          Delete slots
        </Button>
        <Button
          startIcon={<PlayArrowIcon />}
          variant="contained"
          onClick={handleOpenGenerate}
        >
          Generate slots
        </Button>
      </Box>

      <Modal
        formId="delete-slots-form"
        open={deleteModalOpen}
        title="Delete slots"
        onClose={handleCloseDelete}
      >
        <DeleteSlotsForm onClose={handleCloseDelete} />
      </Modal>

      <Modal
        formId="generate-slots-form"
        open={generateModalOpen}
        title="Generate slots"
        onClose={handleCloseGenerate}
      >
        <GenerateSlotsForm onClose={handleCloseGenerate} />
      </Modal>
    </>
  )
}
