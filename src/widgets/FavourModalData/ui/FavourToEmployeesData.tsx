import { useState } from 'react'

import { EditFavourToEmployeeForm } from '@features/forms/EditFavourToEmployeeForm'

import { FavourEmployeesTable } from '@widgets/tables/FavourEmployeesTable'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Typography } from '@shared/ui/Typography'

interface FavourToEmployeesDataProps {
  favourId: string
}

export const FavourToEmployeesData = ({
  favourId,
}: FavourToEmployeesDataProps) => {
  const [employeesModalOpen, setEmployeesModalOpen] = useState(false)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'space-between' }}>
          <Typography variant="h6">Employees</Typography>
          <Button
            variant="contained"
            onClick={() => setEmployeesModalOpen(true)}
          >
            Edit employees
          </Button>
        </Box>

        <FavourEmployeesTable favourId={favourId} />
      </Box>

      <Modal
        formId="edit-favour-to-employee-form"
        maxWidth="md"
        open={employeesModalOpen}
        title="Edit employees"
        onClose={() => setEmployeesModalOpen(false)}
      >
        <EditFavourToEmployeeForm
          favourId={favourId}
          onClose={() => setEmployeesModalOpen(false)}
        />
      </Modal>
    </>
  )
}
