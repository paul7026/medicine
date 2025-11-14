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

    // Check if error has response and is 401 Unauthorized
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh'
    ) {
      originalRequest._retry = true

      try {
        const refreshToken = cookies.get('refresh_token')

        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        // Use $api instance with proper baseURL
        const response = await axios.post(`${baseURL}/auth/refresh`, {
          refresh_token: refreshToken,
        })

        const { access_token, refresh_token: newRefreshToken } = response.data

        cookies.set('access_token', access_token, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })

        cookies.set('refresh_token', newRefreshToken, {
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })

        // Update the original request with new token
        originalRequest.headers.Authorization = `bearer ${access_token}`
        return $api(originalRequest)
      } catch (refreshError) {
        // If refresh fails, clear everything and redirect to login
        cookies.remove('access_token', {
          path: '/',
        })
        cookies.remove('refresh_token', {
          path: '/',
        })
        localStorage.clear()

        // Only redirect if not already on login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default $api
