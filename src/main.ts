import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

import 'sweetalert2/dist/sweetalert2.css'

import './css/animations.css'
import './css/styles.css'

createApp(App)
    .use( createPinia() )
    .use(router)
    .mount('#app')
