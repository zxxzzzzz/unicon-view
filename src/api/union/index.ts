import { defHttp } from '/@/utils/http/axios';
// import { getMenuListResultModel } from './model/menuModel';
import type { I1588Params } from './model/1588param';
import type { Topology, DevPort } from './model/topology';
import type { SyncParam } from './model/syncParam';
import type { Alarm } from './model/alarm';
import type { AllUserInfo, LoginHistory, OperationHistory, UserItem } from './model/user';
import type { SetPortParam } from './model/params';
import type { OperationSystem, DevParam, DevSyncParam, PortParam, AlarmParam } from './model/operationSystem';
export { AllUserInfo, SetPortParam, I1588Params };

export const getTopology = async (userName: string) => {
  const topologyData = await defHttp.post<Topology>({
    url: '/getTopography',
    params: { userName },
  });
  const portList = await defHttp.post<DevPort>({ url: '/GetDevPort', params: { userName } });
  // @ts-ignore
  const deviceList = topologyData.DeviceList.map((d) => {
    return {
      ...d,
      portList: portList
        .filter((p) => p.DeviceName === d.object)
        .map((p) => p.PortList)
        .flat(),
    };
  });
  return {
    deviceList: deviceList,
    // @ts-ignore
    linkList: topologyData.LinkList,
  };
};
export const getDevPort = async (userName: string) => {
  return defHttp.post<DevPort>({ url: '/GetDevPort', params: { userName } });
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
export const getUserLogin = async (userName: string) => {
  return defHttp.post<LoginHistory>({ url: '/GetUserLogin', params: { userName } });
};
export const getUserOperation = async (userName: string) => {
  return defHttp.post<OperationHistory>({ url: '/GetUserOperation', params: { userName } });
};
export const setUserInformation = async (params: { userList: UserItem[] }) => {
  return defHttp.post<AllUserInfo>({ url: '/SetUserAuthority', params });
};
export const getUserData = async (params: { username: string; msg: string }) => {
  return defHttp.post<PortParam & { username: string; devname: string }>({
    url: '/UserData',
    params,
  });
};
