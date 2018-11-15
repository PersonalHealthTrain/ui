<template>
  <v-container
    grid-list-md
    text-xs-center>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header"><h4>Project Information</h4></div>
        <v-container
          grid-list-md
          text-xs-center>
          <v-layout
            row
            wrap>

            <v-flex xs2>
              <v-card>
                <v-card-text><strong>Title</strong></v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs10>
              <v-card>
                <v-card-text>{{ project.title }}</v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs2>
              <v-card>
                <v-card-text><strong>Description</strong></v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs10>
              <v-card>
                <v-card-text>{{ project.description }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <div slot="header"><h4>Running Trains</h4></div>
        <v-card v-if="project.railedTrains.length < 1">
          <v-card-text>No Trains have been started yet!</v-card-text>
        </v-card>
        <div v-if="project.railedTrains.length > 0">
          <v-card>
            <v-card-text>
              Click a submitted train to get details on the execution state.
              Clicking on a node for a route will fire up the result view for the respective station.</v-card-text>
          </v-card>
          <v-data-table
            :items="project.railedTrains"
            :headers="headers"
            hide-actions>
            <template
              slot="items"
              slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td>{{ props.item.train }}</td>
                <td>{{ props.item.createdAt }}</td>
              </tr>
            </template>
            <template
              slot="expand"
              slot-scope="props">
              <v-card flat>
                <route-builder
                  :stations="mapRoute(props.item)"
                  @nodeClick="showResults"
                />
              </v-card>
            </template>
          </v-data-table>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- The result view for nodes of the project -->
    <result-view
      :dialog="dialog"
      :railed-train-id="railedTrainId"
      :stop="stop"
      @onClose="dialog = false"/>
  </v-container>
</template>
  <script>
import ItemTable from './item-table'
import RouteBuilder from './route-builder'
import StationsConsumer from '~/mixins/stations-consumer'
import ResultView from './ResultView'

export default {
  components: { ResultView, RouteBuilder, ItemTable },
  mixins: [StationsConsumer],
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    headers: [
      { text: 'Train Name', align: 'left', value: 'name' },
      { text: 'Created At', align: 'left', value: 'createdAt' }
    ],
    dialog: false,

    // Selected railed Train
    railedTrainId: -1,

    // selected Stop
    stop: -1
  }),

  methods: {
    showResults(node) {
      const data = node.target.data()
      this.railedTrainId = node.railedTrainId
      this.stop = data.stop
      this.dialog = true
      // TODO Open the result view for this node
    },

    // Maps a route (list of station identifiers to the stations)
    mapRoute(railedTrain) {
      const stations = railedTrain.route.map(stationId => {
        return this.stations.filter(station => station.id === stationId)[0]
      })
      return {
        railedTrainId: railedTrain.id,
        stations: stations,
        currentStation: railedTrain.currentStation
      }
    }
  }
}
</script>
