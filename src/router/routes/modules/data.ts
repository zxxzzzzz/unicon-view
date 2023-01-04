import type { AppRouteModule } from '/@/router/types';
import DataLayout from '/@/layouts/data/index.vue';

const dashboard: AppRouteModule = {
  path: '/data',
  name: 'data',
  component: DataLayout,
  redirect: '/data/homeAlarm',
  meta: {
    orderNo: 10,
    hideMenu: true,
    icon: 'ant-design:home-filled',
    title: '首页',
  },
  children: [
    {
      path: 'homeAlarm',
      name: 'homeAlarm',
      component: () => import('/@/views/data/homeAlarm.vue'),
      meta: {
        title: '拓扑图',
      },
    },
  ],
};

export default dashboard;
