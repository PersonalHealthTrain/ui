<template>
  <client-view :title="title">
    <v-data-table
      :headers="headers"
      :items="shownProjects"
      hide-actions
      class="elevation-1"
    >

      <template
        slot="items"
        slot-scope="props">
        <tr @click="routeTo(props.item.id)">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.train }}</td>
          <td><strong>Review this Project</strong></td>
        </tr>
      </template>

    </v-data-table>
  </client-view>
</template>

<script>
import ClientView from '~/components/ClientView'
import ProjectConsumer from '~/mixins/project-consumer'

export default {
  components: {
    ClientView
  },
  mixins: [ProjectConsumer],

  props: {
    kind: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    headers: [
      { text: 'Project ID', align: 'left', value: 'id' },
      { text: 'Title', value: 'name', align: 'left' },
      { text: 'Train', value: 'train', align: 'left' },
      { text: 'Action', value: 'action', align: 'left' }
    ]
  }),
  computed: {
    title() {
      if (this.kind === 'approved') {
        return 'Approved Projects'
      } else if (this.kind === 'rejected') {
        return 'Rejected projects'
      } else if (this.kind === 'pending') {
        return 'Pending Projects'
      }
    },
    // Show Projects that match state and approval
    shownProjects() {
      if (this.$store.state.selectedStation === null) {
        return []
      }
      const stationId = this.$store.state.selectedStation.id

      return this.projects.filter(project => {
        return project[this.kind + 'By'].some(
          station => station.id === stationId
        )
      })
    }
  },

  methods: {
    routeTo(projectId) {
      this.$router.push('review/' + projectId)
    }
  }
}
</script>
