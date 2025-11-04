import { registerPlugins } from '@/plugins'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
registerPlugins(app)
app.mount('#app')
app.use(router)
app.use(createPinia())
