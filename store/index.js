import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      selectedStation: null
    }),
    mutations: {
      setStation(state, station) {
        state.selectedStation = station
        alert('You are now: ' + state.selectedStation.name)
      }
    }
  })
}
export default createStore
