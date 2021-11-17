import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import cfg from './firebaseConfig.json'
import store from './store'
// initialize app
const app = initializeApp(cfg)
const db = getFirestore(app)
const auth = getAuth(app)
const monitorAuthState = function () {
  const p = new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const u = {}
        u.email = user.email
        u.uid = user.uid
        u.name = user.displayName
        u.photoUrl = user.photoURL
        sessionStorage.email = user.email
        sessionStorage.refreshToken = user.stsTokenManager.refreshToken
        sessionStorage.accessToken = user.stsTokenManager.accessToken
        store.commit('user/UPDATE_SIGNIN_STATE', true)
        store.commit('user/UPDATE_USER_DETAILS', u)
        resolve(u)
      } else {
        delete sessionStorage.email
        delete sessionStorage.refreshToken
        delete sessionStorage.accessToken
        store.commit('user/UPDATE_SIGNIN_STATE', false)
        store.commit('user/UPDATE_USER_DETAILS', {})
        reject(Error('Not signed in'))
      }
    })
  })
  return p
}

export default {
  app,
  db,
  auth,
  monitorAuthState
}
