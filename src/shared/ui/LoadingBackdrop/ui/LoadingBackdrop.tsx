import { Backdrop } from '@mui/material'

import { CircularProgress } from '@shared/ui/CircularProgress'

export const LoadingBackdrop = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Backdrop
      open={isLoading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress />
    </Backdrop>
  )
}
