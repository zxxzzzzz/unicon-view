<template>
  <div class="h-[calc(100vh-48px)]">
    <div class="flex h-full">
      <div class="flex flex-col w-3/5">
        <div class="h-[50vh]">
          <Topology :topology="typology" @tap="handleTopologyTap" ref="topologyIns" />
        </div>
        <div class="flex overflow-auto">
          <div class="flex-1">
            <Card title="端口">
              <Tabs v-model:activeKey="activeKey" type="card">
                <TabPane key="1" tab="1588">
                  <T1588Table :selectedPortList="selectedNodePort" />
                </TabPane>
                <TabPane key="2" tab="同步">
                  <SyncTable :selectedPortList="selectedNodePort" />
                </TabPane>
              </Tabs>
            </Card>
          </div>
          <div class="flex-1">
            <Card title="搜索">
              <div class="flex items-center">
                <div class="whitespace-nowrap mr-4">ip地址</div>
                <Input v-model:value="ip" placeholder="请输入ip地址" />
              </div>
              <div class="flex justify-end mt-4">
                <Button @click="handleSearch"> 搜索</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div class="flex-1 overflow-auto">
        <Card title="告警">
          <WarnTable />
        </Card>
      </div>
    </div>
    <Popup v-bind="popupProps" />
  </div>
</template>
<script lang="ts" setup>
  import Topology from '/@/components/topology/index.vue';
  import { getTopology } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { Table, TabPane, Tabs, Card, Input, Button } from 'ant-design-vue';
  import T1588Table from './component/1588Table.vue';
  import SyncTable from './component/syncTable.vue';
  import WarnTable from './component/warnTable.vue';
  import { getDevPort } from '/@/api/union/index';
  import { computed, ref, reactive } from 'vue';
  import cytoscape from 'cytoscape';
  import Popup from './component/popup.vue';

  const activeKey = ref('1');
  const { data: typology, run: _getTopology } = useRequest(getTopology);
  const { data: devPortdata } = useRequest(getDevPort);
  const selectedNode = ref<cytoscape.CollectionReturnValue>();
  const popupProps = reactive({
    position: { x: 0, y: 0 },
    name: '',
    ip: '',
    portList: [],
    visible: false,
  });
  const ip = ref('');
  const topologyIns = ref<InstanceType<typeof Topology>>();
  const selectedNodePort = computed(() => {
    if (!selectedNode.value) {
      return [];
    }
    const id = selectedNode.value.data('id');
    return (devPortdata.value || [])
      .filter((d) => {
        return d.DeviceName === id;
      })
      .map((d) => d.PortList)
      .flat();
  });

  const handleTopologyTap = (node: cytoscape.CollectionReturnValue) => {
    if (selectedNode.value?.data?.('id') === node.data('id') && popupProps.visible === true) {
      popupProps.visible = false;
    } else {
      const box = node.renderedBoundingBox();
      const position = { ...node.renderedPosition() };
      popupProps.position = { x: position.x + box.w / 2, y: position.y - box.h / 2 };
      popupProps.ip = node.data('ip');
      popupProps.name = node.data('id');
      popupProps.portList = node.data('portList');
      popupProps.visible = true;
    }
    selectedNode.value = node;
    console.log(node.data());
  };
  const handleSearch = () => {
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
  };
  // fabric.canvas()
  // defineProps<{  }>();
</script>
