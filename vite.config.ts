import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Obtener el nombre del repositorio desde el package.json o como variable de entorno
const repositoryName = 'ingles-tiempos-verbales'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repositoryName}/` : '/',
})
