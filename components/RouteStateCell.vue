<template>
  <span>
    <v-icon
      small
      class="mr-2">{{ icon }}</v-icon>
    {{ text }}
  </span>
</template>

<script>
export default {
  props: {
    routeState: {
      type: String,
      default: 'done'
    }
  },

  data: () => ({
    infoMap: {
      done: ['check', 'Finished'],
      computing: ['train', 'In Progress'],
      waiting: ['hourglass_empty', 'Pending']
    }
  }),

  computed: {
    icon() {
      return this.infoMap[this.routeState][0]
    },

    text() {
      return this.infoMap[this.routeState][1]
    }
  }
}
</script>
