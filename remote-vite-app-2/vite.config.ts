import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // Detect when the npm script `build:watch` is running so we only
  // enable the polling watch + emptyOutDir behavior for that script.
  const isBuildWatch = command === 'build' && process.env.npm_lifecycle_event === 'build:watch'
  const isHTTPS = process.env.npm_lifecycle_event === 'dev:https'

  return {
    plugins: [react(), tailwindcss()],
    build: {
      sourcemap: false, // Don't generate source maps for production builds.
      chunkSizeWarningLimit: 1000,
      target: 'es2022', // or 'esnext' if you have issues with federation
      emptyOutDir: true,
      rollupOptions: {
        output: {
          // Avoid `[name]-[hash]` so lazy chunks and assets are not labeled by source path / component name.
          chunkFileNames: 'assets/[hash].js',
          entryFileNames: 'assets/[hash].js',
          assetFileNames: 'assets/[hash][extname]',
        },
      },
      ...(isBuildWatch
        ? {
          // the chokidar-specific options used for polling on Windows.
          watch: ({
            chokidar: {
              usePolling: true,
              interval: 300,
            },
            // Cast the watch object to `any` to satisfy Vite/Rollup typings for
            } as any),
          }
        : {}),
    },
    server: {
      port: 9830,
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
