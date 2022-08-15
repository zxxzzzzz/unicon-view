const a = {
  alarm: [
    {
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
    },
  ],
};
export type Alarm = typeof a;
