import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export interface AddableValuesFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>
  autocompleteLabel: string
  inputLabel: string
  autocompleteName: Path<T>
  inputName: Path<T>
  autocompleteOptions: string[]
  onNewOptionAdd: (values: string[]) => void
}
