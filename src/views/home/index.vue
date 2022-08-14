<template>
  <div class="h-full">
    <Topology :topology="typology" />
  </div>
</template>
<script lang="ts" setup>
  import Topology from './component/topology.vue';
  import { getTopology } from '/@/api/union/topology';
  import { useRequest } from 'vue-request';

  const { data: typology, run: _getTopology } = useRequest(getTopology);
  // fabric.canvas()
  // defineProps<{  }>();
</script>
