import './assets/main.css'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiCartPlus, BiCaretUpSquareFill, BiCaretDownSquareFill } from "oh-vue-icons/icons"
import { createPinia } from 'pinia'


addIcons(BiCartPlus, BiCaretUpSquareFill, BiCaretDownSquareFill)

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.component("v-icon", OhVueIcon)
app.mount('#app')
