const projects = 'projects'
const url = `http://localhost:9000/${projects}`

export default {
  methods: {
    // One particular project
    getProject(projectId) {
      return this.$axios.$get(url + '/' + projectId)
    },
    getProjectsForStation(stationId) {
      return this.$axios.$get(url + '?station=' + stationId)
    }
  }
}
