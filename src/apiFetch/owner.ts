import { OwnerBody, OwnersProps } from "@/interfaces/owner";
import { apiRequest } from "./apiFetch";

//fetch de todos os Propietários
export const fetchOwners = async () => {
    return apiRequest<OwnersProps>('/api/owner', { method: 'GET' });
};

//criação de um Propietário
export const createOwner = async (bodyContent: OwnerBody) => {
    return apiRequest(`/api/owner`, {
        method: 'POST',
        body: JSON.stringify(bodyContent)
    })
};

//atualização de um propietário
export const updateManufcturer = async (bodyContent: OwnerBody, ownerId: string) => {
    return apiRequest(`/api/owner/${ownerId}`, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent)
    })
};

//exclusão do propietário
export const deleteOwner = async (ownerId: string) => {
    return apiRequest(`api/owner/${ownerId}`, {
        method: 'DELETE'
    })
};
