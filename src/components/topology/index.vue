<template>
  <div ref="canvas" class="h-full border border-dark-50"></div>
</template>
<script lang="ts" setup>
  import cytoscape from 'cytoscape';
  import { Topology } from '/@/api/union/model/topology';
  import { ref, computed, watch, nextTick } from 'vue';

  const props = defineProps<{ topology: Topology | undefined }>();
  const canvas = ref<HTMLDivElement>();
  const emits = defineEmits(['cxttap']);
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
        data: { id: d.object },
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

  watch(
    elements,
    () => {
      nextTick(() => {
        if (canvas.value) {
          const cy = cytoscape({
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
          });
          cy.on('cxttap', 'node', function (evt) {
            var node = evt.target;
            evt.originalEvent.preventDefault();
            evt.preventDefault();
            emits('cxttap', node);
          });
        }
      });
    },
    { immediate: true },
  );
</script>
