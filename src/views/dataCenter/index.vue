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
          <OpTable :dataSource="systemList" />
        </TabPane>
        <TabPane tab="端口" key="2">
          <PortParamTable :dataSource="portList" />
        </TabPane>
        <TabPane tab="告警" key="3">
          <AlarmParamTable :dataSource="alarmList" />
        </TabPane>
        <TabPane tab="网元时频全局信息" key="4">
          <DevSyncParamTable :dataSource="devinforList" />
        </TabPane>
        <TabPane tab="网元" key="5">
          <DevParamTable :dataSource="devList" />
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
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import { Dayjs } from 'dayjs';
  import { useRequest } from 'vue-request';
  import { getSystemData } from '/@/api/union/index';
  // defineProps<{  }>();
  type RangeValue = [Dayjs, Dayjs];
  const activeKey = ref('1');
  const timeId = ref(0);
  const cacheData = ref<any>();
  const dateRange = ref<RangeValue>();
  const { run: _getSystemData } = useRequest(getSystemData, {
    onSuccess(data) {
      // 初始化值
      if (!cacheData.value) {
        cacheData.value = {};
      }
      // 只更新有返回值的字段
      if (data.alarmList) {
        cacheData.value.alarmList = data.alarmList;
      }
      if (data.devList) {
        cacheData.value.devList = data.devList;
      }
      if (data.devinforList) {
        cacheData.value.devinforList = data.devinforList;
      }
      if (data.portList) {
        cacheData.value.portList = data.portList;
      }
      if (data.systemList) {
        cacheData.value.systemList = data.systemList;
      }
    },
  });
  const portList = computed(() => {
    return cacheData.value?.portList;
  });
  const alarmList = computed(() => {
    return cacheData.value?.alarmList || [];
  });
  const devList = computed(() => {
    return cacheData.value?.devList || [];
  });
  const devinforList = computed(() => {
    return cacheData.value?.devinforList || [];
  });
  const systemList = computed(() => {
    return cacheData.value?.systemList || [];
  });
  onMounted(() => {
    timeId.value = setInterval(() => {
      _getSystemData();
    }, 30 * 60 * 1000) as any as number;
  });
  onBeforeUnmount(() => {
    clearInterval(timeId.value);
  });
</script>
