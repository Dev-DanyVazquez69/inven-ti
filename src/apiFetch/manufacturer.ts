import { apiRequest } from "./apiFetch";
import { ManufacturerBody, ManufacturersProps } from "@/interfaces/manufacturer";

//fetch de todos as marcas
export const fetchManufacturers = async () => {
    return apiRequest<ManufacturersProps>('/api/manufacturer', { method: 'GET' });
};

//criação de uma marca
export const createManufacturer = async (bodyContent: ManufacturerBody) => {
    return apiRequest(`/api/manufacturer`, {
        method: 'POST',
        body: JSON.stringify(bodyContent)
    })
};

//atualização de um colaborador
export const updateManufacturer = async (bodyContent: ManufacturerBody, manufacturerId: number) => {
    return apiRequest(`/api/manufacturer/${manufacturerId}`, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent)
    })
};

//exclusão do colaborador
export const deleteManufacturer = async (manufacturerId: number) => {
    return apiRequest(`api/manufacturer/${manufacturerId}`, {
        method: 'DELETE'
    })
};
