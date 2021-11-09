import { auth } from './firebase'
import store from './store'

auth.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('user/UPDATE_SIGNIN_STATE', true)
    store.commit('user/UPDATE_USER_DETAILS', user)
  } else {
    store.commit('user/UPDATE_SIGNIN_STATE', false)
    store.commit('user/UPDATE_USER_DETAILS', {})
  }
})
