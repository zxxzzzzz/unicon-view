<template>
  <Modal v-model:visible="visible" title="设置端口参数" @ok="handleOk">
    <div>
      <Form>
        <FormItem label="" />
      </Form>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
  import { Modal, Form, FormItem } from 'ant-design-vue';
  import { ref } from 'vue';
  const visible = ref(false);

  const handleOk = () => {};
  defineExpose({
    open() {
      visible.value = true;
    },
    close() {},
  });
  // defineProps<{  }>();
</script>
