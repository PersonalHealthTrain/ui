export default {
  methods: {
    submitTrain(trainSubmission) {
      const projectId = trainSubmission.projectId
      const url = `http://localhost:9000/projects/${projectId}/train`
      this.$axios.post(url, trainSubmission).then(response => {
        const status = response.status
        if (status === 200) {
          alert('Train has been submitted successfully')
        } else {
          alert(
            'Submission of Train has failed. Server responded with code ' +
              status
          )
        }
      })
    }
  }
}
