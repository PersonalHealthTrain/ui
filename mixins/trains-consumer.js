const trains = 'trains'

export default {
  data: () => ({
    trains: [],
    trainFetchComplete: false
  }),
  created() {
    this.$axios.$get(trains).then(data => {
      if (trains in data) {
        this.trains = data[trains]
        this.trainFetchComplete = true
      }
    })
  }
}
