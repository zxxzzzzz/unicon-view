import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { PageNameEnum } from '/@/enums/pageEnum';

const dashboard: AppRouteModule = {
  path: '/union',
  name: PageNameEnum.UNION,
  component: LAYOUT,
  redirect: '/union/index',
  meta: {
    orderNo: 11,
    icon: 'lucide:file-digit',
    title: '数字孪生',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: PageNameEnum.UNION,
      component: () => import('/@/views/union/index.vue'),
      meta: {
        // affix: true,
        title: '数字孪生',
      },
    },
  ],
};

export default dashboard;
