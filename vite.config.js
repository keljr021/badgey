import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({
      colorMode: {
        preference: 'light'
      },
      theme: {
        colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error']
      }
    })
  ]
})