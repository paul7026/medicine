import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'
import { UploaderControl } from '@shared/ui/Uploader/ui/UploaderControl'

import { FieldsProps, UploadDocumentFormValues } from '../model/types'

export const Fields = ({ isMaintainer }: FieldsProps) => {
  const form = useFormContext<UploadDocumentFormValues>()

  const { setValue } = form

  const { clinics, status: clinicsStatus } = useAppSelector(clinicsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const isClinicsEmpty = clinicsSelectList.length === 0

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicsApi())
  }, [setValue, dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <UploaderControl
        accept=".pdf, .docx, .png, .jpg, .jpeg"
        form={form}
        label="Upload files (pdf, docx, png, jpg, jpeg)"
        name="file"
      />

      <TextFieldControl form={form} label="Name *" name="name" />

      {isMaintainer && (
        <SelectControl
          fullWidth
          disabled={isClinicsEmpty}
          form={form}
          label={isClinicsEmpty ? 'Clinic is empty *' : 'Clinic *'}
          loading={clinicsStatus === 'pending'}
          name="clinic_id"
          selectItems={clinicsSelectList}
        />
      )}
    </Box>
  )
}
