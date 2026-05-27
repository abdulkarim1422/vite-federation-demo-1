import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

const assetDir = 'mf/remote/assets'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuildWatch = command === 'build' && process.env.npm_lifecycle_event === 'build:watch'
  const isHTTPS = process.env.npm_lifecycle_event === 'dev:https'

  return {
    // index.html at /; bundles + remoteEntry at /mf/remote/assets/*
    base: '/',
    plugins: [react(), tailwindcss(), federation({
        name: 'remoteApp2',
        filename: 'remoteEntry.js',
        exposes: {
          './Button': './src/components/Button.tsx',
          './App': './src/App.tsx',
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
      }),
    ],
    build: {
      outDir: 'dist',
      assetsDir: assetDir,
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      target: 'es2022',
      minify: false,
      rollupOptions: {
        output: {
          chunkFileNames: `${assetDir}/[hash].js`,
          entryFileNames: `${assetDir}/[hash].js`,
          assetFileNames: `${assetDir}/[hash][extname]`,
        },
      },
      ...(isBuildWatch
        ? {
          watch: ({
            chokidar: {
              usePolling: true,
              interval: 300,
            },
          } as any),
        }
        : {}),
    },
    server: {
      port: 5201,
      watch: {
        usePolling: true,
        interval: 300,
      },
      ...(isHTTPS
        ? {
          https: {
            key: './localhost-key.pem',
            cert: './localhost.pem',
          },
        }
        : {}),
    },
  }
})
