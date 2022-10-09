<template>
  <div class="h-[calc(100vh-48px)]">
    <div class="flex h-full">
      <div class="h-3/4 flex-2">
        <Topology :topology="topology" @tap="handleTap" />
        <div> 123 </div>
      </div>
      <div class="flex-1 overflow-auto">
        <Card title="仿真结果">
          <div>
            <div>输入</div>
            <Textarea :rows="5" v-model:value="msg" />
            <div class="flex justify-end mt-2">
              <Button @click="handleSend">发送</Button>
            </div>
          </div>
          <div>
            <Table :columns="portTableColumnList" :dataSource="userData?.portlist || []" />
            <!-- <template v-for="port in userData?.portlist || []" :key="port.name">
              <Descriptions title="结果" :column="2" bordered>
                <DescriptionsItem label="端口名称">{{ port.name }}</DescriptionsItem>
                <DescriptionsItem label="框-槽位-端口号">{{ port.aliasName }}</DescriptionsItem>
                <DescriptionsItem label="端口状态">{{ port.state }}</DescriptionsItem>
                <DescriptionsItem label="使能状态">{{ port.enableState }}</DescriptionsItem>
                <DescriptionsItem label="时钟id">{{ port.ptpClockId }}</DescriptionsItem>
                <DescriptionsItem label="域号">{{ port.ptpDomain }}</DescriptionsItem>
                <DescriptionsItem label="时钟等级">{{ port.ptpClockClass }}</DescriptionsItem>
                <DescriptionsItem label="优先级1">{{ port.ptpPriority1 }}</DescriptionsItem>
                <DescriptionsItem label="优先级2">{{ port.ptpPriority2 }}</DescriptionsItem>
                <DescriptionsItem label="时间源">{{ port.timeSource }}</DescriptionsItem>
                <DescriptionsItem label="通知间隔">{{ port.announceIntv }}</DescriptionsItem>
                <DescriptionsItem label="同步间隔">{{ port.syncIntv }}</DescriptionsItem>
                <DescriptionsItem label="延时间隔">{{ port.delayIntv }}</DescriptionsItem>
                <DescriptionsItem label="报文封装类型">{{ port.packageType }}</DescriptionsItem>
                <DescriptionsItem label="报文播发类型">{{ port.broadcastType }}</DescriptionsItem>
                <DescriptionsItem label="延时机制">{{ port.delayMechanism }}</DescriptionsItem>
              </Descriptions>
            </template> -->
          </div>
        </Card>
      </div>
    </div>
    <Modal />
  </div>
</template>
<script lang="ts" setup>
  import Topology from '/@/components/topology/index.vue';
  import { getTopology } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { Button, Card, Input, Descriptions, DescriptionsItem, Table } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { ref } from 'vue';
  import { useModal } from '/@/hooks/component/useModal';
  import SetPortParamModal from './component/setPortParamModal.vue';
  import cytoscape from 'cytoscape';
  import type { SetPortParam } from '/@/api/union/index';
  import { getPort1588Param } from '/@/api/union/index';
  import { getUserData } from '/@/api/union/index';

  const { Modal, open } = useModal(SetPortParamModal);
  // const activeKey = ref('1');
  const { data: topology, run: _getTopology } = useRequest(getTopology);
  const { data: port1588ParamData, run } = useRequest(getPort1588Param);
  const { data: userData, run: _getUserData } = useRequest(getUserData, { manual: true });
  const Textarea = Input.TextArea;
  const msg = ref('');

  const portTableColumnList: TableProps['columns'] = [
    { dataIndex: 'name', key: 'name', title: '名称' },
    { dataIndex: 'aliasName', key: 'name', title: '框-槽位-端口号' },
    { dataIndex: 'state', key: 'name', title: '端口状态' },
  ];

  const handleTap = async (node: cytoscape.CollectionReturnValue) => {
    try {
      const portParam = await open<SetPortParam['portlist']>({
        device: node.data() as any,
        port1588Param: port1588ParamData.value?.ptp || [],
      });
      console.log(portParam);
    } catch (error) {}
    // setTimeout(async () => {
    // }, 300);
  };
  const handleSend = async () => {
    _getUserData({ username: '', msg: msg.value });
  };
</script>
