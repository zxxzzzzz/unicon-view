<template>
  <div>
    <Card>
      <Tabs v-model:activeKey="activeKey" type="card">
        <template #rightExtra>
          <div>
            <RangePicker v-model:value="dateRange" class="mb-2" />
            <Button @click="handleDownloadData">下载数据</Button>
          </div>
        </template>
        <!-- <TabPane tab="操作" key="操作">
          <OpTable :dataSource="systemList" />
        </TabPane> -->
        <TabPane tab="端口" key="端口">
          <PortParamTable :dataSource="portList" />
        </TabPane>
        <TabPane tab="告警" key="告警">
          <AlarmParamTable :dataSource="alarmList" />
        </TabPane>
        <TabPane tab="网元时频全局信息" key="网元时频全局信息">
          <DevSyncParamTable :dataSource="devinforList" />
        </TabPane>
        <TabPane tab="网元" key="网元">
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
  import { Tabs, TabPane, Card, RangePicker, Button, message } from 'ant-design-vue';
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { useRequest } from 'vue-request';
  import { getSystemData, getCsvFile } from '/@/api/union/index';
  // defineProps<{  }>();
  type RangeValue = [Dayjs, Dayjs];
  const activeKey = ref('操作');
  const timeId = ref(0);
  const cacheData = ref<any>();
  const dateRange = ref<RangeValue>([dayjs(), dayjs()]);
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
  const handleDownloadData = async () => {
    message.info({ content: '正在下载文件...', key: 'download' });
    const res = await getCsvFile({
      dataType: activeKey.value,
      // 2022-05-02 10:22:22.000
      startTime: dateRange.value[0].format('YYYY-MM-DD HH:mm:ss.SSS'),
      endTime: dateRange.value[1].format('YYYY-MM-DD HH:mm:ss.SSS'),
    });
    const text = res.fileBody;
    const fileName = res.remark;
    const blob = new Blob([text], { type: 'text/csv' });
    const fileUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
    message.destroy('download');
    message.success('下载文件完成');
    setTimeout(() => {
      link.remove();
    }, 5000);
  };
</script>
