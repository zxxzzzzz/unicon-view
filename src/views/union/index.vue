<template>
  <div class="h-[calc(100vh-48px)]">
    <div class="p-4 bg-white">
      <div>
        <Button @click="handleSimulation"> 仿真</Button>
      </div>
    </div>
    <div class="flex h-[calc(100%-48px)]">
      <div class="h-full w-full">
        <Topology :topology="topology" @tap="handleTap" />
        <!-- </div>
      <div class="flex-1 overflow-auto">
        <Card title="仿真结果">
          <div>
            <div class="flex justify-end mt-2">
              <Button @click="handleSend">仿真</Button>
            </div>
          </div>
        </Card>
      </div> -->
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
    } catch (error) {}
    // setTimeout(async () => {
    // }, 300);
  };
  // const handleSend = async () => {
  //   AntModal.info({
  //     title: '发送',
  //     content: h(InputTable, {
  //       onSend() {
  //         _getTopology();
  //       },
  //     }),
  //     width: '100%',
  //     onOk() {},
  //   });
  // };

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
        _getTopology();
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
