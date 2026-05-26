import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), federation({
      name: "hostApp1",
      filename: "remoteEntry.js",
      remotes: {
        remoteApp2: env.REMOTE_APP_2_URL
          ? `${env.REMOTE_APP_2_URL}/mf/remote/assets/remoteEntry.js`
          : 'http://localhost:5201/mf/remote/assets/remoteEntry.js'
      },
      shared: ["react", "react-dom"],
    })],
    server: {
      port: 5200,
    },
  }
})
