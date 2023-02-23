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
        <TabPane tab="登录历史" key="用户登录">
          <LoginTable />
        </TabPane>
        <TabPane tab="用户操作历史" key="用户操作">
          <UserOperationTable />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Card, Tabs, TabPane, RangePicker, Button, message } from 'ant-design-vue';
  import { ref } from 'vue';
  import LoginTable from './component/loginTable.vue';
  import UserOperationTable from './component/userOperationTable.vue';
  import dayjs, { Dayjs } from 'dayjs';
  import { getCsvFile } from '/@/api/union/index';
  // defineProps<{  }>();

  type RangeValue = [Dayjs, Dayjs];
  const activeKey = ref('用户登录');
  const dateRange = ref<RangeValue>([dayjs(), dayjs()]);

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
