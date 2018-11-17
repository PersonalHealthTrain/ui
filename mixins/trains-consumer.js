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

        // Fake the existence of some statistics train
        this.trains.push({
          namespace: 'personalhealthtrain',
          name: 'train_statistics',
          last_updated: '2018-11-17T1127:05.984937Z'
        })
        this.trainFetchComplete = true
      }
    })
  }
}
