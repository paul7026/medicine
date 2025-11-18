import { useState } from 'react'

import { EditFavoursToFilialsForm } from '@features/forms/EditFavoursToFilialsForm.tsx'

import { FavoursFilialTable } from '@widgets/tables/FavoursFilialTable.tsx'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Typography } from '@shared/ui/Typography'

import { FavourToFilialDataProps } from '../model/types'

export const FavourToFilialsData = ({ favourId }: FavourToFilialDataProps) => {
  const [filialsModalOpen, setFilialsModalOpen] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'space-between' }}>
          <Typography variant="h6">Filials</Typography>
          <Button variant="contained" onClick={() => setFilialsModalOpen(true)}>
            Edit filials
          </Button>
        </Box>

        <FavoursFilialTable favourId={favourId} />
      </Box>

      <Modal
        formId="edit-favour-to-filials-form"
        maxWidth="md"
        open={filialsModalOpen}
        title="Edit filials"
        onClose={() => setFilialsModalOpen(false)}
      >
        <EditFavoursToFilialsForm
          favourId={favourId}
          onClose={() => setFilialsModalOpen(false)}
        />
      </Modal>
    </>
  )
}
