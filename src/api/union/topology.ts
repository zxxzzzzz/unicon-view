import { defHttp } from '/@/utils/http/axios';
// import { getMenuListResultModel } from './model/menuModel';
import { I1588Params } from './model/1588param';
import { Topology } from './model/topology';
import { SyncParam } from './model/syncParam';
import { Alarm } from './model/alarm';

export const getTopology = async (userName: string) => {
  return defHttp.post<Topology>({ url: '/getTopography', params: { userName } });
};
export const getPort1588Param = async (userName: string) => {
  return defHttp.post<I1588Params>({ url: '/Port1588Param', params: { userName } });
};
export const getSyncParam = async (userName: string) => {
  return defHttp.post<SyncParam>({ url: '/PortSyncParam', params: { userName } });
};
export const getHomeAlarm = async (userName: string) => {
  return defHttp.post<Alarm>({ url: '/Alarm', params: { userName } });
};
