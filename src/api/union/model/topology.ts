const t = {
  deviceList: [
    {
      object: '设备1',
      type: '设备类型',
      ip: '设备ip',
      posX: 0,
      posY: 0,
      portList: ['123', '123'],
    },
    {
      object: '设备2',
      type: '设备类型',
      ip: '设备ip',
      posX: 150,
      posY: 150,
      portList: ['123', '123'],
    },
    {
      object: '设备3',
      type: '设备类型',
      ip: '设备ip',
      posX: 200,
      posY: 200,
      portList: ['123', '123'],
    },
  ],
  linkList: [
    {
      object: '链路1',
      Dev1: '设备1',
      linkType: 'ptp',
      port1: '连接端口1',
      StartposX: 0,
      StartposY: 0,
      ConnectDev2: '设备2',
      port2: '连接端口2',
      EndposX: 0,
      EndposY: 0,
    },
  ],
};
const devPortItem = {
  deviceName: '设备1',
  portList: ['GigabitEthernet0/1/0', 'GigabitEthernet2/0/6'],
};
type DevPortItem = typeof devPortItem;

export type Topology = typeof t;
export type DevPort = DevPortItem[];
