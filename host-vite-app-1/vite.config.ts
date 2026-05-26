import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), federation({
    name: "hostApp1",
    filename: "remoteEntry.js",
    remotes: {
      remoteApp2: "http://localhost:5201/assets/remoteEntry.js",
    },
    shared: ["react", "react-dom"],
  })],
  server: {
    port: 5200,
  },
})
