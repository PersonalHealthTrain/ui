<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :hide-headers="hideHeaders"
    hide-actions
    class="elevation-1"
  >
    <!-- Data being loaded not not available -->
    <div slot="no-data">
      <v-progress-circular
        v-if="!fetchComplete"
        indeterminate/>
      <div v-if="fetchComplete">
        {{ noDataText }}
      </div>
    </div>

    <template
      slot="items"
      slot-scope="props">
      <slot
        v-bind="props"
        name="items"/>
    </template>

  </v-data-table>
</template>

<script>
export default {
  props: {
    fetchComplete: {
      type: Boolean,
      default: false
    },
    hideHeaders: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    noDataText: {
      type: String,
      default: 'No Items available!'
    }
  }
}
</script>
