const a = {
  AuthList: ['操作员', '普通用户', '重庆'],
  UserList: [
    {
      username: 'zxxz',
      password: 'qweqweqwe',
      authority: '操作员',
    },
    {
      username: 'zxxzzzz',
      password: 'qweqweqweqweqwe',
      authority: '操作员',
    },
    {
      username: 'wc',
      password: 'zxcasdqwe',
      authority: '操作员',
    },
  ],
};
const userItem = {
  username: 'wc',
  password: 'zxcasdqwe',
  authority: '操作员',
};

export type AllUserInfo = typeof a;
export type UserItem = typeof userItem;
