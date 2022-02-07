import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#42b883',
        destructive: '#B71C1C',
        offColor: '#272727',
      },
    },
  },
})
