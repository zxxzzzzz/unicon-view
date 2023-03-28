<template>
  <div class="h-[calc(100vh-48px)]">
    <div class="flex h-full">
      <div class="flex flex-col w-full">
        <div class="flex p-4 bg-white">
          <div>
            <Upload :showUploadList="false" :customRequest="uploadFile">
              <Button>状态导入</Button>
            </Upload>
          </div>
          <div class="ml-2">
            <Button @click="handleInfoClick">信息</Button>
          </div>
          <div class="ml-2">
            <Button @click="handleSave">保存拓扑图</Button>
          </div>
          <div class="ml-2 border border-solid border-gray-400 p-2">
            <div class="flex items-center">
              <div class="whitespace-nowrap mr-4">ip地址</div>
              <Input v-model:value="ip" placeholder="请输入ip地址" />
            </div>
          </div>
        </div>
        <div class="h-full">
          <Topology :topology="typology" @select="handleTopologySelect" @unselect="handleTopologyUnselect" ref="topologyIns" />
        </div>
      </div>
    </div>
    <template v-for="popupProp in popupPropList" :key="popupProp.name">
      <Popup v-bind="popupProp" />
    </template>
  </div>
</template>
<script lang="ts" setup>
  import Topology from '/@/components/topology/index.vue';
  import { getTopology, setTopography } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { Input, Button, Upload, message } from 'ant-design-vue';
  import { getDevPort, uploadXlsxFile } from '/@/api/union/index';
  import { computed, ref, onBeforeUnmount, watch } from 'vue';
  import cytoscape from 'cytoscape';
  import Popup from './component/popup.vue';

  const warnTable = ref();
  const { data: typology, run: _getTopology } = useRequest(getTopology);
  const { data: devPortData, run: _getDevPort } = useRequest(getDevPort);
  const selectedNode = ref<cytoscape.CollectionReturnValue>();
  const popupPropList = ref([
    {
      position: { x: 0, y: 0 },
      name: '',
      ip: '',
      portList: [] as string[],
      visible: false,
    },
  ]);
  const ip = ref('');
  // 匹配用户输入ip,高亮节点
  watch(ip, () => {
    if (!topologyIns.value) {
      return;
    }
    const cy = topologyIns.value.getCy();
    if (!cy) {
      return;
    }
    cy.$('node').unselect();
    const node = cy.$(`node[ip="${ip.value}"]`);
    if (node.length) {
      node.select();
      selectedNode.value = node;
    }
  });
  const topologyIns = ref<InstanceType<typeof Topology>>();
  const selectedNodePort = computed(() => {
    if (!selectedNode.value) {
      return [];
    }
    const id = selectedNode.value.data('id');
    return (devPortData.value?.devPortList || [])
      .filter((d) => {
        return d.devName === id;
      })
      .map((d) => d.portList)
      .flat()
      .map((e) => e.portName);
  });

  let infoWindow: Window | null = null;
  let portListStr = '';
  const updateInfoWindow = () => {
    if (infoWindow) {
      const curPortListStr = JSON.stringify(selectedNodePort.value);
      if (portListStr !== curPortListStr) {
        infoWindow.location.replace(location.origin + '/#/data/home' + `?portList=${btoa(curPortListStr)}`);
      }
    }
  };
  const handleInfoClick = () => {
    // 如果弹窗已经打开 就复用该弹窗
    if (infoWindow) {
      updateInfoWindow();
      infoWindow.focus();
      return;
    }
    let strWindowFeatures = `width=900,height=900,left=999999px,top=999999px`;
    console.log(selectedNodePort.value, 'selectedNodePort.value');
    portListStr = JSON.stringify(selectedNodePort.value);
    const alarmUrl = location.origin + '/#/data/home' + `?portList=${btoa(portListStr)}`;
    infoWindow = window.open(alarmUrl, 'alarm', strWindowFeatures);
    // 弹窗被关闭时，引用的变量置为null
    if (infoWindow) {
      infoWindow.onload = () => {
        if (infoWindow) {
          infoWindow.onunload = () => {
            infoWindow = null;
          };
        }
      };
    }
  };
  onBeforeUnmount(() => {
    // 页面卸载时 弹窗要关闭
    if (infoWindow) {
      infoWindow.close();
    }
  });
  const showPopup = (node: cytoscape.CollectionReturnValue, options?: { clear?: boolean; onlyPort?: boolean }) => {
    if (options?.clear) {
      popupPropList.value = [];
    }
    const box = node.renderedBoundingBox();
    const position = { ...node.renderedPosition() };
    const props = {
      position: { x: 0, y: 0 },
      name: '',
      ip: '',
      portList: [] as string[],
      visible: false,
    };
    props.position = { x: position.x + box.w / 2, y: position.y - box.h / 2 };
    if (!options?.onlyPort) {
      props.ip = node.data('ip');
      props.name = node.data('id');
    }
    props.portList = node.data('portList');
    props.visible = true;
    popupPropList.value = [...popupPropList.value, props];
  };

  const handleTopologySelect = (node: cytoscape.CollectionReturnValue) => {
    if (node.isEdge()) {
      const { source, target } = node.data();
      showPopup(node.cy().$(`[id="${source}"]`), { onlyPort: true });
      showPopup(node.cy().$(`[id="${target}"]`), { onlyPort: true });
    }
    if (node.isNode()) {
      showPopup(node, { clear: true });
      selectedNode.value = node;
      ip.value = selectedNode.value.data('ip');
      if (infoWindow) {
        updateInfoWindow();
        infoWindow.focus();
      }
    }
  };
  const handleTopologyUnselect = (node: cytoscape.CollectionReturnValue) => {
    selectedNode.value = void 0;
    popupPropList.value = [];
  };

  const uploadFile = async (fileInfo) => {
    const res = await uploadXlsxFile({ name: 'file', file: fileInfo.file });
    if (res?.data?.body?.code === 200) {
      message.success('上传成功');
      _getTopology();
      _getDevPort();
      warnTable.value.update();
    }
  };
  const handleSave = async () => {
    if (!topologyIns.value) {
      return;
    }
    const data = topologyIns.value.getTopology();
    try {
      await setTopography(data);
      message.success('保存拓扑图成功');
    } catch (error) {}
  };
  // fabric.canvas()
  // defineProps<{  }>();
</script>
