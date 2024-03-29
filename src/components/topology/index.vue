<template>
  <div class="relative h-[calc(100%-2px)]">
    <div
      ref="canvas"
      class="h-full border border-dark-50"
      style="background: linear-gradient(rgba(214, 218, 234, 1) 33%, rgba(194, 200, 224, 1) 33% 66%, rgba(159, 168, 205, 1) 66%)"
    ></div>
    <Legend class="right-0 absolute mr-2 mt-2 top-0" />
  </div>
</template>
<script lang="ts" setup>
  import cytoscape from 'cytoscape';
  import { Topology } from '/@/api/union/model/topology';
  import { ref, computed, watch, nextTick, toRaw } from 'vue';
  import { message } from 'ant-design-vue';
  import img from './img';
  import Legend from './legend.vue';

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
  const formatType = (s: string) => {
    return s.replace(/[()-]+/g, '');
  };
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
        data: {
          id: d.object,
          ip: d.ip,
          type: d.type,
          portList: d.portList,
          clockAccuracy: d.clockAccuracy,
          clockIdentity: d.clockIdentity,
          offsetScaledLogVariance: d.offsetScaledLogVariance,
        },
        position: { x: d.posX, y: d.posY },
        classes: [formatType(d.type)],
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
                  selector: 'node.ATN950B',
                  style: {
                    width: 50,
                    height: 36.5,
                    'background-image': img.atn950b,
                    'background-fit': 'contain',
                    'background-opacity': 0,
                  },
                },
                // convergence
                {
                  selector: `node.${formatType('CX600-X16-DO(V8)')}`,
                  style: {
                    width: 50,
                    height: 36.3,
                    'background-image': img.cx600x16,
                    'background-fit': 'contain',
                    'background-opacity': 0,
                  },
                },
                {
                  selector: `node.${formatType('CX600-X16A-DO(V8)')}`,
                  style: {
                    width: 50,
                    height: 35.7,
                    'background-image': img.cx600x16a,
                    'background-fit': 'contain',
                    'background-opacity': 0,
                  },
                },
                {
                  selector: `node.${formatType('CX600-X8-DO(V8)')}`,
                  style: {
                    width: 50,
                    height: 35.7,
                    'background-image': img.cx600x8,
                    'background-fit': 'contain',
                    'background-opacity': 0,
                  },
                },
                {
                  selector: 'node.Service',
                  style: {
                    width: 50,
                    height: 35.7,
                    'background-image': img.service,
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
