import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import './style.css'
import App from './App.vue'
import VueKonva from 'vue-konva';
import ui from '@nuxt/ui/vue-plugin'
import { router } from './router'

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(ui);
app.use(router);
app.use(VueKonva);

app.mount('#app')
