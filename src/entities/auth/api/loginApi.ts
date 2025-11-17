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

const API = import.meta.env.VITE_API_BASE_URL
const isDev = import.meta.env.MODE === 'development'
const isProduction = import.meta.env.MODE === 'production'
const loginURL = isDev ? '/admin/auth/login' : `${API}/admin/auth/login`

export const loginApi = createThunkWithErrorHandler<
  LoginResponse,
  LoginPayload
>('auth/login', async (payload) => {
  const response = await axios.post<LoginResponse>(
    loginURL,
    {
      ...payload,
    },
    {
      withCredentials: true,
    }
  )

  const { access_token, refresh_token } = response.data

  cookies.set('access_token', access_token, {
    path: '/',
    secure: isProduction,
    sameSite: 'strict',
  })

  cookies.set('refresh_token', refresh_token, {
    path: '/',
    secure: isProduction,
    sameSite: 'strict',
  })

  return response.data
})
