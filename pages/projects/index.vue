<template>
  <client-view title="My Projects">
    <v-data-table
      :headers="headers"
      :items="projects"
      hide-actions
      class="elevation-1"
    >

      <template
        slot="items"
        slot-scope="props">
        <tr @click="routeTo(props.item.id)">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.railedTrains.length }}</td>
          <td><strong>View Project Page</strong></td>
        </tr>
      </template>

    </v-data-table>
  </client-view>
</template>
<script>
import ClientView from '~/components/ClientView'
import ProjectConsumer from '~/mixins/projects-consumer'

export default {
  components: {
    ClientView
  },
  mixins: [ProjectConsumer],
  data: () => ({
    headers: [
      { text: 'Project ID', align: 'left', value: 'id' },
      { text: 'Title', value: 'name', align: 'left' },
      { text: 'Contact', value: 'contact', align: 'left' },
      {
        text: 'Number of railed Trains',
        value: 'nRailedTrains',
        align: 'left'
      },
      { text: 'Actions', value: 'actions', align: 'left' }
    ]
  }),

  methods: {
    routeTo(projectId) {
      this.$router.push('projects/' + projectId)
    }
  }
}
</script>
