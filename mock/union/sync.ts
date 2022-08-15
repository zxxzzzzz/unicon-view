import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

export default [
  // mock user login
  {
    url: '/basic-api/PortSyncParam',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const ar = Array(20)
        .fill(0)
        .map((d) => ({
          name: '端口名称',
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
