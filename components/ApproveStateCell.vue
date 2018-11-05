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
    approvalState: {
      type: String,
      default: 'approved'
    }
  },

  data: () => ({
    infoMap: {
      approved: ['check', 'Approved'],
      pending: ['inbox', 'Pending'],
      rejected: ['block', 'Rejected']
    }
  }),

  computed: {
    icon() {
      return this.infoMap[this.approvalState][0]
    },

    text() {
      return this.infoMap[this.approvalState][1]
    }
  }
}
</script>
