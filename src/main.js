import { createApp } from 'vue'
import axios from 'axios'
import VueCookies from 'vue3-cookies'
import VueAxios from 'vue-axios'
import Toaster from '@meforma/vue-toaster'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import i18n from './i18n'
import '@/main.less'

const app = createApp(App)

app
  .use(Toaster)
  .use(VueAxios, axios)
  .use(VueCookies)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
