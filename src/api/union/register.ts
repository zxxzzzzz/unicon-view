import { defHttp } from '/@/utils/http/axios';
// import { getMenuListResultModel } from './model/menuModel';

/**
 * @description: Get user menu based on id
 */

interface RegisterParams {
  username: string;
  password: string;
  position: string;
}

export const newUser = (params: RegisterParams) => {
  return defHttp.post({ url: '/newUser', params });
};
