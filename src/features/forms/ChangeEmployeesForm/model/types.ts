export interface ChangeEmployeesFormProps {
  closeModal: () => void
  favourId: string
  employeesDefault: string[]
}

export interface ChangeEmployeesFormValues {
  employees: string[]
}
