<template>
  <div>
    <v-toolbar tabs>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-tabs
        slot="extension"
        v-model="tabs"
        fixed-tabs
        color="transparent"
        icons-and-text
      >
        <v-tabs-slider/>
        <v-tab
          href="#mobile-tabs-5-1"
          class="primary--text">
          Info
          <v-icon>info</v-icon>
        </v-tab>

        <v-tab
          href="#mobile-tabs-5-2"
          class="primary--text">
          Train List
          <v-icon>list</v-icon>
        </v-tab>

        <v-tab
          href="#mobile-tabs-5-3"
          class="primary--text">
          Run Train
          <v-icon>train</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items
      v-model="tabs"
      class="white elevation-1">
      <v-tab-item
        id="mobile-tabs-5-1"
      >
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
          </v-layout>
        </v-container>
      </v-tab-item>

      <v-tab-item
        id="mobile-tabs-5-2"
      >
        <v-container
          grid-list-md
          text-xs-center>
          <v-layout
            row
            wrap>
            <v-flex xs12>
              <v-data-table
                :headers="railedTrainsHeaders"
                :items="railedTrains"
                hide-actions
                class="elevation-1"
              >
                <template
                  slot="items"
                  slot-scope="props">
                  <tr @click="routeToTrain(props.item.id)">
                    <td>{{ props.item.id }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
      <v-tab-item
        id="mobile-tabs-5-3"
      >
        <v-container
          grid-list-md
          text-xs-center>
          <v-layout
            row
            wrap>
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
          </v-layout>
        </v-container>
        <route-builder :stations="selectedStations"/>
        <v-btn
          :disabled="idsOfApprovedStations.length === 0 || selectedStations.length === 0"
          @click="runTrain()">Run Train</v-btn>

      </v-tab-item>
    </v-tabs-items>
  </div>



</template>

<script>
import ProjectIdConsumer from '~/mixins/project-id-consumer'
import TrainSubmitter from '~/mixins/train-submitter'
import ClientView from '~/components/ClientView'
import ApproveStateCell from '~/components/ApproveStateCell'
import RouteBuilder from '~/components/route-builder'

export default {
  components: {
    RouteBuilder,
    ClientView,
    ApproveStateCell
  },

  mixins: [ProjectIdConsumer, TrainSubmitter],
  data: () => ({
    tabs: null,
    // Project properties
    projectId: -1,
    title: '',
    description: '',
    train: '',

    // Station Table
    headers: [
      { text: 'Station ID', value: 'id', align: 'center' },
      { text: 'Name', value: 'name', align: 'center' }
    ],
    // The stations that we observe
    stations: [],

    // The stations that we have selected
    selectedStations: [],

    // The railed Trains for this station
    // Station Table
    railedTrainsHeaders: [{ text: 'ID', value: 'id', align: 'center' }],
    railedTrains: []
  }),

  computed: {
    idsOfApprovedStations() {
      return this.stations
        .filter(station => station['state'] === 'approved')
        .map(station => station.id)
    }
  },

  created() {
    this.projectId = this.$route.params['projectId']
    this.getProject(this.projectId).then(response => {
      // Unpack server response into items that we care about
      this.title = response.title
      this.description = response.description
      this.train = response.train
      this.stations = this.getStations(response)
      this.railedTrains = response.railedTrains
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
      const trainSubmission = {
        route: this.selectedStations.map(station => station.id),
        projectId: this.projectId
      }
      this.submitTrain(trainSubmission)
    },

    routeToTrain(id) {
      this.$router.replace(this.projectId + '/train/' + id)
    }
  }
}
</script>
