const a = {
  authList: ['操作员', '普通用户', '重庆'],
  userList: [
    {
      authority: '操作员',
      position: '嘉兴',
      userName: 'zhangsan',
    },
  ],
};
const userItem = {
  userName: 'wc',
  position: [{ province: '', city: [{ cityName: '' }] }],
  authority: '操作员',
};

const loginItem = {
  username: '用户名称',
  state: '登录状态',
  position: '登录地点',
  startTime: '登录起始时间',
  endTime: '登录结束时间',
};

const operationItem = {
  username: '用户名称',
  position: '登录地点',
  Module: '操作模块',
  msg: '操作内容',
  'start-time': '操作开始时间',
  'end-time': '操作结束时间',
};

export type AllUserInfo = typeof a;
export type UserItem = typeof userItem;
export type LoginHistory = { userList: typeof loginItem[] };
export type OperationHistory = { userList: typeof operationItem[] };
