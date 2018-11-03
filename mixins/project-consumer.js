const projects = 'projects'
const url = `http://localhost:9000/${projects}`

export default {
  data: () => ({
    projects: []
  }),
  created() {
    this.$axios.$get(url).then(data => {
      if (projects in data) {
        this.projects = data[projects]
      }
    })
  }
}
