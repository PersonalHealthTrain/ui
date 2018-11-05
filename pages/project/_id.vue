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
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
              <td>
                <approve-state-cell :approval-state="props.item.state"/>
              </td>
            </template>
          </v-data-table>
        </v-flex>
        <v-btn
          :disabled="idsOfApprovedStations.length === 0"
          @click="runTrain()">Run Train</v-btn>
      </v-layout>

    </v-container>
  </client-view>
</template>

<script>
import ProjectIdConsumer from '~/mixins/project-id-consumer'
import ClientView from '~/components/ClientView'
import ApproveStateCell from '~/components/ApproveStateCell'

export default {
  components: {
    ClientView,
    ApproveStateCell
  },

  mixins: [ProjectIdConsumer],
  data: () => ({
    // Project properties
    title: '',
    description: '',
    train: '',

    // Stations
    headers: [
      { text: 'Station ID', value: 'id', align: 'center' },
      { text: 'Name', value: 'name', align: 'center' }
    ],
    stations: []
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
      this.title = response.title
      this.description = response.description
      this.train = response.train

      this.stations = this.getStations(response)
    })
  },

  methods: {
    runTrain() {}
  }
}
</script>
