import axios from 'axios'

import { cookies } from './cookies'

const baseURL = '/api'

const $api = axios.create({
  withCredentials: true,
  baseURL,
})

$api.interceptors.request.use(
  (config) => {
    const token = cookies.get('token')
    if (token) {
      config.headers.Authorization = `jwt ${token}`
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

      cookies.remove('token', {
        path: '/',
        secure: false,
      })

      window.location.href = '/login'

      localStorage.clear()

      // TODO на данный момент мы не получаем refreshToken
      //   try {
      //     const refreshToken = cookies.get('refreshToken')
      //     const response = await axios.post(
      //       `${baseURL}/auth/renew-tokens`,
      //       {
      //         refresh_token: refreshToken,
      //       },
      //       {
      //         headers: {
      //           'Accept-language': i18n.language,
      //         },
      //       }
      //     )
      //     const { access_token } = response.data
      //     cookies.set('token', access_token, {
      //       path: '/',
      //       secure: false,
      //     })
      //     originalRequest.headers.Authorization = `Bearer ${access_token}`
      //     return axios(originalRequest)
      //   } catch (error) {}
    }

    return Promise.reject(error)
  }
)

export default $api
