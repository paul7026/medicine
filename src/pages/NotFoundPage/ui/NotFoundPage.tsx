import { Box } from '@shared/ui/Box'
import { Typography } from '@shared/ui/Typography'

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography sx={{ fontSize: 200 }} variant="h1">
        404
      </Typography>
      <Typography sx={{ lineHeight: 2 }} variant="h4">
        Not Found
      </Typography>
      <Typography color="textSecondary" variant="body1">
        The resource requested could not be found on this server!
      </Typography>
    </Box>
  )
}

export default NotFoundPage
