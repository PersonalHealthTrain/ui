export default {
  data: () => ({
    projectId: null,
    trainId: null,
    railedTrain: null
  }),
  created() {
    this.projectId = this.$route.params['projectId']
    this.trainId = this.$route.params['trainId']
    const url = `/projects/${this.projectId}/trains/${this.trainId}`

    this.$axios.$get(url).then(data => {
      this.railedTrain = data
    })
  }
}
