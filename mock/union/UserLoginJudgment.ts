import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

export default [
  // mock user login
  {
    url: '/UserLoginJudgment',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess({
        userId: '1',
        username: 'vben',
        realName: 'Vben Admin',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
        desc: 'manager',
        password: '123456',
        token: 'fakeToken1',
        homePath: '',
        roles: [
          {
            roleName: 'Super Admin',
            value: 'super',
          },
        ],
      });
    },
  },
] as MockMethod[];
