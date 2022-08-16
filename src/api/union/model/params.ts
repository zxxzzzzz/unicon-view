const setPortParam = {
  username: '用户名称',
  devname: '网元名称',
  portlist: [
    {
      name: '端口名称',
      aliasName: '框-槽位-端口号',
      state: '端口状态',
      enableState: '使能状态',
      ptpClockId: '00:D0:DA:FF:FE:00:00:08', //时钟id
      ptpDomain: '1', //域号
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
    },
  ],
};
export type SetPortParam = typeof setPortParam;
