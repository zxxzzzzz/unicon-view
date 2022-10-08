import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { PageNameEnum } from '/@/enums/pageEnum';

const dashboard: AppRouteModule = {
  path: '/user',
  name: PageNameEnum.SETTING,
  component: LAYOUT,
  redirect: '/user/setting',
  meta: {
    orderNo: 13,
    icon: 'ant-design:setting-outlined',
    title: '设置',
    hideMenu: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'setting',
      name: PageNameEnum.SETTING,
      component: () => import('/@/views/setting/index.vue'),
      meta: {
        // affix: true,
        title: '设置',
      },
    },
    {
      path: 'info',
      name: PageNameEnum.USER_INFO,
      component: () => import('/@/views/setting/userInfo.vue'),
      meta: {
        // affix: true,
        title: '用户中心',
      },
    },
  ],
};

export default dashboard;
