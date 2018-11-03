<template>
  <client-view title="Approved Projects">
    <v-data-table
      :headers="headers"
      :items="projects"
      hide-actions
      class="elevation-1"
    >

      <template
        slot="items"
        slot-scope="props">
        <tr @click="routeTo(props.item.id)">
          <td>{{ props.item.id }}</td>
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.train }}</td>
        </tr>
      </template>

    </v-data-table>
  </client-view>
</template>

<script>
export default {}
</script>
