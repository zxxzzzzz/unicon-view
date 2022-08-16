import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

export default [
  // mock user login
  {
    url: '/basic-api/GetUserInformation',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess({
        AuthList: ['操作员', '普通用户', '重庆'],
        UserList: [
          {
            username: 'zxxz',
            password: 'qweqweqwe',
            authority: '操作员',
          },
          {
            username: 'zxxzzzz',
            password: 'qweqweqweqweqwe',
            authority: '操作员',
          },
          {
            username: 'wc',
            password: 'zxcasdqwe',
            authority: '操作员',
          },
        ],
      });
    },
  },
  {
    url: '/basic-api/SetUserAuthority',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess({});
    },
  },
] as MockMethod[];
