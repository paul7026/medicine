import axios from 'axios'

import { createThunkWithErrorHandler } from '@shared/helpers/createThunkWithErrorHandler'
import { cookies } from '@shared/http/cookies'

interface LoginPayload {
  username: string
  password: string
}

interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: 'bearer'
}

export const loginApi = createThunkWithErrorHandler<
  LoginResponse,
  LoginPayload
>('auth/login', async (payload) => {
  const response = await axios.post<LoginResponse>('/admin/auth/login', {
    ...payload,
  })

  const { access_token, refresh_token } = response.data

  cookies.set('access_token', access_token, {
    path: '/',
    secure: false,
  })

  cookies.set('refresh_token', refresh_token, {
    path: '/',
    secure: false,
  })

  return response.data
})
