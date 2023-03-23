import type { AppRouteModule } from '/@/router/types';
import DataLayout from '/@/layouts/data/index.vue';
import DataHome from '/@/views/data/home.vue';
import DataUnion from '/@/views/data/union.vue';
import SetPortParam from '/@/views/data/setPortParam.vue';

const dashboard: AppRouteModule = {
  path: '/data',
  name: 'data',
  component: DataLayout,
  redirect: '/data/homeAlarm',
  meta: {
    ignoreAuth: true,
    orderNo: 10,
    hideMenu: true,
    icon: 'ant-design:home-filled',
    title: '首页',
  },
  children: [
    {
      path: 'home',
      name: 'dataHome',
      component: DataHome,
      props: (route) => route.query,
      meta: {
        title: '数据',
      },
    },
    {
      path: 'union',
      name: 'dataUnion',
      component: DataUnion,
      props: (route) => route.query,
      meta: {
        title: '数据',
      },
    },
    {
      path: 'setPortParam',
      name: 'setPortParam',
      component: SetPortParam,
      props: (route) => route.query,
      meta: {
        title: '数据',
      },
    },
  ],
};

export default dashboard;
