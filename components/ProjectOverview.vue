<template>
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
          <v-card-text>Click a submitted train to get details on the execution state</v-card-text>
        </v-card>
        <v-data-table
          :items="project.railedTrains"
          :headers="headers"
          hide-actions
          hide-headers>
          <template
            slot="items"
            slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.train }}</td>
            </tr>
          </template>
          <template
            slot="expand"
            slot-scope="props">
            <v-card flat>
              <route-builder :stations="mapRoute(props.item.route)"/>
            </v-card>
          </template>
        </v-data-table>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>

</template>
  <script>
import ItemTable from './item-table'
import RouteBuilder from './route-builder'
import StationsConsumer from '~/mixins/stations-consumer'

export default {
  components: { RouteBuilder, ItemTable },
  mixins: [StationsConsumer],
  props: {
    project: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    headers: [{ text: 'Train Name', align: 'left', value: 'namespace' }]
  }),

  methods: {
    // Maps a route (list of station identifiers to the stations)
    mapRoute(route) {
      return route.map(stationId => {
        return this.stations.filter(station => station.id === stationId)[0]
      })
    }
  }
}
</script>
