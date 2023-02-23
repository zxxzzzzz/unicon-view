<template>
  <div>
    <Card>
      <Table :columns="columns" :dataSource="userList" />
    </Card>
  </div>
</template>
<script lang="ts" setup>
  import { Table, Select, Card, Cascader } from 'ant-design-vue';
  import type { TableProps } from 'ant-design-vue';
  import { getUserInformation, SetUserAuthority } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { computed, h, ref } from 'vue';
  import { cityList } from './cityList';
  // defineProps<{  }>();

  type UserItem = {
    authority: string;
    position: [string, string][];
    userName: string;
  };
  const userList = ref<UserItem[]>([]);
  const { data } = useRequest(getUserInformation, {
    onSuccess(_data) {
      userList.value = _data.userList.map((u) => ({
        authority: u.authority,
        position: [[cityList.find((c) => c.children.some((cc) => cc.name === u.position))?.name || '', u.position]],
        userName: u.userName,
      }));
    },
  });
  const roleOptions = computed(() => {
    return (data.value?.authList || []).map((r) => {
      return {
        label: r,
        value: r,
      };
    });
  });

  const columns: TableProps<UserItem>['columns'] = [
    { dataIndex: 'userName', title: '用户名称' },
    {
      dataIndex: 'position',
      title: '地点',
      customRender({ record, index }) {
        return h(Cascader, {
          showSearch: true,
          dropdownClassName: 'h-160 city',
          expandTrigger: 'hover',
          multiple: true,
          async onChange(v) {
            const pMap = (v as [string, string][]).reduce((re, sl) => {
              if (re[sl[0]]) {
                re[sl[0]] = [...re[sl[0]], sl[1]];
              } else {
                re[sl[0]] = [sl[1]];
              }
              return re;
            }, {});
            const position = Object.keys(pMap).map((k) => {
              const cityList = pMap[k];
              return {
                province: k,
                city: cityList.map((c) => ({ cityName: c })),
              };
            });
            await SetUserAuthority({
              userList: [{ userName: record.userName, authority: record.authority, position }],
            });
            userList.value[index].position = v as [string, string][];
          },
          value: userList.value[index].position,
          options: cityList.map((city) => {
            return {
              value: city.name,
              label: city.name,
              children: city.children.map((c) => ({ label: c.name, value: c.name })),
            };
          }),
        });
      },
    },
    {
      dataIndex: 'authority',
      title: '角色',
      customRender({ record, index }) {
        const pMap = (userList.value[index].position as [string, string][]).reduce((re, sl) => {
          if (re[sl[0]]) {
            re[sl[0]] = [...re[sl[0]], sl[1]];
          } else {
            re[sl[0]] = [sl[1]];
          }
          return re;
        }, {});
        const position = Object.keys(pMap).map((k) => {
          const cityList = pMap[k];
          return {
            province: k,
            city: cityList.map((c) => ({ cityName: c })),
          };
        });
        return h(
          Select,
          {
            options: roleOptions.value,
            value: record.authority,
            class: 'w-30',
            disabled: data.value?.userList?.length === 1,
            async onChange(_v) {
              try {
                await SetUserAuthority({
                  userList: [{ userName: record.userName, position, authority: (_v || '') as string }],
                });
                userList.value[index].authority = (_v || '') as string;
              } catch (error) {}
            },
          },
          '分配角色',
        );
      },
    },
  ];
</script>
<style lang="css">
  .city .ant-cascader-menu {
    height: 40rem;
  }
</style>
