import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/color-mode'],
  colorMode: {
    preference: 'light', // Sets the default theme to light
    storageKey: 'custom-key-color-mode'
  },
  // other nuxt config options
});