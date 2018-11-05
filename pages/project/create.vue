<template>
  <client-view title="Create a new Project">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation>

      <!-- The Project Title -->
      <v-text-field
        v-model="title"
        :rules="titleRules"
        label="Title"
        required
      />

      <!-- The Project Description -->
      <v-textarea
        v-model="description"
        :rules="descriptionRules"
        label="Description"
        rows="20"
        required
      />

      <!-- The E-Mail Address of the responsible person -->
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-Mail of Principal Investigator"
        required
      />

      <!-- Select the Stations -->
      <v-select
        v-model="selectedStations"
        :items="stations"
        item-text="name"
        item-value="id"
        chips
        label="Select Stations for the project"
        multiple
      />

      <!-- Select the Train -->
      <v-select
        v-model="train"
        :items="trainItems"
        label="Select Train"
        required
      />


      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="I confirm that the details I provided are correct"
        required
      />

      <v-btn
        :disabled="!valid"
        @click="submit">Submit Project</v-btn>
      <v-btn @click="clear">Clear Input</v-btn>
    </v-form>
  </client-view>
</template>

<script>
import ClientView from '~/components/ClientView'
import StationConsumer from '~/mixins/station-consumer'
import TrainConsumer from '~/mixins/train-consumer'

export default {
  components: {
    ClientView
  },
  mixins: [StationConsumer, TrainConsumer],

  data: () => ({
    valid: true,

    title: '', // The Title of the Project
    titleRules: [v => !!v || 'Title is required'],

    description: '',
    descriptionRules: [v => !!v || 'Description is required'],

    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    select: null,

    selectedStations: [],
    train: '',
    checkbox: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const request = {
          title: this.title,
          description: this.description,
          stations: this.selectedStations,
          train: this.train
        }
        this.$axios
          .post('http://localhost:9000/projects', request)
          .then(response => {
            const status = response.status
            if (status === 200) {
              alert('Project has been submitted successfully')
              this.clear()
            } else {
              alert(
                'Submission of Project has failed. Server responded with code ' +
                  status
              )
            }
          })
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>
