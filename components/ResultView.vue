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
