import 'material-design-icons-iconfont'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)
const opts = {
  icons: {
    iconfont: 'md'
  },
  theme: {
    light: true,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#f6bd60',
        secondary: '#f7ede2',
        tertiary: '#f5cac3',
        accent: '#ff8500',
        error: '#f07167',
        warning: '#f07167',
        info: '#0078D7',
        success: '#84a59d',
        dark: '#343a40',
        grey: '#495057',
        lightgrey: '#ced4da',
        white: '#f8f9fa'
      }
    }
  }
}
export default new Vuetify(opts)
