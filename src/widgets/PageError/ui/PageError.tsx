import { Box, Button } from '@mui/material'

export const PageError = () => {
  const reloadPageHandler = () => {
    location.reload()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Button color="primary" variant="contained" onClick={reloadPageHandler}>
        Refresh page
      </Button>
    </Box>
  )
}
