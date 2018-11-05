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
          <td>{{ props.item.train }}</td>
          <td><strong>View Project Page</strong></td>
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
  data: () => ({
    headers: [
      { text: 'Project ID', align: 'left', value: 'id' },
      { text: 'Title', value: 'name', align: 'left' },
      { text: 'Train', value: 'train', align: 'left' },
      { text: 'Actions', value: 'actions', align: 'left' }
    ]
  }),

  methods: {
    routeTo(projectId) {
      this.$router.push('project/' + projectId)
    }
  }
}
</script>
