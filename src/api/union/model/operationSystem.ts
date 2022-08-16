const item = {
  name: 'ee9e416e-2886-11e6-a71d-7824af3f',
  userLabel: 'UL_SS_EMS',
  aliasName: 'EMS',
  softwareVersion: '2.1.16',
  productName: 'SNM',
  manufacturer: 'Saisi',
  ip: '192.168.1.222',
  location: '浙江省杭州市',
  status: '网管管理状态',
  runStatus: '网管运行状态',
};

type Item = typeof item;

const devParamItem = {
  id: '网元 id',
  name: '网元名称',
  status: '网元管理状态',
  runStatus: '网元运行状态',
  deviceType: '网元类型',
  ip: '网元 ip',
  location: '网元位置',
  vendor: '网元厂商',
  hwVersion: '硬件版本信息',
  swVersion: '软件版本信息',
};

const devSyncParamItem = {
  deviceId: '网元 ID',
  refTimeInput: '参考时间源端口',
  refFreqInput: '参考频率源端口',
  timeStatus: '时间状态',
  freqStatus: '时钟状态',
  systemTime: '网元系统时间',
  cc1State: '钟卡 1 状态',
  cc2State: '钟卡 2 状态',
  latitude: 'N37:22:43.425',
  longitude: 'E121:55:34.815',
  high: '13.7',
};

const portParamItem = {
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
};
const alarmParamItem = {
  id: '告警 id',
  type: '设备/网管',
  alarmNo: '告警类别名称',
  deviceId: '网元 id',
  alarmLevel: '告警等级',
  alarmModule: '告警源',
  alarmDesc: '告警描述',
  alarmState: '告警状态', //（产生、已确认未清除、未确认已清除）
  alarmTime: '告警时间',
  confirmTime: '确认时间',
  clearTime: '清除时间',
};

type DevParamItem = typeof devParamItem;
type DevSyncParamItem = typeof devSyncParamItem;
type PortParamItem = typeof portParamItem;
type AlarmParamItem = typeof alarmParamItem;
export type OperationSystem = { Systemlist: Item[] };
export type DevParam = { devlist: DevParamItem[] };
export type DevSyncParam = { devinforlist: DevSyncParamItem[] };
export type PortParam = { portlist: PortParamItem[] };
export type AlarmParam = { alarmlist: AlarmParamItem[] };
