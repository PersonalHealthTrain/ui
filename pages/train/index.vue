<template>
  <div>

    <!-- Toolbar -->
    <v-toolbar
      flat
      color="white">
      <v-toolbar-title>Stations</v-toolbar-title>
    </v-toolbar>


    <v-data-table
      :headers="headers"
      :items="trains"
      hide-actions
      class="elevation-1"
    >
      <template
        slot="items"
        slot-scope="props">
        <td>{{ props.item.namespace }}</td>
        <td>{{ props.item.name }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import TrainConsumer from '../../mixins/train-consumer'

export default {
  mixins: [TrainConsumer],
  data: () => ({
    headers: [
      { text: 'Namespace', align: 'left', value: 'namespace' },
      { text: 'Name', value: 'name', align: 'left' }
    ]
  })
}
</script>
