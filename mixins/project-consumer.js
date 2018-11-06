const projects = 'projects'
export default {
  data: () => ({
    projects: []
  }),
  created() {
    this.$axios.$get(projects).then(data => {
      if (projects in data) {
        this.projects = data[projects]
      }
    })
  }
}
