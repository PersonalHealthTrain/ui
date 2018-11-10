<template>
  <div>

    <!-- Toolbar -->
    <v-toolbar
      color="white">
      <v-toolbar-title>Train</v-toolbar-title>
    </v-toolbar>

    <item-table
      :headers="headers"
      :items="trains"
      :fetch-complete="trainFetchComplete">
      <template
        slot="items"
        slot-scope="props">
        <tr>
          <td>{{ props.item.namespace }}</td>
          <td>{{ props.item.name }}</td>
        </tr>
      </template>
    </item-table>
  </div>
</template>

<script>
import TrainConsumer from '../mixins/trains-consumer'
import ItemTable from '../components/item-table'

export default {
  components: { ItemTable },
  mixins: [TrainConsumer],
  data: () => ({
    headers: [
      { text: 'Namespace', align: 'left', value: 'namespace' },
      { text: 'Name', value: 'name', align: 'left' }
    ]
  })
}
</script>
