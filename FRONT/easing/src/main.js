import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import VueKonva from 'vue-konva';

const pinia = createPinia()
loadFonts()

createApp(App)
  .use(router).use(pinia).use(VueKonva).mount('#app')
