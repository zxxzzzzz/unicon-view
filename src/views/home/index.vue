<template>
  <div class="h-full">
    <div class="flex h-full">
      <div class="flex flex-col w-3/4">
        <div class="h-1/2">
          <Topology :topology="typology" />
        </div>
        <div class="flex">
          <div class="flex-1">
            <Card title="端口">
              <Tabs v-model:activeKey="activeKey" type="card">
                <TabPane key="1" tab="1588">
                  <T1588Table />
                </TabPane>
                <TabPane key="2" tab="同步">
                  <SyncTable />
                </TabPane>
              </Tabs>
            </Card>
          </div>
          <div class="flex-1">
            <Card title="搜索">
              <Input />
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
  </div>
</template>
<script lang="ts" setup>
  import Topology from './component/topology.vue';
  import { getTopology } from '/@/api/union/topology';
  import { useRequest } from 'vue-request';
  import { Table, TabPane, Tabs, Card, Input } from 'ant-design-vue';
  import T1588Table from './component/1588Table.vue';
  import SyncTable from './component/syncTable.vue';
  import WarnTable from './component/warnTable.vue';
  import { ref } from 'vue';

  const activeKey = ref('1');
  const { data: typology, run: _getTopology } = useRequest(getTopology);
  // fabric.canvas()
  // defineProps<{  }>();
</script>
