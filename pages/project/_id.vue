<template>
  <client-view :title="title">
    <form>
      <v-textarea
        :value="description"
        readonly
      />
    </form>
  </client-view>
</template>

<script>
import ClientView from '~/components/ClientView'
import ProjectIdConsumer from '~/mixins/project-id-consumer'

export default {
  components: {
    ClientView
  },

  mixins: [ProjectIdConsumer],
  data: () => ({
    title: '',
    description: ''
  }),

  created() {
    this.getProject(this.$route.params['id']).then(response => {
      this.title = response.title
      this.description = response.description
    })
  }
}
</script>
