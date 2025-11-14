import react from '@vitejs/plugin-react'

import ReactCompiler from 'babel-plugin-react-compiler'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import CircularDependency from 'vite-plugin-circular-dependency'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  process.env = { ...process.env, ...env }
  const proxyUrl = process.env.BASE_URL || 'https://b8bc855c293e.ngrok-free.app'

  console.log('👉 Loaded BASE_URL:', proxyUrl)

  return defineConfig({
    resolve: {
      alias: {
        '@app': path.resolve('src/app'),
        '@entities': path.resolve('src/entities'),
        '@features': path.resolve('src/features'),
        '@pages': path.resolve('src/pages'),
        '@widgets': path.resolve('src/widgets'),
        '@shared': path.resolve('src/shared'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    plugins: [
      CircularDependency({
        exclude: /node_modules/,
        circleImportThrowErr: true,
        ignoreDynamicImport: false,
      }),
      react({
        babel: {
          plugins: [ReactCompiler],
        },
      }),
    ],
    server: {
      proxy: {
        '/admin/': {
          target: proxyUrl,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  })
}
