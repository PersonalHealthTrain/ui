const projects = 'projects'
const url = `http://localhost:9000/${projects}/`

export default {
  methods: {
    // One particular project
    getProject(projectId) {
      return this.$axios.$get(url + projectId)
    },

    // Private
    getUpdatedStations(response, state) {
      const stations = response[state + 'By']
      stations.forEach(station => (station['state'] = state))
      return stations
    },
    approvedStations(response) {
      return this.getUpdatedStations(response, 'approved')
    },
    rejectedStations(response) {
      return this.getUpdatedStations(response, 'rejected')
    },
    pendingStations(response) {
      return this.getUpdatedStations(response, 'pending')
    },
    getStations(response) {
      return this.approvedStations(response)
        .concat(this.rejectedStations(response))
        .concat(this.pendingStations(response))
    }
  }
}
