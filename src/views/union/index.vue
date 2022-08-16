<template>
  <div class="h-full">
    <Topology :topology="topology" @cxttap="handleCtxtap" />
    <Modal />
  </div>
</template>
<script lang="ts" setup>
  import Topology from '/@/components/topology/index.vue';
  import { getTopology } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { Table, TabPane, Tabs, Card, Input } from 'ant-design-vue';
  import { ref } from 'vue';
  import { useModal } from '/@/hooks/component/useModal';
  import SetPortParamModal from './component/setPortParamModal.vue';

  const { Modal, open } = useModal(SetPortParamModal);
  // const activeKey = ref('1');
  const { data: topology, run: _getTopology } = useRequest(getTopology);

  const handleCtxtap = (node) => {
    console.log('click');
    setTimeout(() => {
      open();
    }, 300);
  };
</script>
