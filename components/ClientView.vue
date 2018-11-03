<template>
  <div>
    <!-- Toolbar -->
    <v-toolbar
      flat
      color="white">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
