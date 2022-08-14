import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { PageNameEnum } from '/@/enums/pageEnum';

const dashboard: AppRouteModule = {
  path: '/setting',
  name: PageNameEnum.SETTING,
  component: LAYOUT,
  redirect: '/setting/index',
  meta: {
    orderNo: 12,
    icon: 'ant-design:setting-outlined',
    title: '设置',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: PageNameEnum.SETTING,
      component: () => import('/@/views/setting/index.vue'),
      meta: {
        // affix: true,
        title: '设置',
      },
    },
  ],
};

export default dashboard;
