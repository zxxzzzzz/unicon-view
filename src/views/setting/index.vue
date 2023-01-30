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
  import { getUserInformation, setUserInformation } from '/@/api/union';
  import { useRequest } from 'vue-request';
  import { computed, h, ref } from 'vue';
  // defineProps<{  }>();

  type UserItem = {
    authority: string;
    position: string[];
    userName: string;
  };
  const userList = ref<UserItem[]>([]);
  const { data } = useRequest(getUserInformation, {
    onSuccess(_data) {
      userList.value = _data.userList.map((u) => ({
        authority: u.authority,
        position: ['', u.position],
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
  const cityList = [
    { name: '重庆', children: [{ name: '渝中区' }, { name: '万州区' }, { name: '江津区' }, { name: '永川区' }] },
    {
      name: '江苏',
      children: [{ name: '南京' }, { name: '无锡' }, { name: '南通' }, { name: '常州' }, { name: '徐州' }, { name: '扬州' }, { name: '盐城' }, { name: '泰州' }, { name: '苏州' }],
    },
    { name: '浙江', children: [{ name: '杭州' }, { name: '宁波' }, { name: '嘉兴' }, { name: '温州' }, { name: '金华' }, { name: '台州' }, { name: '湖州' }, { name: '绍兴' }] },
    { name: '北京', children: [{ name: '东城区' }, { name: '西城区' }, { name: '朝阳区' }, { name: '海淀区' }, { name: '丰台区' }] },
    {
      name: '上海',
      children: [{ name: '黄浦区' }, { name: '徐汇区' }, { name: '长宁区' }, { name: '杨浦区' }, { name: '虹口区' }, { name: '普陀区' }, { name: '静安区' }, { name: '浦东新区' }],
    },
    {
      name: '广东',
      children: [
        { name: '深圳市' },
        { name: '广州市' },
        { name: '佛山市' },
        { name: '东莞市' },
        { name: '惠州市' },
        { name: '珠海市' },
        { name: '中山市' },
        { name: '湛江市' },
        { name: '江门市' },
      ],
    },
    { name: '天津', children: [{ name: '津南区' }, { name: '东丽区' }, { name: '南开区' }, { name: '滨海新区' }, { name: '河西区' }, { name: '河东区' }, { name: '和平区' }] },
    { name: '内蒙古', children: [{ name: '鄂尔多斯' }, { name: '包头' }, { name: '呼和浩特' }, { name: '通辽' }, { name: '赤峰' }, { name: '呼伦贝尔' }] },
    { name: '广西', children: [{ name: '南宁市' }, { name: '柳州市' }, { name: '桂林市' }, { name: '玉林市' }, { name: '钦州市' }, { name: ' 百色市' }, { name: '北海市' }] },
    { name: '西藏', children: [{ name: '拉萨市' }, { name: '日喀则市' }, { name: '昌都市' }, { name: '林芝市' }, { name: '山南市' }, { name: '那曲市' }, { name: '阿里地区' }] },
    { name: '宁夏', children: [{ name: '银川市' }, { name: '吴忠市' }, { name: '石嘴山市区' }, { name: '中卫市' }, { name: '固原市' }] },
    { name: '新疆', children: [{ name: '乌鲁木齐' }, { name: '克拉玛依市' }, { name: '吐鲁番市' }, { name: '巴州' }, { name: '阿克苏地区' }] },
    {
      name: '河北',
      children: [{ name: '石家庄' }, { name: '衡水市' }, { name: '承德市' }, { name: '邯郸市' }, { name: '衡水市' }, { name: '廊坊市' }, { name: '秦皇岛市' }, { name: '唐山市' }],
    },
    {
      name: '山西',
      children: [{ name: '太原' }, { name: '大同' }, { name: '晋中' }, { name: '晋城' }, { name: '长治' }, { name: '运城' }, { name: '吕梁' }, { name: '朔州' }, { name: '阳泉' }],
    },
    { name: '陕西', children: [{ name: '西安' }, { name: '榆林' }, { name: '宝鸡' }, { name: '咸阳' }, { name: '渭南' }, { name: '延安' }] },
    { name: '辽宁', children: [{ name: '沈阳' }, { name: '大连' }, { name: '鞍山' }, { name: '抚顺' }, { name: '营口' }, { name: '辽宁' }, { name: '朝阳' }] },
    { name: '吉林', children: [{ name: '长春' }, { name: '吉林' }, { name: '松原' }, { name: '通化' }, { name: '延边州' }, { name: '四平' }, { name: '白城' }] },
    { name: '黑龙江', children: [{ name: '哈尔滨' }, { name: '齐齐哈尔' }, { name: '牡丹江' }, { name: '绥化' }, { name: '鸡西' }, { name: '大兴安岭' }] },
    { name: '安徽', children: [{ name: '亳州' }, { name: '芜湖' }, { name: '滁州' }, { name: '蚌埠' }, { name: '黄山' }] },
    { name: '福建', children: [{ name: '泉州' }, { name: '福州' }, { name: '厦门' }, { name: '莆田' }, { name: '宁德' }] },
    { name: '江西', children: [{ name: '南昌' }, { name: '赣州' }, { name: '九江' }, { name: '宜春' }, { name: '上饶' }, { name: '吉安' }, { name: '抚州' }, { name: '新余' }] },
    { name: '山东', children: [{ name: '青岛' }, { name: '济南' }, { name: '烟台' }] },
    {
      name: '河南',
      children: [
        { name: '郑州市' },
        { name: '洛阳市' },
        { name: '开封市' },
        { name: '开封市' },
        { name: '安阳市' },
        { name: '信阳市' },
        { name: '南阳市' },
        { name: '濮阳市' },
        { name: '周口市' },
        { name: '新乡市' },
      ],
    },
    { name: '湖北', children: [{ name: '武汉' }, { name: '襄阳' }, { name: '宜昌' }, { name: '黄石' }, { name: '孝感' }, { name: '十堰' }, { name: '荆州' }, { name: '荆门' }] },
    {
      name: '湖南',
      children: [
        { name: '长沙' },
        { name: '邵阳' },
        { name: '株洲' },
        { name: '郴州' },
        { name: '岳阳' },
        { name: '湘潭' },
        { name: '益阳' },
        { name: '常德' },
        { name: '衡阳' },
        { name: '永州' },
      ],
    },
    { name: '海南', children: [{ name: '三亚' }, { name: '海口' }, { name: '琼海' }, { name: '文昌' }, { name: '万宁' }] },
    {
      name: '四川',
      children: [
        { name: '成都' },
        { name: '绵阳' },
        { name: '攀枝花' },
        { name: '南充' },
        { name: '泸州' },
        { name: '宜宾' },
        { name: '内江' },
        { name: '乐山' },
        { name: '德阳' },
      ],
    },
    { name: '贵州', children: [{ name: '贵阳' }, { name: '遵义' }, { name: '毕节' }, { name: '黔南州' }, { name: '安顺' }] },
    { name: '云南', children: [{ name: '昆明市' }, { name: '玉溪市' }, { name: '丽江市' }, { name: '普洱市' }, { name: '昭通市' }, { name: '临沧市' }] },
    { name: '甘肃', children: [{ name: '兰州' }, { name: '庆阳' }, { name: '金昌' }] },
    { name: '青海', children: [{ name: '格尔木市' }, { name: '西宁市' }] },
  ];
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
          async onChange(v) {
            await setUserInformation({
              userList: [{ userName: record.userName, authority: record.authority, position: (v[1] || '') as string }],
            });
            userList.value[index].position = v as string[];
          },
          value: [cityList.find((c) => c.children.some((cc) => cc.name === record.position[1]))?.name || '', record.position[1]],
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
        return h(
          Select,
          {
            options: roleOptions.value,
            value: record.authority,
            class: 'w-30',
            async onChange(_v) {
              try {
                await setUserInformation({
                  userList: [{ userName: record.userName, position: record.position[1], authority: (_v || '') as string }],
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
