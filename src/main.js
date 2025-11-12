import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) 

app.use(pinia)
app.use(router)
registerPlugins(app)

app.mount('#app')