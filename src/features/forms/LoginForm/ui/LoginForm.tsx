import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

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

  const onSubmit = (data: LoginFormValues) => {
    console.log(data)
    navigate('/')
  }

  return (
    <Card sx={{ width: 600 }}>
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <TextFieldControl form={form} label="Username *" name="username" />
          <TextFieldControl
            form={form}
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
