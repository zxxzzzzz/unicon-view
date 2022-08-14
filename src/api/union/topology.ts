import { defHttp } from '/@/utils/http/axios';
// import { getMenuListResultModel } from './model/menuModel';

export const getTopology = async (userName: string) => {
  return defHttp.post({ url: '/getTopography', params: { userName } });
};
