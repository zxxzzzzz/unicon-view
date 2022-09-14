<template>
  <div>
    <Card>
      <Tabs v-model:activeKey="activeKey" type="card">
        <template #rightExtra>
          <div>
            <RangePicker v-model:value="dateRange" class="mb-2" />
            <Button>下载数据</Button>
          </div>
        </template>
        <TabPane tab="操作" key="1">
          <OpTable />
        </TabPane>
        <TabPane tab="端口" key="2">
          <PortParamTable />
        </TabPane>
        <TabPane tab="告警" key="3">
          <AlarmParamTable />
        </TabPane>
        <TabPane tab="网元时频全局信息" key="4">
          <DevSyncParamTable />
        </TabPane>
        <TabPane tab="网元" key="5">
          <DevParamTable />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import OpTable from './component/opTable.vue';
  import DevParamTable from './component/devParamTable.vue';
  import DevSyncParamTable from './component/devSyncParamTable.vue';
  import PortParamTable from './component/portParamTable.vue';
  import AlarmParamTable from './component/alarmParamTable.vue';
  import { Tabs, TabPane, Card, RangePicker, Button } from 'ant-design-vue';
  import { ref } from 'vue';
  import { Dayjs } from 'dayjs';
  // defineProps<{  }>();
  type RangeValue = [Dayjs, Dayjs];
  const activeKey = ref('1');
  const dateRange = ref<RangeValue>();
</script>
