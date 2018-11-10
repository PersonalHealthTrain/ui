const stations = 'stations'

export default {
  data: () => ({
    stations: []
  }),
  created() {
    this.$axios.$get(stations).then(data => {
      if (stations in data) {
        this.stations = data[stations]
      }
    })
  }
}
