<template>
  <client-view title="Stations">
    <v-data-table
      :headers="headers"
      :items="stations"
      hide-actions
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
      </template>
    </v-data-table>
  </client-view>
</template>

<script>
import StationConsumer from '../../mixins/station-consumer'
import ClientView from '~/components/ClientView'

export default {
  components: {
    ClientView
  },
  mixins: [StationConsumer],
  data: () => ({
    headers: [
      { text: 'Station ID', align: 'left', value: 'id' },
      { text: 'Name', value: 'name', align: 'left' }
    ]
  })
}
</script>
