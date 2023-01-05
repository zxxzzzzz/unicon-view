<template>
  <div>
    <Card>
      <Table :columns="columns" :dataSource="userList" />
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
  // defineProps<{  }>();

  const selectedRoleList = reactive<string[]>([]);
  const activeKey = ref('5');
  const { data } = useRequest(getUserInformation, {
    onSuccess(_data) {
      _data.userList.forEach((u, index) => {
        selectedRoleList[index] = u.authority;
      });
    },
  });
  const roleList = computed(() => {
    return data.value?.AuthList || [];
  });
  const userList = computed(() => {
    return data.value?.userList || [];
  });
  const roleOptions = computed(() => {
    return roleList.value.map((r) => {
      return {
        label: r,
        value: r,
      };
    });
  });
  const columns: TableProps<AllUserInfo['userList'][0]>['columns'] = [
    { dataIndex: 'userName', title: '用户名称' },
    { dataIndex: 'position', title: '地点' },
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
