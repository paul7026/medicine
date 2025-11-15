import { ModalValues } from './types'

export const getDataModal = (): ModalValues => {
  return {
    changeFilials: {
      title: `Change filials`,
      formId: 'change-filials-form',
    },

    changeEmployees: {
      title: 'Change employees',
      formId: 'change-employees-form',
    },
  }
}
