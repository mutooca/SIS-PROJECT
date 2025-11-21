/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert/localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert/localhost.pem')),
    },
    port: 5173,
  },
})*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Função para carregar certificados apenas se existirem
function getHttpsConfig() {
  const keyPath = path.resolve(__dirname, 'cert/localhost-key.pem')
  const certPath = path.resolve(__dirname, 'cert/localhost.pem')

  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    return {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }
  }

  // Se os certificados não existirem, usa HTTP
  return false
}

export default defineConfig({
  plugins: [react()],
  server: {
    https: getHttpsConfig(),
    port: 5173,
  },
})
