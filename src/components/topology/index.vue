<template>
  <div ref="canvas" class="h-full border border-dark-50"></div>
</template>
<script lang="ts" setup>
  import cytoscape from 'cytoscape';
  import { Topology } from '/@/api/union/model/topology';
  import { ref, computed, watch, nextTick } from 'vue';

  const props = defineProps<{ topology: Topology | undefined }>();
  const canvas = ref<HTMLDivElement>();
  const emits = defineEmits<{
    (event: 'cxttap', node: cytoscape.CollectionReturnValue): void;
    (event: 'tap', node: cytoscape.CollectionReturnValue): void;
    (event: 'select', node: cytoscape.CollectionReturnValue): void;
    (event: 'unselect', node: cytoscape.CollectionReturnValue): void;
    (event: 'drag', node: cytoscape.CollectionReturnValue): void;
    (event: 'dragfree', node: cytoscape.CollectionReturnValue): void;
  }>();
  const elements = computed(() => {
    const topology = props.topology;
    if (!topology) {
      return {
        nodes: [],
        edges: [],
      };
    }
    const nodes = topology.deviceList.map((d) => {
      return {
        data: { id: d.object, ip: d.ip, type: d.type, portList: d.portList },
        position: { x: d.posX, y: d.posY },
      };
    });
    const edges = topology.linkList.map((l) => {
      return {
        data: {
          id: l.object,
          source: l.Dev1,
          target: l.ConnectDev2,
        },
        classes: [l.lineType].join(' '),
      };
    });
    return {
      nodes,
      edges,
    };
  });
  let cy: cytoscape.Core | undefined = undefined;
  watch(
    elements,
    () => {
      nextTick(() => {
        if (canvas.value) {
          cy = cytoscape({
            container: canvas.value, // container to render in
            elements: {
              nodes: elements.value.nodes,
              edges: elements.value.edges,
            },
            layout: {
              name: 'preset',
            },
            style: [
              {
                selector: 'node',
                style: {
                  label: 'data(id)',
                },
              },
              {
                selector: 'edge.ptp',
                style: {
                  'curve-style': 'bezier',
                  'line-style': 'dashed',
                  'line-dash-pattern': [10, 3],
                  'line-color': 'blue',
                },
              },
              {
                selector: 'edge.syncE',
                style: {
                  'curve-style': 'bezier',
                  'line-style': 'dashed',
                  'line-dash-pattern': [10, 3],
                  'line-color': 'red',
                },
              },
            ],
            wheelSensitivity: 0.1,
          });
          cy.on('select ', 'node', (evt) => {
            var node = evt.target;
            emits('select', node);
          });
          cy.on('select ', 'edge', (evt) => {
            var node = evt.target;
            emits('select', node);
            // var node = evt.target;
            // emits('select', node);
            // console.log(evt.target.targetEndpoint().data());
          });
          cy.on('unselect ', 'node', (evt) => {
            var node = evt.target;
            emits('unselect', node);
          });
          cy.on('unselect ', 'edge', (evt) => {
            var node = evt.target;
            emits('unselect', node);
          });
          cy.on('tap', 'node', function (evt) {
            var node = evt.target;
            emits('tap', node);
          });
          cy.on('cxttap', 'node', function (evt) {
            var node = evt.target;
            emits('cxttap', node);
          });
          cy.on('drag', 'node', function (evt) {
            var node = evt.target;
            emits('drag', node);
          });
          cy.on('dragfree', 'node', function (evt) {
            var node = evt.target;
            emits('dragfree', node);
          });
        }
      });
    },
    { immediate: true },
  );
  defineExpose({
    getCy() {
      return cy;
    },
  });
</script>
