import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realName: 'Vben Admin',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

export default [
  // mock user login
  {
    url: '/basic-api/getTopography',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess({
        DeviceList: [
          {
            object: '设备1',
            type: '设备类型',
            ip: '设备ip',
            posX: 0,
            posY: 0,
          },
          {
            object: '设备2',
            type: '设备类型',
            ip: '设备ip',
            posX: 150,
            posY: 150,
          },
          {
            object: '设备3',
            type: '设备类型',
            ip: '设备ip',
            posX: 200,
            posY: 200,
          },
        ],
        LinkList: [
          {
            object: '链路1',
            Dev1: '设备1',
            port1: '连接端口1',
            StartposX: 0,
            StartposY: 0,
            ConnectDev2: '设备2',
            port2: '连接端口2',
            EndposX: 0,
            EndposY: 0,
          },
        ],
      });
    },
  },
] as MockMethod[];
