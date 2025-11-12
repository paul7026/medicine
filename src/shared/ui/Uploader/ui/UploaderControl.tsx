import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Uploader, UploaderProps } from './Uploader'

type UploaderControlProps<T extends FieldValues> = Omit<
  UploaderProps,
  'onChange' | 'file'
> & {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

export const UploaderControl = <T extends FieldValues>({
  form,
  name,
  ...uploaderProps
}: UploaderControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Uploader
          {...field}
          {...uploaderProps}
          error={Boolean(fieldState.error)}
          errorMessage={fieldState.error?.message as string}
          file={field.value}
          onChange={(file) => field.onChange(file)}
        />
      )}
    />
  )
}
