import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: {
        colorMode: false,
        colors: {
          primary: '',
          secondary: '',
          tertiary: '',
        },
      },
      theme: {
        colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error']
      },
      css: ['~/assets/css/main.css'],
    })
  ]
})