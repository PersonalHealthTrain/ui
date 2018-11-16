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
        rows="10"
        required
      />

      <!-- The E-Mail Address of the responsible person -->
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-Mail of Principal Investigator"
        required
      />

      <!-- Select the Train -->
      <v-select
        v-model="selectedTrains"
        :items="trains"
        :rules="trainsRules"
        item-text="name"
        item-value="name"
        chips
        label="Select Trains for the project"
        multiple
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
import TrainConsumer from '~/mixins/trains-consumer'

export default {
  components: {
    ClientView
  },
  mixins: [TrainConsumer],

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

    selectedTrains: [],
    trainsRules: [
      v => v.length > 0 || 'At least one train needs to be selected'
    ],
    checkbox: false
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const request = {
          title: this.title,
          description: this.description,
          email: this.email,
          trains: this.selectedTrains
        }

        this.$axios.post('/projects', request).then(response => {
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

<style scoped>
.v-input {
  font-size: 1.5em;
}
</style>
