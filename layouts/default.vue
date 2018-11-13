<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="main-navigation-drawer"
      clipped
      fixed
      app
    >
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><strong>Project Management</strong></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list>
        <v-list-tile
          v-for="(item, i) in routesManager"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider />

      <!-- Select the Stations -->
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title><strong>Project Reviewer for Station:</strong></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-select
            v-model="selectedStation"
            :items="stations"
            item-text="name"
            return-object
            @input="$store.commit('setStation', selectedStation)"
          />
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />

      <v-list>
        <v-list-tile
          v-for="(item, i) in routesReviewer"
          :to="item.to"
          :key="i"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar
      class="main-titlebar"
      clipped-left
      fixed
      app>
      <v-toolbar-side-icon @click="drawer = !drawer" />

      <v-toolbar-title>Personal Health Train - DIFUTURE Project Management</v-toolbar-title>
    </v-toolbar>

    <!-- The actual content -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import StationConsumer from '~/mixins/stations-consumer'

export default {
  mixins: [StationConsumer],

  data() {
    return {
      drawer: true,
      selectedStation: null,
      routesManager: [
        { icon: 'create', title: 'Create Project', to: '/projects/create' },
        { icon: 'assignment', title: 'My Projects', to: '/projects' },
        { icon: 'store', title: 'Available Stations', to: '/stations' },
        { icon: 'train', title: 'Available Trains', to: '/trains' }
      ],
      routesReviewer: [
        { icon: 'inbox', title: 'Pending Projects', to: '/projects/pending' },
        { icon: 'check', title: 'Approved Projects', to: '/projects/approved' },
        { icon: 'block', title: 'Rejected Projects', to: '/projects/rejected' }
      ]
    }
  },
  updated() {
    // If no station has been selected before, but stations are available, we load
    // the respective global state
    if (this.selectedStation === null && this.stations.length > 0) {
      const station = this.stations[0]
      this.selectedStation = station
      this.$store.commit('setStation', station)
    }
  }
}
</script>

<style scoped>
.main-titlebar {
  background-color: #a9a9a9;
}
.main-navigation-drawer {
  background-color: #d7cec7;
}
.center-title {
  text-align: center;
}
</style>
