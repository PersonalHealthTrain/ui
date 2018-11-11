<template>
  <div>
    <v-progress-circular
      v-if="!initialized"
      indeterminate/>
    <div
      v-show="initialized"
      id="route-builder"/>
    <div hidden>{{ JSON.stringify(stations) }}</div>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'

export default {
  props: {
    stations: {
      type: Object,
      required: true
    },
    init: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    cy: null,
    finished: false
  }),

  computed: {
    initialized() {
      if (this.init) {
        return true
      }
      return this.finished
    }
  },

  updated() {
    const stations = this.stations['stations']
    // Add the stop number to each station
    for (let i = 0; i < stations.length; i++) {
      stations[i]['stop'] = i
    }
    const elements = this.getElements(stations)
    const currentStation = this.stations['currentStation']

    this.cy = cytoscape({
      container: document.getElementById('route-builder'),

      userPanningEnabled: false,
      zoomingEnabled: false,
      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'dagre'
      },

      style: [
        {
          selector: 'node',
          style: {
            content: 'data(label)',
            'text-opacity': 1,
            'text-valign': 'center',
            'text-halign': 'center',
            'background-opacity': 0,
            'border-style': 'solid',
            'border-width': '1px',
            height: '4em',
            width: '4em'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            width: 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea'
          }
        }
      ],

      elements: {
        nodes: elements.nodes,
        edges: elements.edges
      }
    })
    this.cy
      .layout({
        name: 'dagre',
        rankDir: 'LR',
        fit: true
      })
      .run()

    this.cy.on('tap', 'node', evt => {
      this.$emit('nodeClick', {
        target: evt.target,
        railedTrainId: this.stations.railedTrainId
      })
    })

    if (currentStation !== null) {
      const nodes = this.cy.nodes()
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const stop = node.data().stop

        node.style('border-width', '1px')

        if (stop < currentStation) {
          node.style('background-opacity', '0.5')
          node.style('background-color', 'green')
        } else if (stop === currentStation) {
          node.style('border-style', 'solid')
          node.style('border-width', '3px')
        }
      }
    }
    this.finished = true
  },

  beforeDestroy() {
    if (this.cy !== null) {
      this.cy.destroy()
      this.cy = null
    }
  },

  methods: {
    getElements(stations) {
      const numberOfNodes = stations.length
      if (numberOfNodes === 0) {
        return { nodes: [], edges: [] }
      }
      const nodes = stations.map(station => ({
        data: { id: station.id, label: station.name, stop: station.stop }
      }))
      const edges = Array.apply(null, { length: numberOfNodes - 1 })
        .map(Function.call, Number)
        .map(i => ({
          data: {
            source: nodes[i].data.id,
            target: nodes[i + 1].data.id
          }
        }))
      return { nodes: nodes, edges: edges }
    }
  }
}
</script>

<style>
#route-builder {
  width: 100%;
  height: 5em;
  border: 1px solid lightgray;
}
</style>
