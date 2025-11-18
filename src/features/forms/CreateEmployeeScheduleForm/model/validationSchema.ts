import * as yup from 'yup'

export const validationSchema = (isMaintainer: boolean) =>
  yup.object({
    clinic: isMaintainer
      ? yup.string().required('Clinic is required')
      : yup.string().default(''),
    employee: yup.string().required('Employee is required'),
    filial: yup.string().required('Filial is required'),
    work_time: yup.object({
      monday: yup
        .array()
        .of(
          yup.object({
            from: yup.number().required(),
            to: yup.number().required(),
          })
        )
        .default([]),
      tuesday: yup
        .array()
        .of(
          yup.object({
            from: yup.number().required(),
            to: yup.number().required(),
          })
        )
        .default([]),
      wednesday: yup
        .array()
        .of(
          yup.object({
            from: yup.number().required(),
            to: yup.number().required(),
          })
        )
        .default([]),
      thursday: yup
        .array()
        .of(
          yup.object({
            from: yup.number().required(),
            to: yup.number().required(),
          })
        )
        .default([]),
      friday: yup
        .array()
        .of(
          yup.object({
            from: yup.number().required(),
            to: yup.number().required(),
          })
        )
        .default([]),
      saturday: yup
        .array()
        .of(
          yup.object({
            from: yup.number().required(),
            to: yup.number().required(),
          })
        )
        .default([]),
      sunday: yup
        .array()
        .of(
          yup.object({
            from: yup.number().required(),
            to: yup.number().required(),
          })
        )
        .default([]),
    }),
  })
