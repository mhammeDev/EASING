import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
const pinia = createPinia()
import VueKonva from 'vue-konva';




loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
    .use(pinia)
    .use(VueKonva)
    .mount('#app')
