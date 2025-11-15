import dayjs from 'dayjs'
import * as Yup from 'yup'

import { SlotsFormValues } from './types'

export const validationSchema = (
  isMaintainer: boolean
): Yup.ObjectSchema<SlotsFormValues> =>
  Yup.object().shape({
    from_date: Yup.mixed<dayjs.Dayjs>()
      .nullable()
      .required('From date is required'),
    to_date: Yup.mixed<dayjs.Dayjs>()
      .nullable()
      .required('To date is required')
      .test(
        'is-after-from',
        'To date must be on or after from date',
        function (value) {
          const { from_date } = this.parent

          if (!value || !from_date) return true

          return value.isSame(from_date) || value.isAfter(from_date)
        }
      ),
    clinic_id: isMaintainer
      ? Yup.string().required('Clinic is required')
      : Yup.string(),
  })
