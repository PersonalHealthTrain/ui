const projects = 'projects'
const url = `${projects}/`

// Private
function getUpdatedStations(response, state) {
  const stations = response[state + 'By']
  stations.forEach(station => (station['state'] = state))
  return stations
}

export default {
  methods: {
    // One particular project
    getProject(projectId) {
      return this.$axios.$get(url + projectId)
    },

    getStations(response) {
      return getUpdatedStations(response, 'approved')
        .concat(getUpdatedStations(response, 'rejected'))
        .concat(getUpdatedStations(response, 'pending'))
    }
  }
}
