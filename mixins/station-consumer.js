const stations = 'stations'
const url = `http://localhost:9000/${stations}`

export default {
  data: () => ({
    stations: []
  }),
  created() {
    this.$axios.$get(url).then(data => {
      if (stations in data) {
        this.stations = data[stations]
      }
    })
  }
}
