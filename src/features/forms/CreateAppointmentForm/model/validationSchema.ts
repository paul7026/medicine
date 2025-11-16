import { GridRowId } from '@mui/x-data-grid'

import * as Yup from 'yup'

import { CreateAppointmentFormValues } from './types'

export const validationSchema = (
  isMaintainer: boolean,
  appointmentId: GridRowId | null | undefined
): Yup.ObjectSchema<CreateAppointmentFormValues> =>
  Yup.object().shape({
    clinic_id:
      isMaintainer && !appointmentId
        ? Yup.string().required().trim()
        : Yup.string().trim(),
    user_id: !appointmentId
      ? Yup.string().required().trim()
      : Yup.string().trim(),
    status: Yup.string().required().trim(),
    contact: Yup.string().trim(),
    favour_id: Yup.string().required().trim(),
    filial_id: Yup.string().required().trim(),
    employee_id: Yup.string().trim(),
    slot_id: Yup.string().required().trim(),
  })
