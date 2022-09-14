<template>
  <div>
    <Card>
      <Tabs v-model:activeKey="activeKey" type="card">
        <TabPane tab="设置" key="5">
          <Table :columns="columns" :dataSource="userList" />
        </TabPane>
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
  import type { TableProps } from 'ant-design-vue';
  import { getUserInformation, setUserInformation } from '/@/api/union';
  import type { AllUserInfo } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { computed, h, reactive, ref } from 'vue';
  import LoginTable from './component/loginTable.vue';
  import UserOperationTable from './component/userOperationTable.vue';
  // defineProps<{  }>();

  const selectedRoleList = reactive<string[]>([]);
  const activeKey = ref('5');
  const { data } = useRequest(getUserInformation, {
    onSuccess(_data) {
      _data.UserList.forEach((u, index) => {
        selectedRoleList[index] = u.authority;
      });
    },
  });
  const roleList = computed(() => {
    return data.value?.AuthList || [];
  });
  const userList = computed(() => {
    return data.value?.UserList || [];
  });
  const roleOptions = computed(() => {
    return roleList.value.map((r) => {
      return {
        label: r,
        value: r,
      };
    });
  });
  console.log(selectedRoleList, 'selectedRoleList');
  const columns: TableProps<AllUserInfo['UserList'][0]>['columns'] = [
    { dataIndex: 'username', title: '用户名称' },
    { dataIndex: 'password', title: '密码' },
    {
      dataIndex: 'authority',
      title: '角色',
      customRender({ record, index }) {
        // selectedRoleList[index] = record.authority;
        return h(
          Select,
          {
            options: roleOptions.value,
            value: selectedRoleList[index],
            class: 'w-30',
            async onChange(_v) {
              try {
                await setUserInformation({
                  userList: [{ ...record, authority: (_v || '') as string }],
                });
                selectedRoleList[index] = (_v || '') as string;
              } catch (error) {}
            },
          },
          '分配角色',
        );
      },
    },
  ];
</script>
