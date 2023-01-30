import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { PageNameEnum } from '/@/enums/pageEnum';

const dashboard: AppRouteModule = {
  path: '/systemAlarm',
  name: PageNameEnum.SYSTEM_ALARM,
  component: LAYOUT,
  redirect: '/systemAlarm/index',
  meta: {
    orderNo: 12,
    icon: 'ri:alarm-warning-line',
    title: '系统告警',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: PageNameEnum.SYSTEM_ALARM,
      component: () => import('/@/views/systemAlarm/index.vue'),
      meta: {
        // affix: true,
        title: '系统告警',
      },
    },
  ],
};

export default dashboard;
