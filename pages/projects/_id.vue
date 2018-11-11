<template>
  <div>
    <v-toolbar tabs>
      <v-toolbar-title>{{ project === null ? "" : project.title }}</v-toolbar-title>

      <v-tabs
        slot="extension"
        v-model="tabs"
        fixed-tabs
        color="transparent"
        icons-and-text
        @change="closeAll()"
      >
        <v-tabs-slider/>
        <v-tab
          href="#mobile-tabs-5-1"
          class="primary--text">
          Overview
          <v-icon>info</v-icon>
        </v-tab>

        <v-tab
          href="#mobile-tabs-5-2"
          class="primary--text">
          Run new Train
          <v-icon>train</v-icon>
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items
      v-model="tabs"
      class="white elevation-1">
      <v-tab-item
        value="mobile-tabs-5-1"
      >
        <project-overview
          v-if="project !== null"
          :project="project"/>

      </v-tab-item>


      <v-tab-item
        value="mobile-tabs-5-2"
      >
        <run-new-train
          v-if="project !== null"
          :stations="getStations(project)"
          :project-id="project.id"
          :trains="project.trains"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>



</template>

<script>
import ProjectIdConsumer from '~/mixins/projects-id-consumer'
import ClientView from '~/components/ClientView'
import RouteBuilder from '~/components/route-builder'

import ProjectOverview from '~/components/ProjectOverview'
import RunNewTrain from '~/components/RunNewTrain'

export default {
  components: {
    ProjectOverview,
    RunNewTrain,
    RouteBuilder,
    ClientView
  },

  mixins: [ProjectIdConsumer],
  data: () => ({
    tabs: null,
    // Loaded async
    project: null,

    refresh: null
  }),

  created() {
    this.loadProject()
    this.refresh = setInterval(
      function() {
        this.loadProject()
      }.bind(this),
      2000
    )
  },

  beforeDestroy() {
    clearInterval(this.refresh)
  },

  methods: {
    closeAll() {
      // TODO
    },

    loadProject() {
      const projectId = parseInt(this.$route.params['id'])
      this.getProject(projectId).then(response => {
        this.project = response
      })
    }
  }
}
</script>
