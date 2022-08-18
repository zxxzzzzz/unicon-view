import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

export default [
  // mock user login
  {
    url: '/basic-api/PortSyncParam',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const portList = [
        'GigabitEthernet0/1/0',
        'GigabitEthernet2/0/6',
        'GigabitEthernet2/0/7',
        'GigabitEthernet1/0/6',
        'GigabitEthernet2/1/6',
      ];
      const ar = Array(20)
        .fill(0)
        .map((d, index) => ({
          name: portList[index % 5],
          aliasName: '框-槽位-端口号',
          state: 'normal',
          enableState: '端口使能状态',
          singleType: '信号类型',
          priority: '优先级',
          qualityLevel: '质量状态',
          SSM: '时钟等级',
        }));
      return resultSuccess({
        freq: ar,
      });
    },
  },
] as MockMethod[];
