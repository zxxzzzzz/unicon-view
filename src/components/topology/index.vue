<template>
  <div ref="canvas" class="h-full border border-dark-50"></div>
</template>
<script lang="ts" setup>
  import cytoscape from 'cytoscape';
  import { Topology } from '/@/api/union/model/topology';
  import { ref, computed, watch, nextTick, toRaw } from 'vue';
  import { message } from 'ant-design-vue';

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
        classes: [d.type],
      };
    });
    const edges = topology.linkList.map((l, index) => {
      return {
        data: {
          id: index,
          name: l.object,
          source: l.Dev1,
          target: l.ConnectDev2,
        },
        classes: [l.linkType],
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
          try {
            cy = cytoscape({
              container: canvas.value, // container to render in
              // @ts-ignore
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
                  selector: 'node.core',
                  style: {
                    width: 50,
                    height: 36.5,
                    'background-image': '/resource/img/core.png',
                    'background-fit': 'contain',
                    'background-opacity': 0,
                  },
                },
                {
                  selector: 'node.convergence',
                  style: {
                    width: 50,
                    height: 36.3,
                    'background-image': '/resource/img/convergence.png',
                    'background-fit': 'contain',
                    'background-opacity': 0,
                  },
                },
                {
                  selector: 'node.access',
                  style: {
                    width: 50,
                    height: 35.7,
                    'background-image': '/resource/img/access.png',
                    'background-fit': 'contain',
                    'background-opacity': 0,
                  },
                },
                {
                  selector: 'edge',
                  style: {
                    'curve-style': 'bezier',
                  },
                },
                {
                  selector: 'edge.ptp',
                  style: {
                    'line-style': 'dashed',
                    'target-arrow-shape': 'triangle',
                    'line-dash-pattern': [10, 3],
                    'target-arrow-color': 'blue',
                    'line-color': 'blue',
                  },
                },
                {
                  selector: 'edge.syncE',
                  style: {
                    'line-style': 'dashed',
                    'target-arrow-shape': 'triangle',
                    'line-dash-pattern': [10, 3],
                    'line-color': 'red',
                    'target-arrow-color': 'red',
                  },
                },
              ],
              wheelSensitivity: 0.1,
            });
          } catch (error: any) {
            message.error((error as Error).message, 10);
          }
          if (cy) {
            cy.on('select ', 'node', (evt) => {
              var node = evt.target;
              emits('select', node);
            });
            cy.on('select ', 'edge', (evt) => {
              var node = evt.target;
              emits('select', node);
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
        }
      });
    },
    { immediate: true },
  );
  defineExpose({
    getCy() {
      return cy;
    },
    getTopology() {
      if (!cy) {
        return {};
      }
      const deviceList = cy
        .nodes()
        .toArray()
        .map((node) => {
          const data = node.data();
          const pos = node.position();
          return {
            object: data.id,
            type: data.type,
            ip: data.ip,
            posX: pos.x,
            posY: pos.y,
          };
        });
      const linkList = toRaw(props.topology?.linkList || []);
      return {
        deviceList,
        linkList,
      };
    },
  });
</script>
