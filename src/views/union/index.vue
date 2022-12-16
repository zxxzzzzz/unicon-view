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
            <div class="flex justify-end mt-2">
              <Button @click="handleSend">仿真</Button>
            </div>
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
  import { Button, Card, Input, Descriptions, DescriptionsItem, Table, Modal as AntModal } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { ref, computed, h } from 'vue';
  import { useModal } from '/@/hooks/component/useModal';
  import SetPortParamModal from './component/setPortParamModal.vue';
  import cytoscape from 'cytoscape';
  import type { SetPortParam } from '/@/api/union/index';
  import { getPort1588Param } from '/@/api/union/index';
  import { getUserData } from '/@/api/union/index';
  import { useDraggable, useElementBounding } from '@vueuse/core';
  import InputTable from './component/inputTable.vue';

  const { Modal, open } = useModal(SetPortParamModal);
  // const activeKey = ref('1');
  const { data: topology, run: _getTopology } = useRequest(getTopology);
  const { data: port1588ParamData, run } = useRequest(getPort1588Param);
  const { data: userData, run: _getUserData } = useRequest(getUserData, { manual: true });
  const Textarea = Input.TextArea;
  const dragTable = ref<HTMLElement>();
  const pos = useElementBounding(dragTable);
  const isTableDrag = ref(false);
  const initPos = computed(() => {
    return {
      x: pos.x.value,
      y: pos.y.value,
    };
  });
  const { x, y, style } = useDraggable(dragTable, {
    initialValue: { x: 300, y: 300 },
  });
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
    const data = ref<any>();
    AntModal.confirm({
      title: '发送',
      content: h(InputTable, {
        onChange(d) {
          console.log(d, 'd');
          data.value = d;
        },
      }),
      width: '100%',
      onOk() {
        _getUserData(data.value);
      },
    });
  };
  const handleResult = () => {};
  const handleTableDblclick = () => {
    isTableDrag.value = true;
  };
</script>
