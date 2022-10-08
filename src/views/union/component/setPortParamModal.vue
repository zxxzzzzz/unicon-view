<template>
  <Modal v-model:visible="visible" @ok="handleOk" :closable="false" :footer="null" width="800px">
    <div>
      <div class="flex bg-[rgb(240,240,240)]">
        <template v-for="(port, index) in portList" :key="port">
          <div class="p-1 border">{{ port }}</div>
        </template>
      </div>
      <div class="main flex">
        <div class="bg-[rgb(240,240,240)] w-20">
          <div class="h-16 justify-center items-center flex">
            <div>同步以太</div>
          </div>
          <div class="h-16 justify-center items-center flex">
            <div>1588</div>
          </div>
        </div>
        <div class="content m-2 bg-[rgb(240,240,240)] w-full p-4">
          <div>
            <Form :labelCol="{ span: 8 }" labelAlign="left">
              <div class="flex flex-wrap justify-between">
                <FormItem label="端口名称" class="w-[48%]">
                  <Input v-model:value="portParamState[0].name" />
                </FormItem>
                <FormItem label="框-槽位-端口号" class="w-[48%]">
                  <Input v-model:value="portParamState[0].aliasName" />
                </FormItem>
                <FormItem label="端口状态" class="w-[48%]">
                  <Input v-model:value="portParamState[0].state" />
                </FormItem>
                <FormItem label="使能状态" class="w-[48%]">
                  <Input v-model:value="portParamState[0].enableState" />
                </FormItem>
                <FormItem label="时钟id" class="w-[48%]">
                  <Input v-model:value="portParamState[0].ptpClockId" />
                </FormItem>
                <FormItem label="域号" class="w-[48%]">
                  <Input v-model:value="portParamState[0].ptpDomain" />
                </FormItem>
                <FormItem label="时钟等级" class="w-[48%]">
                  <Input v-model:value="portParamState[0].ptpClockClass" />
                </FormItem>
                <FormItem label="优先级1" class="w-[48%]">
                  <Input v-model:value="portParamState[0].ptpPriority1" />
                </FormItem>
                <FormItem label="优先级2" class="w-[48%]">
                  <Input v-model:value="portParamState[0].ptpPriority2" />
                </FormItem>
                <FormItem label="时间源" class="w-[48%]">
                  <Input v-model:value="portParamState[0].timeSource" />
                </FormItem>
                <FormItem label="通知间隔" class="w-[48%]">
                  <Input v-model:value="portParamState[0].announceIntv" />
                </FormItem>
                <FormItem label="同步间隔" class="w-[48%]">
                  <Input v-model:value="portParamState[0].syncIntv" />
                </FormItem>
                <FormItem label="延时间隔" class="w-[48%]">
                  <Input v-model:value="portParamState[0].delayIntv" />
                </FormItem>
                <FormItem label="报文封装类型" class="w-[48%]">
                  <Input v-model:value="portParamState[0].packageType" />
                </FormItem>
                <FormItem label="报文播发类型" class="w-[48%]">
                  <Input v-model:value="portParamState[0].broadcastType" />
                </FormItem>
                <FormItem label="延时机制" class="w-[48%]">
                  <Input v-model:value="portParamState[0].delayMechanism" />
                </FormItem>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <!-- <Card class="h-100 overflow-auto">
      <Tabs type="card">
        <template v-for="(port, index) in portList" :key="port">
          <TabPane :tab="port">
            <div>
              <Form :labelCol="{ span: 6 }">
                <FormItem label="端口名称">
                  <Input v-model:value="portParamState[index].name" />
                </FormItem>
                <FormItem label="框-槽位-端口号">
                  <Input v-model:value="portParamState[index].aliasName" />
                </FormItem>
                <FormItem label="端口状态">
                  <Input v-model:value="portParamState[index].state" />
                </FormItem>
                <FormItem label="使能状态">
                  <Input v-model:value="portParamState[index].enableState" />
                </FormItem>
                <FormItem label="时钟id">
                  <Input v-model:value="portParamState[index].ptpClockId" />
                </FormItem>
                <FormItem label="域号">
                  <Input v-model:value="portParamState[index].ptpDomain" />
                </FormItem>
                <FormItem label="时钟等级">
                  <Input v-model:value="portParamState[index].ptpClockClass" />
                </FormItem>
                <FormItem label="优先级1">
                  <Input v-model:value="portParamState[index].ptpPriority1" />
                </FormItem>
                <FormItem label="优先级2">
                  <Input v-model:value="portParamState[index].ptpPriority2" />
                </FormItem>
                <FormItem label="时间源">
                  <Input v-model:value="portParamState[index].timeSource" />
                </FormItem>
                <FormItem label="通知间隔">
                  <Input v-model:value="portParamState[index].announceIntv" />
                </FormItem>
                <FormItem label="同步间隔">
                  <Input v-model:value="portParamState[index].syncIntv" />
                </FormItem>
                <FormItem label="延时间隔">
                  <Input v-model:value="portParamState[index].delayIntv" />
                </FormItem>
                <FormItem label="报文封装类型">
                  <Input v-model:value="portParamState[index].packageType" />
                </FormItem>
                <FormItem label="报文播发类型">
                  <Input v-model:value="portParamState[index].broadcastType" />
                </FormItem>
                <FormItem label="延时机制">
                  <Input v-model:value="portParamState[index].delayMechanism" />
                </FormItem>
              </Form>
            </div>
          </TabPane>
        </template>
      </Tabs>
    </Card> -->
  </Modal>
</template>
<script lang="ts" setup>
  import { Modal, Form, FormItem, Tabs, TabPane, Card, Input } from 'ant-design-vue';
  import type { I1588Params } from '/@/api/union/index';
  import { computed, reactive, Ref, ref, watch } from 'vue';
  const visible = ref(false);
  const props = defineProps<{
    device: {
      portList: string[];
      object: string;
      type: string;
      ip: string;
      posX: number;
      posY: number;
    };
    port1588Param: I1588Params['ptp'];
  }>();
  const emits = defineEmits(['sure']);
  const portList = computed(() => {
    return props?.device?.portList || [];
  });
  const portParamState = reactive(
    Array(10)
      .fill(0)
      .map(() => ({
        name: '',
        aliasName: '',
        state: '',
        enableState: '',
        ptpClockId: '', //时钟id
        ptpDomain: '', //域号
        ptpClockClass: '', //时钟等级
        ptpPriority1: '', //优先级1
        ptpPriority2: '', //优先级2
        timeSource: '', //时间源
        announceIntv: '', //通知间隔
        syncIntv: '', //同步间隔
        delayIntv: '', //延时间隔
        packageType: '', //报文封装类型
        broadcastType: '', //报文播发类型
        delayMechanism: '', //延时机制
      })),
  );
  watch(
    () => props.port1588Param,
    () => {
      portList.value.map((port, index) => {
        const matchedParam = props.port1588Param.find((p) => p.name === port) || {
          name: '',
          aliasName: '',
          state: '',
          enableState: '',
          ptpClockId: '', //时钟id
          ptpDomain: '', //域号
          ptpClockClass: '', //时钟等级
          ptpPriority1: '', //优先级1
          ptpPriority2: '', //优先级2
          timeSource: '', //时间源
          announceIntv: '', //通知间隔
          syncIntv: '', //同步间隔
          delayIntv: '', //延时间隔
          packageType: '', //报文封装类型
          broadcastType: '', //报文播发类型
          delayMechanism: '', //延时机制
        };
        portParamState[index] = matchedParam;
      });
    },
  );
  const handleOk = () => {
    emits('sure', portParamState.slice(0, portList.value.length));
  };
  defineExpose({
    open() {
      visible.value = true;
    },
    close() {},
  });
</script>
