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
        primary: '#99c1de',
        secondary: '#eddcd2',
        tertiary: '#c5dedd',
        accent: '#f29f5e',
        error: '#ee6055',
        warning: '#ff9b85',
        info: '#99a2de',
        success: '#c5dedd',
        dark: '#343a40',
        grey: '#495057',
        lightgrey: '#fff1e6',
        white: '#f0efeb'
      }
    }
  }
}
export default new Vuetify(opts)
