import { defHttp } from '/@/utils/http/axios';
// import { getMenuListResultModel } from './model/menuModel';
import type { I1588Params } from './model/1588param';
import type { Topology, DevPort } from './model/topology';
import type { SyncParam } from './model/syncParam';
import type { Alarm } from './model/alarm';
import type { AllUserInfo, LoginHistory, OperationHistory, UserItem } from './model/user';
import type { ComBoxItem } from './model/comBox';
import type { SetPortParam } from './model/params';
import type { OperationSystem, DevParam, DevSyncParam, PortParam, AlarmParam } from './model/operationSystem';
export { AllUserInfo, SetPortParam, I1588Params };
import { UploadFileParams } from '/#/axios';

export const getTopology = async () => {
  const topologyData = await defHttp.post<Topology>({
    url: '/GetTopography',
  });
  const portList = await defHttp.post<{ devPortList: DevPort }>({ url: '/GetDevPort' });
  const deviceList = topologyData.deviceList.map((d) => {
    return {
      ...d,
      portList: (portList?.devPortList || [])
        .filter((p) => p.deviceName === d.object)
        .map((p) => p.portList)
        .flat(),
    };
  });
  return {
    deviceList: deviceList,
    linkList: topologyData.linkList
      .map((l) => {
        const linkTypeList = (l.linkType || '').split('&');
        if (linkTypeList.length <= 1) {
          return l;
        }
        return linkTypeList.map((type) => {
          return { ...l, linkType: type };
        });
      })
      .flat(),
  };
};
export const getTopology1 = async () => {
  const topologyData = await defHttp.post<Topology>({
    url: '/GetTopography1',
  });
  const portList = await defHttp.post<{ devPortList: DevPort }>({ url: '/GetDevPort' });
  const deviceList = topologyData.deviceList.map((d) => {
    return {
      ...d,
      portList: (portList?.devPortList || [])
        .filter((p) => p.deviceName === d.object)
        .map((p) => p.portList)
        .flat(),
    };
  });
  return {
    deviceList: deviceList,
    linkList: topologyData.linkList
      .map((l) => {
        const linkTypeList = (l.linkType || '').split('&');
        if (linkTypeList.length <= 1) {
          return l;
        }
        return linkTypeList.map((type) => {
          return { ...l, linkType: type };
        });
      })
      .flat(),
  };
};
export const uploadXlsxFile = (params: UploadFileParams) => {
  return defHttp.uploadFile(
    {
      url: '/uploadXlsxFile',
    },
    params,
  );
};
export const getDevPort = async () => {
  return defHttp.post<{ devPortList: DevPort }>({ url: '/GetDevPort' });
};
export const setPortParam = async (params: any) => {
  return defHttp.post<Topology>({ url: '/SetPortParam', params });
};
export const setSyncEParam = async (params: any) => {
  return defHttp.post<Topology>({ url: '/SetSyncEParam', params });
};
export const getPort1588Param = async (userName: string) => {
  return defHttp.post<I1588Params>({ url: '/Port1588Param', params: { userName } });
};
export const getSyncParam = async (userName: string) => {
  return defHttp.post<SyncParam>({ url: '/PortSyncParam', params: { userName } });
};
export const getHomeAlarm = async () => {
  return defHttp.post<Alarm>({ url: '/Alarm' });
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
export const getUserData = async (params: any) => {
  return defHttp.post<PortParam & { username: string; devname: string }>({
    url: '/UserData',
    params,
  });
};
export const getComBoxInfor = async (params: any) => {
  return defHttp.post<{ devList: ComBoxItem[] }>({
    url: '/GetComBoxInfor',
    params,
  });
};
export const getSystemData = async (params?: any) => {
  return defHttp.post<PortParam & OperationSystem & DevParam & DevSyncParam & AlarmParam>({
    url: '/GetSystemData',
    params,
  });
};
export const setTopography = async (params?: any) => {
  return defHttp.post<any>({
    url: '/SetTopography',
    params,
  });
};
export const getCsvFile = async (params?: { startTime: string; endTime: string; dataType: string }) => {
  return defHttp.post<any>({
    url: '/GetCsvFile',
    params,
  });
};
