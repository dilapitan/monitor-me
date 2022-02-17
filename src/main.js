import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import VCalendar from 'v-calendar'
import router from './router'

Vue.config.productionTip = false
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',
})

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app')
