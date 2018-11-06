<template>
  <div>
    <v-toolbar>
      <v-toolbar-title>Route for Train: {{ trainId }}</v-toolbar-title>
    </v-toolbar>       <v-container
      grid-list-md
      text-xs-center>
      <v-layout
        row
        wrap>
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="route"
            hide-actions
            class="elevation-1"
          >
            <template
              slot="items"
              slot-scope="props">
              <!-- Train Preparation -->
              <tr>
                <td>0</td>
                <td>NA</td>
                <td>Train Preparation</td>
                <td><route-state-cell :route-state="currentStation === -1 ? 'computing' : 'done'" /></td>
              </tr>
              <tr>
                <td>{{ props.item.id }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import RailedTrainConsumer from '~/mixins/railed-train-consumer'
import RouteStateCell from '../../../../components/RouteStateCell'

export default {
  components: { RouteStateCell },
  mixins: [RailedTrainConsumer],

  data: () => ({
    headers: [
      { text: 'Stop', value: 'stop', align: 'center' },
      { text: 'Station ID', value: 'id', align: 'center' },
      { text: 'Name', value: 'name', align: 'center' },
      { text: 'State', value: 'state', align: 'center' }
    ]
  }),

  computed: {
    currentStation() {
      if (this.railedTrain !== null) {
        return this.railedTrain.currentStation
      }
      return -1
    },

    route() {
      if (this.railedTrain !== null) {
        const result = this.railedTrain.route
        return result
      }
      return []
    }
  }
}
</script>
