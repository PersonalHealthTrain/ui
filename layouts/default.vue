<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
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
      <v-select
        v-model="selectedStation"
        :items="stations"
        item-text="name"
        return-object
        @input="$store.commit('setStation', selectedStation)"
      />

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
      clipped-left="true"
      fixed
      app>
      <v-toolbar-side-icon @click="drawer = !drawer" />

      <v-toolbar-title v-text="title"/>
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
import StationConsumer from '~/mixins/station-consumer'

export default {
  mixins: [StationConsumer],

  data() {
    return {
      drawer: true,
      selectedStation: null,
      routesManager: [
        { icon: 'create', title: 'Create Project', to: '/project/create' },
        { icon: 'assignment', title: 'My Projects', to: '/project' },
        { icon: 'store', title: 'Stations', to: '/station' },
        { icon: 'train', title: 'Trains', to: '/train' }
      ],
      routesReviewer: [
        { icon: 'inbox', title: 'Pending Projects', to: '/project/pending' },
        { icon: 'check', title: 'Approved Projects', to: '/project/approved' },
        { icon: 'block', title: 'Rejected Projects', to: '/project/rejected' }
      ],
      title: 'Personal Health Train - Project Management'
    }
  }
}
</script>
