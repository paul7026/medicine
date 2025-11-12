import react from '@vitejs/plugin-react'

import ReactCompiler from 'babel-plugin-react-compiler'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import CircularDependency from 'vite-plugin-circular-dependency'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  process.env = { ...process.env, ...env }
  const proxyUrl = process.env.VITE_BASE_URL

  console.log(proxyUrl)

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
        '/auth': {
          target: proxyUrl,
          changeOrigin: true,
        },
        '/api': {
          target: proxyUrl,
          changeOrigin: true,
        },
        '/upload': {
          target: proxyUrl,
          changeOrigin: true,
        },
        '/download': {
          target: proxyUrl,
          changeOrigin: true,
        },
        '/ws': {
          target: proxyUrl,
          changeOrigin: true,
          ws: true,
          secure: false,
          headers: {
            Connection: 'Upgrade',
            Upgrade: 'websocket',
          },
        },
      },
    },
  })
}
