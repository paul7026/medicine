import DownloadIcon from '@mui/icons-material/Download'
import { FormControl, FormHelperText, InputAdornment } from '@mui/material'
import { SxProps, Theme } from '@mui/material'

import { useRef } from 'react'

import { TextField } from '@shared/ui/TextField'

import { VisuallyHiddenInput } from './Uploader.styled'

export interface UploaderProps {
  file: File | null
  onChange: (file: File) => void
  sx?: SxProps<Theme>
  error?: boolean
  errorMessage?: string
  id?: string
  accept?: string
}

export const Uploader = ({
  file,
  onChange,
  id,
  error,
  errorMessage,
  sx,
  accept,
}: UploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e.target.files[0])
    }
  }

  const handleTextFieldClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <FormControl error={error} id={id} sx={sx}>
      <TextField
        error={error}
        placeholder="Выберите файл"
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                <DownloadIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          input: { cursor: 'pointer' },
          width: '100%',
        }}
        value={file ? file.name : ''}
        onChange={undefined}
        onClick={handleTextFieldClick}
      />
      <VisuallyHiddenInput
        ref={fileInputRef}
        accept={accept}
        type="file"
        onChange={handleFileChange}
      />

      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}
