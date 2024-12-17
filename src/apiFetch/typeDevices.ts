import { TypeDeviceBody, TypesDeviceProps } from "@/interfaces/typeDevice";
import { apiRequest } from "./apiFetch";

//fetch de todos os Tipos de dispositivos
export const fetchTypeDevice = async () => {
    return apiRequest<TypesDeviceProps>('/api/typeDevice', { method: 'GET' });
};

//criação de um tipo de dispositivo
export const createTypeDevice = async (bodyContent: TypeDeviceBody) => {
    return apiRequest(`/api/typeDevice`, {
        method: 'POST',
        body: JSON.stringify(bodyContent)
    })
};

//atualização de um tipo de dispositivo
export const updateTypeDevice = async (bodyContent: TypeDeviceBody, typeDeviceId: number) => {
    return apiRequest(`/api/typeDevice/${typeDeviceId}`, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent)
    })
};

//exclusão de um tipo de dispostivo
export const deleteTypeDevice = async (typeDeviceId: number) => {
    return apiRequest(`api/typeDevice/${typeDeviceId}`, {
        method: 'DELETE'
    })
};
