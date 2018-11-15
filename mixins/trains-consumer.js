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

        // Fake the existence of the demonstrator train
        this.trains.push({
          namespace: 'personalhealthtrain',
          name: 'train_demonstrator',
          last_updated: '2018-11-15T1607:04.984937Z'
        })
        this.trainFetchComplete = true
      }
    })
  }
}
