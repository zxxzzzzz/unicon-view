import { defHttp } from '/@/utils/http/axios';
// import { getMenuListResultModel } from './model/menuModel';
import type { I1588Params } from './model/1588param';
import type { Topology } from './model/topology';
import type { SyncParam } from './model/syncParam';
import type { Alarm } from './model/alarm';
import type { AllUserInfo, UserItem } from './model/user';
import type { SetPortParam } from './model/params';
import type {
  OperationSystem,
  DevParam,
  DevSyncParam,
  PortParam,
  AlarmParam,
} from './model/operationSystem';
export { AllUserInfo };

export const getTopology = async (userName: string) => {
  return defHttp.post<Topology>({ url: '/getTopography', params: { userName } });
};
export const setPortParam = async (params: SetPortParam) => {
  return defHttp.post<Topology>({ url: '/SetPortParam', params });
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
export const getOperationsSystem = async (userName: string) => {
  return defHttp.post<OperationSystem>({ url: '/OperationsSystem', params: { userName } });
};
export const getDevParam = async (userName: string) => {
  return defHttp.post<DevParam>({ url: '/DevParam', params: { userName } });
};
export const getDevSyncParam = async (userName: string) => {
  return defHttp.post<DevSyncParam>({ url: '/DevSyncParam', params: { userName } });
};
export const getPortParam = async (userName: string) => {
  return defHttp.post<PortParam>({ url: '/PortParam', params: { userName } });
};
export const getAlarmParam = async (userName: string) => {
  return defHttp.post<AlarmParam>({ url: '/AlarmParam', params: { userName } });
};
export const getUserInformation = async (userName: string) => {
  return defHttp.post<AllUserInfo>({ url: '/GetUserInformation', params: { userName } });
};
export const setUserInformation = async (params: { userList: UserItem[] }) => {
  return defHttp.post<AllUserInfo>({ url: '/SetUserAuthority', params });
};
