import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Obtener el nombre del repositorio desde el package.json o como variable de entorno
const repositoryName = 'ingles-tiempos-verbales'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  base: process.env.NODE_ENV === 'production' ? `/${repositoryName}/` : '/',
})
