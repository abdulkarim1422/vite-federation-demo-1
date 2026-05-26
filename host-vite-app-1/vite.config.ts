import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), federation({
    name: "hostApp1",
    filename: "remoteEntry.js",
    remotes: {
      remoteApp2: "remoteApp2@http://localhost:5201/remoteEntry.js",
    },
    shared: ["react", "react-dom"],
  })],
  server: {
    port: 5200,
  },
})
