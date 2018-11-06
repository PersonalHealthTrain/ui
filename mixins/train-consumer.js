const trains = 'trains'
const url = `/${trains}`

export default {
  data: () => ({
    trains: [],
    trainItems: []
  }),
  created() {
    this.$axios.$get(url).then(data => {
      if (trains in data) {
        this.trains = data[trains]
        this.trainItems = this.trains.map(train => train.name)
      }
    })
  }
}
