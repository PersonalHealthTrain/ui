<template>
  <client-view :title="title">

    <v-container
      grid-list-md
      text-xs-center>
      <v-layout
        row
        wrap>

        <!-- Project Overview -->
        <v-flex xs2>
          <v-card>
            <v-card-text><strong>Title</strong></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs10>
          <v-card>
            <v-card-text>{{ title }}</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs2>
          <v-card>
            <v-card-text><strong>Description</strong></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs10>
          <v-card>
            <v-card-text>{{ description }}</v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs2>
          <v-card>
            <v-card-text><strong>Train</strong></v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs10>
          <v-card>
            <v-card-text>{{ train }}</v-card-text>
          </v-card>
        </v-flex>

        <!-- Station Table -->
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="stations"
            hide-actions
            class="elevation-1"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr @click="toggleStation(props.item.id, props.item.name)">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>
                  <approve-state-cell :approval-state="props.item.state"/>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>

        <v-btn
          :disabled="idsOfApprovedStations.length === 0"
          @click="runTrain()">Run Train</v-btn>
      </v-layout>

    </v-container>
    <route-builder :stations="selectedStations"/>
  </client-view>
</template>

<script>
import ProjectIdConsumer from '~/mixins/project-id-consumer'
import ClientView from '~/components/ClientView'
import ApproveStateCell from '~/components/ApproveStateCell'
import RouteBuilder from '~/components/route-builder'

export default {
  components: {
    RouteBuilder,
    ClientView,
    ApproveStateCell
  },

  mixins: [ProjectIdConsumer],
  data: () => ({
    // Project properties
    title: '',
    description: '',
    train: '',
    text: 'hello World',

    // Station Table
    headers: [
      { text: 'Station ID', value: 'id', align: 'center' },
      { text: 'Name', value: 'name', align: 'center' }
    ],
    // The stations that we observe
    stations: [],

    // The stations that we have selected
    selectedStations: []
  }),

  computed: {
    idsOfApprovedStations() {
      return this.stations
        .filter(station => station['state'] === 'approved')
        .map(station => station.id)
    }
  },

  created() {
    this.getProject(this.$route.params['id']).then(response => {
      // Unpack server response into items that we care about
      this.title = response.title
      this.description = response.description
      this.train = response.train
      this.stations = this.getStations(response)
    })
  },

  methods: {
    // Either removes the station with the selected ID from the selectedStation List or
    // Adds it to the end of the list
    toggleStation(id, name) {
      const station = { id: id, name: name }
      const index = this.selectedStations.map(station => station.id).indexOf(id)
      if (index === -1) {
        this.selectedStations.push(station)
      } else {
        this.selectedStations.splice(index, 1)
      }
    },
    runTrain() {
      alert('Choo Choo')
    }
  }
}
</script>
