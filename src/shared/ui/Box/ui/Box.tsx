import { Box as BoxMui, BoxProps } from '@mui/material'

export const Box = ({ ...props }: BoxProps) => {
  return <BoxMui {...props} />
}
