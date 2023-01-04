<template>
  <Table :columns="columns" :dataSource="filterDataSource" :pagination="pagination" />
</template>
<script lang="ts" setup>
  import { Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { useRequest } from 'vue-request';
  import { getSyncParam } from '/@/api/union';
  import { computed } from 'vue';
  const props = defineProps<{ selectedPortList: string[] }>();
  const { data: dataSource, run: _getSyncParam } = useRequest(getSyncParam, {
    formatResult: (d) => d.freq,
  });
  const filterDataSource = computed(() => {
    if (!props.selectedPortList?.length) {
      return [];
    }
    if (!dataSource.value) {
      return [];
    }
    return dataSource.value.filter((d) => props.selectedPortList.includes(d.portName));
  });

  //  name: '端口名称',
  //     aliasName: '框-槽位-端口号',
  //     state: 'normal',
  //     enableState: '端口使能状态',
  //     singleType: '信号类型',
  //     priority: '优先级',
  //     qualityLevel: '质量状态',
  //     SSM: '时钟等级',

  const columns: TableProps['columns'] = [
    { dataIndex: 'portName', title: '端口名称' },
    { dataIndex: 'aliasName', title: '框-槽位-端口号' },
    { dataIndex: 'clockState', title: '状态' },
    { dataIndex: 'enableState', title: '端口使能状态' },
    { dataIndex: 'singleType', title: '信号类型' },
  ];
  const pagination: TableProps['pagination'] = {
    pageSize: 5,
  };
</script>
