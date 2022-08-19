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
  {
    url: '/basic-api/GetUserLogin',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const result = Array(30)
        .fill(0)
        .map((d) => ({
          username: 'zcv',
          state: '成功',
          position: '南京',
          'start-time': '2021-07-08',
          'end-time': '2021-07-08',
        }));
      return resultSuccess({
        Userlist: result,
      });
    },
  },
  {
    url: '/basic-api/GetUserOperation',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const result = Array(30)
        .fill(0)
        .map((d) => ({
          username: 'cbj',
          position: '上海',
          Module: '登录',
          msg: '用户登录',
          'start-time': '2021-08-07',
          'end-time': '2022-09-09',
        }));
      return resultSuccess({
        Userlist: result,
      });
    },
  },
] as MockMethod[];
