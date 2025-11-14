import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { getWhoAmIApi, loginApi } from '@entities/auth'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { Card } from '@shared/ui/Card'
import { TextFieldControl } from '@shared/ui/TextField'

import { LoginFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const LoginForm = () => {
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    defaultValues: {
      password: '',
      username: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form
  const { addErrorMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  const onSubmit = (data: LoginFormValues) => {
    dispatch(loginApi(data))
      .unwrap()
      .then(() => {
        dispatch(getWhoAmIApi()).then(() => navigate('/'))
      })
      .catch((err) => addErrorMessage(err))
  }

  return (
    <Card sx={{ width: 600 }}>
      <form
        autoComplete="on"
        id="login-form"
        name="login-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <TextFieldControl
            autoComplete="username"
            form={form}
            id="username"
            label="Username *"
            name="username"
            type="text"
          />
          <TextFieldControl
            autoComplete="current-password"
            form={form}
            id="password"
            label="Password *"
            name="password"
            type="password"
          />

          <Button type="submit" variant="contained">
            login
          </Button>
        </Box>
      </form>
    </Card>
  )
}
