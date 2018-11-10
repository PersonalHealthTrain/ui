<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation>

    <v-container
      grid-list-md
      text-xs-center>
      <v-layout
        row
        wrap>

        <!-- Train Selection -->
        <v-select
          v-model="selectedTrain"
          :items="trains"
          :rules="trainsRules"
          label="Select Train"
          required
        />

        <!-- Station Table -->
        <v-flex xs12>
          <v-card>
            <v-card-text>
              Use the station table below to construct a new route for the train.
              Click on a Station to append it to the current route, click again to
              remove the station from the route. If you are happy with the route, click
              on "Run Train". Only Stations that have approved the Project can
              be selected for creating the route.
            </v-card-text>
          </v-card>

        </v-flex>

        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="tableStations"
            hide-actions
            class="elevation-1"
          >
            <template
              slot="items"
              slot-scope="props">
              <tr
                :class="getStationClass(props.item)"
                @click="toggleStation(props.item)">
                <td>{{ props.item.stop === -1 ? 'NA' : props.item.stop + 1 }}</td>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.name }}</td>
                <td>
                  <approve-state-cell :approval-state="props.item.state"/>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <route-builder :stations="selectedStations"/>
    <div hidden> {{ tableStations }}</div>
    <v-btn
      :disabled="!valid"
      @click="runTrain()">Run Train</v-btn>
  </v-form>
</template>

<script>
import ApproveStateCell from '~/components/ApproveStateCell'
import RouteBuilder from './route-builder'
import TrainSubmitter from '~/mixins/trains-submitter'

export default {
  components: {
    RouteBuilder,
    ApproveStateCell
  },
  mixins: [TrainSubmitter],

  props: {
    stations: {
      type: Array,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    },
    trains: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    // Station Table
    headers: [
      { text: 'Stop', value: 'stop', align: 'center' },
      { text: 'Station ID', value: 'id', align: 'center' },
      { text: 'Name', value: 'name', align: 'center' }
    ],

    valid: true,
    trainsRules: [v => v !== null || 'At least one train needs to be selected'],

    selectedStations: [],
    selectedTrain: null
  }),

  computed: {
    // stations extended by the stop index
    tableStations() {
      const selectedStationIds = this.selectedStations.map(it => it.id)
      return this.stations.map(station => {
        const stop = selectedStationIds.indexOf(station.id)
        return Object.assign({ stop: stop }, station)
      })
    }
  },

  methods: {
    // Either removes the station with the selected ID from the selectedStation List or
    // Adds it to the end of the list
    toggleStation(station) {
      if (station.state !== 'approved') {
        alert(
          'Station has not approved the project and thus cannot be added to route'
        )
        return
      }

      const index = this.selectedStations.map(it => it.id).indexOf(station.id)
      if (index === -1) {
        this.selectedStations.push(station)
      } else {
        this.selectedStations.splice(index, 1)
      }
    },
    runTrain() {
      if (this.$refs.form.validate()) {
        this.submitTrain({
          train: this.selectedTrain,
          route: this.selectedStations.map(station => station.id),
          projectId: this.projectId
        })
      }
    },
    getStationClass(station) {
      // const state = station.state
      // const index = this.selectedStations.map(it => it.id).indexOf(station.id)
      // if (state === 'approved' && index !== -1) {
      //   return 'station-approved-selected'
      // }
      // return `station-${station.state}`
    }
  }
}
</script>

<style scoped>
.station-approved {
  background-color: #86ffad;
}
.station-approved-selected {
  background-color: #ff4ff3;
  box-shadow: 5px 10px;
}
.station-rejected {
  background-color: #ff6f62;
}
.station-pending {
  background-color: #ffffff;
}
</style>
