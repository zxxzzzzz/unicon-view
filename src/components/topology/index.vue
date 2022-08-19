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
    const nodes = topology.DeviceList.map((d) => {
      return {
        data: { id: d.object, ip: d.ip, type: d.type, portList: d.portList },
        position: { x: d.posX, y: d.posY },
      };
    });
    const edges = topology.LinkList.map((l) => {
      return {
        data: {
          id: l.object,
          source: l.Dev1,
          target: l.ConnectDev2,
        },
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
            elements: elements.value,
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
            ],
            wheelSensitivity: 0.1,
          });
          cy.on('tap', 'node', function (evt) {
            var node = evt.target;
            evt.originalEvent.preventDefault();
            evt.preventDefault();
            emits('tap', node);
          });
          cy.on('cxttap', 'node', function (evt) {
            var node = evt.target;
            evt.originalEvent.preventDefault();
            evt.preventDefault();
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
