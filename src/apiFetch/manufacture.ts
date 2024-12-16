import { apiRequest } from "./apiFetch";
import { manufacturerBody, manufacturersProps } from "@/interfaces/manufacture";

//fetch de todos as marcas
export const fetchManufacturers = async () => {
    return apiRequest<manufacturersProps>('/api/manufacturer', { method: 'GET' });
};

//criação de uma marca
export const createManufacturer = async (bodyContent: manufacturerBody) => {
    return apiRequest(`/api/manufacturer`, {
        method: 'POST',
        body: JSON.stringify(bodyContent)
    })
};

//atualização de um colaborador
export const updateManufcturer = async (bodyContent: manufacturerBody, manufacturerId: string) => {
    return apiRequest(`/api/manufacturer/${manufacturerId}`, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent)
    })
};

//exclusão do colaborador
export const deleteManufacturer = async (manufacturerId: string) => {
    return apiRequest(`api/manufacturer/${manufacturerId}`, {
        method: 'DELETE'
    })
};
