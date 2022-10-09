export const clockStatusOptions = [
  { label: 'normal', value: 'normal' },
  { label: 'abnormal', value: 'abnormal' },
];
// PhysicalLayerStatus：{NA,Down,Up}
export const physicalLayerStatusOptions = [
  { label: 'NA', value: 'NA' },
  { label: '端口down', value: 'Down' },
  { label: '端口up', value: 'up' },
];
// SSMMode：{Auto, Manual }

export const SSMModeOptions = [
  { label: '自动获取', value: 'Auto' },
  { label: '手动设置', value: 'Manual' },
];
// clockIDMode
export const clockIDModeOptions = [
  { label: '自动获取', value: 'Auto' },
  { label: '手动设置', value: 'Manual' },
];
// PortState{ master,slave,passive,initializing,listening,premaster,uncalibrated,faulty}
export const portStateOptions = [
  { label: 'master', value: 'master' },
  { label: 'slave', value: 'slave' },
  { label: 'passive', value: 'passive' },
  { label: 'initializing', value: 'initializing' },
  { label: 'listening', value: 'listening' },
  { label: 'premaster', value: 'premaster' },
  { label: 'uncalibrated', value: 'uncalibrated' },
  { label: 'faulty', value: 'faulty' },
];

export const ptpPortStatusOptions = [
  { label: 'normal', value: 'normal' },
  { label: 'abnormal', value: 'abnormal' },
];
export const enableOptions = [
  { label: 'normal', value: 'normal' },
  { label: 'abnormal', value: 'abnormal' },
];
// 封装类型
export const packageTypeOptions = [
  { label: 'level2', value: 'level2' },
  { label: 'level3', value: 'level3' },
];
// 播类型 PackageType：{unicast,multicast}
export const broadcastTypeOptions = [
  { label: 'unicast', value: 'unicast' },
  { label: 'multicast', value: 'multicast' },
];

// 播类型 "delayMechanism": "E2E"//延时机制 PackageType：{E2E,P2P}
export const delayMechanismOptions = [
  { label: 'E2E', value: 'E2E' },
  { label: 'P2P', value: 'P2P' },
];

// 播类型 "delayMechanism": "E2E"//延时机制 PackageType：{E2E,P2P} TimeStampSendMode：{oneStep,twoStep}
export const timeStampSendModeOptions = [
  { label: 'oneStep', value: 'oneStep' },
  { label: 'twoStep', value: 'twoStep' },
];
