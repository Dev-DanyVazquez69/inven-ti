import { apiRequest } from "./apiFetch";
import { bodySector, SectorProps } from "@/interfaces/sector";

//fetch de todos os setores
export const fetchSectors = async () => {
    return apiRequest<SectorProps>('/api/sector', { method: 'GET' });
};

//criação de um setor
export const createSector = async (bodyContent: bodySector) => {
    return apiRequest(`/api/sector`, {
        method: 'POST',
        body: JSON.stringify(bodyContent)
    })
};

//atualização de um setor
export const updateSector = async (bodyContent: bodySector, sectorId: string) => {
    return apiRequest(`/api/sector/${sectorId}`, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent)
    })
};

//exclusão de um setor
export const deleteSector = async (sectorId: string) => {
    return apiRequest(`api/sector/${sectorId}`, {
        method: 'DELETE'
    })
};
