import Vue from 'vue'
import moment from 'moment'

Vue.filter('iniCap', (val) => {
  if (!val) {
    return ''
  }
  return val.charAt(0).toUpperCase() + val.slice(1)
})

Vue.filter('formatDate', (val, format = 'DD-MMM-YYYY') => {
  if (!val) {
    return ''
  }

  return moment(String(val)).format(format)
})

Vue.filter('pad', (val, places = '2', char = '0') => {
  if (!val) {
    return ''
  }
  return String(val).padStart(places, char)
})
