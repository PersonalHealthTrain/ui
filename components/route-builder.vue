<template>
  <div>
    <div id="route-builder"/>
    <div hidden>{{ JSON.stringify(stations) }}</div>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
cytoscape.use(dagre)

export default {
  props: {
    stations: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    options: {
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: 'arrow'
          },
          middle: {
            enabled: false,
            scaleFactor: 1,
            type: 'arrow'
          },
          from: {
            enabled: false,
            scaleFactor: 1,
            type: 'arrow'
          }
        }
      },
      physics: {
        enabled: false
      }
    },
    network: null
  }),

  updated() {
    const numberOfNodes = this.stations.length
    const nodes = this.stations.map(station => ({
      data: { id: station.id, label: station.name }
    }))
    const edges = Array.apply(null, { length: numberOfNodes - 1 })
      .map(Function.call, Number)
      .map(i => ({
        data: {
          source: nodes[i].data.id,
          target: nodes[i + 1].data.id
        }
      }))

    const cy = cytoscape({
      container: document.getElementById('route-builder'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'dagre'
      },

      style: [
        {
          selector: 'node',
          style: {
            content: 'data(id)',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'right',
            'background-color': '#11479e'
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
        nodes: nodes,
        edges: edges
      }
    })
    cy.layout({
      name: 'dagre',
      rankDir: 'LR',
      fit: true
    }).run()
  }
}
</script>

<style>
#route-builder {
  width: 100%;
  height: 15em;
  border: 1px solid lightgray;
}
</style>
