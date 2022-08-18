<template>
  <div class="h-full">
    <div class="flex h-full">
      <div class="flex flex-col w-3/4">
        <div class="h-1/2">
          <Topology
            :topology="typology"
            @tap="handleTopologyTap"
            ref="topologyIns"
            @drag="handleDrag"
          />
        </div>
        <div class="flex">
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
      <div class="flex-1">
        <Card title="告警">
          <WarnTable />
        </Card>
      </div>
    </div>
    <Popup :position="popupPosition" />
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
  import { computed, ref } from 'vue';
  import cytoscape from 'cytoscape';
  import Popup from './component/popup.vue';

  const activeKey = ref('1');
  const { data: typology, run: _getTopology } = useRequest(getTopology);
  const { data: devPortdata } = useRequest(getDevPort);
  const selectedNode = ref<cytoscape.CollectionReturnValue>();
  const popupPosition = ref({ x: 0, y: 0 });
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

  const handleTopologyTap = (node) => {
    selectedNode.value = node;
    console.log(node);
  };
  const handleDrag = (node: cytoscape.CollectionReturnValue) => {
    popupPosition.value = { ...node.renderedPosition() };
    // console.log(node.position());
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
