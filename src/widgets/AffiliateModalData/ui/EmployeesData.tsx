import { useState } from 'react'

import { EditFilialToEmployeeForm } from '@features/forms/EditFilialToEmployeeForm'

import { FilialEmployeesTable } from '@widgets/tables/FilialEmployeesTable'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Typography } from '@shared/ui/Typography'

interface EmployeesDataProps {
  filialId: string
}

export const EmployeesData = ({ filialId }: EmployeesDataProps) => {
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

        <FilialEmployeesTable filialId={filialId} />
      </Box>

      <Modal
        formId="edit-filial-to-employee-form"
        maxWidth="md"
        open={employeesModalOpen}
        title="Edit employees"
        onClose={() => setEmployeesModalOpen(false)}
      >
        <EditFilialToEmployeeForm
          filialId={filialId}
          onClose={() => setEmployeesModalOpen(false)}
        />
      </Modal>
    </>
  )
}
