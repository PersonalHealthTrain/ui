<template>
  <v-layout
    row
    justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition">

      <v-card>
        <v-flex xs12>
          <v-toolbar
            dark
            color="primary">
            <v-btn
              icon
              dark
              @click="$emit('onClose')">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Results</v-toolbar-title>
            <v-spacer/>
          </v-toolbar>
        </v-flex>
        <v-flex xs12>

          <pre class="preformatted">




                Number of ICD-10 diagnoses for each state:

                Baden-Württemberg: 892
                Bayern:             15
                Berlin:              2
                Hessen:              3
                Niedersachsen:       5
                Nordrhein-Westfalen: 9
                Rheinland-Pfalz:     4
                Thüringen:           1
          </pre>
        </v-flex>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    railedTrainId: {
      type: Number,
      default: -1
    },
    stop: {
      type: Number,
      default: -1
    }
  }
}
</script>

<style scoped>
.preformatted {
  font-size: 1.5em;
}
</style>
