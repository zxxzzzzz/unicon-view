<template>
  <div class="h-[calc(100vh-48px)]">
    <div class="p-4 bg-white">
      <div>
        <Button @click="handleSimulation">仿真</Button>
      </div>
    </div>
    <div class="flex h-[calc(100%-48px)]">
      <div class="h-full w-full">
        <Topology :topology="topology" @tap="handleTap" />
      </div>
      <Modal />
    </div> </div
></template>
<script lang="ts" setup>
  import Topology from '/@/components/topology/index.vue';
  import { getTopology1 } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { Button } from 'ant-design-vue';
  import { onBeforeUnmount } from 'vue';
  import { useModal } from '/@/hooks/component/useModal';
  import SetPortParamModal from './component/setPortParamModal.vue';
  import cytoscape from 'cytoscape';
  import type { SetPortParam } from '/@/api/union/index';
  import { getPort1588Param } from '/@/api/union/index';

  const { Modal, open } = useModal(SetPortParamModal);
  // const activeKey = ref('1');
  const { data: topology, run: _getTopology } = useRequest(getTopology1);
  const { data: port1588ParamData } = useRequest(getPort1588Param);

  const handleTap = async (node: cytoscape.CollectionReturnValue) => {
    try {
      const portParam = await open<SetPortParam['portlist']>({
        device: node.data() as any,
        port1588Param: port1588ParamData.value?.ptp || [],
      });
      console.log(portParam);
    } catch (error) {}
  };

  let infoWindow: Window | null = null;
  // let portListQuery = '';
  const handleSimulation = () => {
    // 如果弹窗已经打开 就复用该弹窗
    if (infoWindow) {
      infoWindow.focus();
      return;
    }
    let strWindowFeatures = `width=1440,height=1024,left=999999px,top=999999px`;
    const unionUrl = location.origin + '/#/data/union';
    infoWindow = window.open(unionUrl, 'union', strWindowFeatures);
    // 弹窗被关闭时，引用的变量置为null
    if (infoWindow) {
      infoWindow.onload = () => {
        if (infoWindow) {
          infoWindow.onunload = () => {
            infoWindow = null;
          };
        }
      };
      infoWindow.addEventListener('data', () => {
        // @ts-ignore
        const data = infoWindow.__data__;
        const linkParamList = data?.linkParamList || [];
        (topology.value?.linkList || []).map((l) => {
          const link = linkParamList.find((lp) => lp.object === l.object);
          if (link) {
            return link;
          }
          return l;
        });
        // _getTopology();
      });
    }
  };
  onBeforeUnmount(() => {
    // 页面卸载时 弹窗要关闭
    if (infoWindow) {
      infoWindow.close();
    }
  });
</script>
