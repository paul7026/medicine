import { LoginForm } from '@features/forms/LoginForm'

import { Page } from '@shared/ui/Page'

const LoginPage = () => {
  return (
    <Page
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoginForm />
    </Page>
  )
}

export default LoginPage
