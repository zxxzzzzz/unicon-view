import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';

export default [
  // mock user login
  {
    url: '/basic-api/Port1588Param',
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
          state: '端口状态',
          enableState: '使能状态',
          ptpClockId: '00:D0:DA:FF:FE:00:00:08', //时钟id
          ptpDomain: '1', //域号
          ptpProfile: 'itu-g8275-1', //ptp标准协议
          ptpPortStatus: 'master', //端口状态
          ptpClockClass: '6', //时钟等级
          ptpPriority1: '7', //优先级1
          ptpPriority2: '8', //优先级2
          timeSource: '160', //时间源
          announceIntv: '2', //通知间隔
          syncIntv: '2', //同步间隔
          delayIntv: '2', //延时间隔
          packageType: 'level2', //报文封装类型
          broadcastType: 'unicast', //报文播发类型
          delayMechanism: 'E2E', //延时机制
          timestampSend: '', //时间戳发送模式
        }));
      return resultSuccess({
        ptp: ar,
      });
    },
  },
] as MockMethod[];
