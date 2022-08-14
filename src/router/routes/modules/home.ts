import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { PageNameEnum } from '/@/enums/pageEnum';

const dashboard: AppRouteModule = {
  path: '/home',
  name: PageNameEnum.HOME,
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '首页',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: PageNameEnum.HOME,
      component: () => import('/@/views/home/index.vue'),
      meta: {
        // affix: true,
        title: '拓扑图',
      },
    },
  ],
};

export default dashboard;
