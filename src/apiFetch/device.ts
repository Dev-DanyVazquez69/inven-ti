import { bodyDevicePost, bodyDeviceUpdate, deviceProps, devicesProps } from "@/interfaces/devices";
import { TypeFilterDevice } from "@/interfaces/filters";
import { apiRequest } from "./apiFetch";

// Consulta todos os dispositivos com filtros
export const fetchDevices = async (filters: TypeFilterDevice) => {
  return apiRequest<devicesProps>('/api/device', { method: 'GET' }, {
    collaborator: filters.collaboratorId,
    manufacturer: filters.manufacturerId,
    owner: filters.ownerId,
    search: filters.search,
    sector: filters.sectorId,
    typeDevice: filters.typeDeviceId,
  });
};

// Consulta um dispositivo específico
export const fetchDevice = async (deviceId: string) => {
  return apiRequest<deviceProps>(`/api/device/${deviceId}`, { method: 'GET' });
};

// Criação de um dispositivo
export const createDevice = async (bodyContent: bodyDevicePost) => {
  return apiRequest<deviceProps>('/api/device', {
    method: 'POST',
    body: JSON.stringify(bodyContent),
  });
};

// Atualização de dados de um dispositivo
export const updateDevice = async (bodyContent: bodyDeviceUpdate, deviceId: string) => {
  return apiRequest<deviceProps>(`/api/device/${deviceId}`, {
    method: 'PATCH',
    body: JSON.stringify(bodyContent),
  });
};

// Deleção de um dispositivo
export const deleteDevice = async (deviceId: string) => {
  return apiRequest<void>(`/api/device/${deviceId}`, { method: 'DELETE' });
};
