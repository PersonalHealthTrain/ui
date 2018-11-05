<template>
  <v-layout
    row
    wrap>
    <v-flex xs12>
      <!-- Toolbar -->
      <v-toolbar
        color="white">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
    </v-flex>
    <v-flex xs12>
      <slot/>
    </v-flex>
  </v-layout>
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




  <!---->
    <!--<h3 ref="radio" class="headline">Target</h3>-->
    <!--<v-radio-group v-model="type" row>-->
      <!--<v-radio label="Number" value="number"></v-radio>-->
      <!--<v-radio label="Selector" value="selector"></v-radio>-->
      <!--<v-radio label="DOMElement" value="element"></v-radio>-->
    <!--</v-radio-group>-->
    <!--<v-text-field v-if="type === 'number'" v-model="number" type="number" label="Number"></v-text-field>-->
    <!--<v-text-field v-if="type === 'selector'" v-model="selector" label="Selector"></v-text-field>-->
    <!--<v-select v-if="type === 'element'" v-model="selected" :items="elements" label="DOMElement"></v-select>-->
  <!--</v-flex>-->
  <!--<v-flex xs12>-->
    <!--<h3 class="headline">Options</h3>-->
    <!--<v-select v-model="easing" :items="easings" label="Easing"></v-select>-->
    <!--<v-slider v-model="duration" min="0" max="1000" label="Duration" thumb-label></v-slider>-->
    <!--<v-slider v-model="offset" min="-500" max="500" label="Offset" thumb-label></v-slider>-->
  <!--</v-flex>-->
  <!---->
    <!--<v-btn ref="button" color="primary" block @click="$vuetify.goTo(target, options)">scroll</v-btn>-->
  <!--</v-flex>-->
