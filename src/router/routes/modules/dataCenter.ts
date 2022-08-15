import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { PageNameEnum } from '/@/enums/pageEnum';

const dashboard: AppRouteModule = {
  path: '/dataCenter',
  name: PageNameEnum.DATA,
  component: LAYOUT,
  redirect: '/dataCenter/index',
  meta: {
    orderNo: 12,
    icon: 'bx:data',
    title: '数据中心',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: PageNameEnum.DATA,
      component: () => import('/@/views/dataCenter/index.vue'),
      meta: {
        // affix: true,
        title: '数据中心',
      },
    },
  ],
};

export default dashboard;
