import moment from 'moment'
import apiEvents from '../../api/events'
const state = {
  events: [],
  eventColors: [
    '#a4a9ef',
    '#c5a4ef',
    '#a4cfef',
    '#a9efa4',
    '#efa4a9',
    '#efeaa4'
  ]
}

const getters = {
  events: (state) => {
    const events = []
    state.events.forEach(e => {
      e.start = moment(e.start).format('YYYY-MM-DD HH:mm')
      e.end = moment(e.end).format('YYYY-MM-DD HH:mm')
      events.push(e)
    })
    return events
  }
}

const mutations = {
  'UPDATE_EVENTS' (state, events = []) {
    state.events = events
  }
}

const actions = {
  async getEvents ({ commit, state }, data) {
    const result = await apiEvents.getEvents(new Date(data.start), new Date(data.end))
    commit('UPDATE_EVENTS', result)
    return result
  },
  async saveEvent ({ commit }, data) {
    try {
      if (data.color == null || data.color === '') {
        const rnd = Math.floor(Math.random() * state.eventColors.length - 1)
        data.color = state.eventColors[rnd]
      }
      const result = await apiEvents.saveEvent(data)
      return result
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
