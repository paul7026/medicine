import axios from 'axios'

import { cookies } from './cookies'

const baseURL = '/admin'

const $api = axios.create({
  withCredentials: true,
  baseURL,
})

$api.interceptors.request.use(
  (config) => {
    const token = cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `bearer ${token}`
    }
    return config
  },

  (error) => Promise.reject(error)
)

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      cookies.remove('access_token', {
        path: '/',
        secure: false,
      })

      window.location.href = '/login'

      localStorage.clear()

      try {
        const refreshToken = cookies.get('refresh_token')
        const response = await axios.post(`${baseURL}/admin/auth/refresh`, {
          refresh_token: refreshToken,
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

        originalRequest.headers.Authorization = `bearer ${access_token}`
        return axios(originalRequest)
      } catch (err) {
        console.log(err)
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default $api
