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
    </div>
  </div>
</template>
<script lang="ts" setup>
  import Topology from '/@/components/topology/index.vue';
  import { getTopology1 } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { Button, message } from 'ant-design-vue';
  import { onBeforeUnmount } from 'vue';
  import { useModal } from '/@/hooks/component/useModal';
  import SetPortParamModal from './component/setPortParamModal.vue';
  import cytoscape from 'cytoscape';
  import { setPortParam, setSyncEParam } from '/@/api/union/index';
  import { getPort1588Param } from '/@/api/union/index';

  const { Modal, open } = useModal(SetPortParamModal);
  // const activeKey = ref('1');
  const { data: topology, run: _getTopology } = useRequest(getTopology1);
  const { data: port1588ParamData, run: _getPort1588Param } = useRequest(getPort1588Param);

  const handleTap = async (node: cytoscape.CollectionReturnValue) => {
    console.log(topology, 'topology');
    try {
      const device = node.data() as any;
      const { _1588, sync, devAttr } = await open<any>({
        device,
        port1588Param: port1588ParamData.value?.ptp || [],
      });
      const toStr = (o: any) => {
        return Object.keys(o).reduce((re, key) => {
          if (typeof o[key] === 'boolean') {
            return { ...re, [key]: `${o[key]}` };
          }
          return { ...re, [key]: o[key] };
        }, {} as any);
      };
      if (_1588?.length) {
        const param = {
          offsetScaledLogVariance: parseInt(devAttr.offsetScaledLogVariance, 10),
          clockIdentity: parseInt(devAttr.clockIdentity, 10),
          clockAccuracy: parseInt(devAttr.clockAccuracy, 10),
          devName: device.id,
          portList: _1588.map((p) => ({ ...toStr(p), name: p.portName })),
        };
        await setPortParam(param);
      }
      if (sync?.length) {
        const param = {
          offsetScaledLogVariance: parseInt(devAttr.offsetScaledLogVariance, 10),
          clockIdentity: parseInt(devAttr.clockIdentity, 10),
          clockAccuracy: parseInt(devAttr.clockAccuracy, 10),
          devName: device.id,
          portList: sync.map((p) => ({ ...toStr(p), name: p.portName })),
        };
        await setSyncEParam(param);
      }
      // 强制设置下网元属性
      if (!sync?.length && !_1588?.length) {
        const param = {
          ...devAttr,
          devName: device.id,
          portList: null,
        };
        await setPortParam(param);
      }
      await _getTopology();
      await _getPort1588Param();
      message.success('设置成功');
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
        // const data = infoWindow.__data__;
        // const linkParamList = data?.linkParamList || [];
        // (topology.value?.linkList || []).map((l) => {
        //   const link = linkParamList.find((lp) => lp.object === l.object);
        //   if (link) {
        //     console.log(link, 'link');
        //     return link;
        //   }
        //   return l;
        // });
        // if (topology.value) {
        //   topology.value = { ...topology.value };
        // }
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
