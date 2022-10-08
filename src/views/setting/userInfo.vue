<template>
  <div>
    <Card>
      <Tabs v-model:activeKey="activeKey" type="card">
        <TabPane tab="登录历史" key="6">
          <LoginTable />
        </TabPane>
        <TabPane tab="用户操作历史" key="7">
          <UserOperationTable />
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Table, Select, Card, Tabs, TabPane } from 'ant-design-vue';
  import { computed, h, reactive, ref } from 'vue';
  import LoginTable from './component/loginTable.vue';
  import UserOperationTable from './component/userOperationTable.vue';
  // defineProps<{  }>();

  const selectedRoleList = reactive<string[]>([]);
  const activeKey = ref('6');
  console.log(selectedRoleList, 'selectedRoleList');
</script>
