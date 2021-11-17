import fb from '../../firebase'
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth'

const state = {
  isSignedIn: false,
  uid: null,
  name: null,
  firstName: null,
  lastName: null,
  email: null,
  thumbnail: null
}

const getters = {
  profile: (state) => {
    return {
      isSignedIn: state.isSignedIn,
      uid: state.uid,
      name: state.name,
      firstName: state.firstName,
      email: state.email,
      thumbnail: state.thumbnail

    }
  }
}

const mutations = {
  'UPDATE_SIGNIN_STATE' (state, status = false) {
    state.isSignedIn = status
  },
  'UPDATE_USER_DETAILS' (state, data = {}) {
    state.uid = data.uid
    state.email = data.email
    state.firstName = data.firstName
    state.lastName = data.lastName
    state.name = data.name
    state.thumbnail = data.photoUrl
  }
}

const actions = {
  async signInPopup ({ state, commit }) {
    if (state.isSignedIn) {
      // do nothing
    }
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(fb.auth, provider)

      var u = {}
      u.uid = result.user.uid
      u.email = result.user.email
      u.name = result.user.displayName
      u.firstName = result._tokenResponse.firstName
      u.lastName = result._tokenResponse.lastName
      u.thumbnail = result.user.photoUrl
      commit('UPDATE_USER_DETAILS', u)
      commit('UPDATE_SIGNIN_STATE', true)
      // save token in session
      sessionStorage.email = u.email
      sessionStorage.refreshToken = result.user.stsTokenManager.refreshToken
      sessionStorage.accessToken = result.user.stsTokenManager.accessToken

      if (result.user.isNewUser) {
        // save user details in DB
      }
      console.log(result.user)
      sessionStorage.uid = u.uid
    } catch (error) {
      console.log(error)
      commit('UPDATE_SIGNIN_STATE', false)
    }
  },
  async signIn ({ state, commit }) {
    if (state.isSignedIn) {
      // do nothing
    }
    const provider = new GoogleAuthProvider()
    try {
      await signInWithRedirect(fb.auth, provider)
      const result = await getRedirectResult(fb.auth)
      var u = {}
      u.uid = result.user.uid
      u.email = result.user.email
      u.name = result.user.displayName
      u.firstName = result._tokenResponse.firstName
      u.lastName = result._tokenResponse.lastName
      u.thumbnail = result.user.photoUrl
      commit('UPDATE_USER_DETAILS', u)
      commit('UPDATE_SIGNIN_STATE', true)
      // save token in session
      sessionStorage.email = u.email
      sessionStorage.refreshToken = result.user.stsTokenManager.refreshToken
      sessionStorage.accessToken = result.user.stsTokenManager.accessToken

      if (result.user.isNewUser) {
        // save user details in DB
      }
      console.log(result.user)
      sessionStorage.uid = u.uid
    } catch (error) {
      console.log(error)
      commit('UPDATE_SIGNIN_STATE', false)
    }
  },
  async signOff ({ commit }) {
    try {
      await signOut(fb.auth)
      commit('UPDATE_SIGNIN_STATE', false)
      commit('UPDATE_USER_DETAILS', {})
      delete sessionStorage.email
      delete sessionStorage.refreshToken
      delete sessionStorage.accessToken
    } catch (error) {
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
