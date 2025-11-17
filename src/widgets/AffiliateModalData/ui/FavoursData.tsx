import { useState } from 'react'

import { EditFilialToFavoursForm } from '@features/forms/EditFilialToFavoursForm'

import { FilialFavoursTable } from '@widgets/tables/FilialFavoursTable'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Typography } from '@shared/ui/Typography'

interface FavoursDataProps {
  filialId: string
}

export const FavoursData = ({ filialId }: FavoursDataProps) => {
  const [favoursModalOpen, setFavoursModalOpen] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'space-between' }}>
          <Typography variant="h6">Favours</Typography>
          <Button variant="contained" onClick={() => setFavoursModalOpen(true)}>
            Edit favours
          </Button>
        </Box>

        <FilialFavoursTable filialId={filialId} />
      </Box>

      <Modal
        formId="edit-filial-to-favours-form"
        maxWidth="md"
        open={favoursModalOpen}
        title="Edit favours"
        onClose={() => setFavoursModalOpen(false)}
      >
        <EditFilialToFavoursForm
          filialId={filialId}
          onClose={() => setFavoursModalOpen(false)}
        />
      </Modal>
    </>
  )
}
