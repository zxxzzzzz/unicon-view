<template>
  <Modal v-model:visible="visible" title="设置端口参数" @ok="handleOk">
    <Tabs>
      <template v-for="port in portList" :key="port">
        <TabPane :tab="port" />
      </template>
    </Tabs>
    <div>
      <Form>
        <FormItem label="" />
      </Form>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
  import { Modal, Form, FormItem, Tabs, TabPane } from 'ant-design-vue';
  import cytoscape from 'cytoscape';
  import { computed, ref } from 'vue';
  const visible = ref(false);
  const props = defineProps<{ node: cytoscape.CollectionReturnValue }>();
  const portList = computed(() => {
    return props.node.data('portList') as string[];
  });
  const handleOk = () => {};
  defineExpose({
    open() {
      visible.value = true;
    },
    close() {},
  });
  // defineProps<{  }>();
</script>
