import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia' // Import Pinia
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()) // Use Pinia

app.mount('#app')
