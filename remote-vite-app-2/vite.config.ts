import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

const assetDir = 'mf/remote/assets'

/** Federation emits remoteEntry to dist/assets/; host expects dist/mf/remote/assets/ */
function moveRemoteEntry(): Plugin {
  return {
    name: 'move-remote-entry',
    closeBundle: async () => {
      const src = 'dist/assets/remoteEntry.js'
      const dest = 'dist/mf/remote/assets/remoteEntry.js'
      try {
        await mkdir('dist/mf/remote/assets', { recursive: true })
        let content = await readFile(src, 'utf8')
        // Federation generates paths for dist/assets/; rewrite for dist/mf/remote/assets/
        content = content
          .replaceAll('./../mf/remote/assets/', './')
          .replaceAll('../mf/remote/assets/', './')
        await writeFile(dest, content)
        await rm('dist/assets', { recursive: true, force: true })
      } catch {
        // no-op when file already moved or missing (e.g. dev)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isBuildWatch = command === 'build' && process.env.npm_lifecycle_event === 'build:watch'
  const isHTTPS = process.env.npm_lifecycle_event === 'dev:https'

  return {
    // index.html at /; bundles at /mf/remote/assets/*
    base: '/',
    plugins: [react(), tailwindcss(), moveRemoteEntry(), federation(
      {
        name: 'remoteApp2',
        filename: 'remoteEntry.js',
        exposes: {
          './Button': './src/components/Button.tsx',
          './App': './src/App.tsx',
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
      }
    )],
    build: {
      outDir: 'dist',
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
