import { bodyPostCollaborator, bodyUpdateCollaborator, CollaboratorProps, CollaboratorsProps } from "@/interfaces/collaborator";
import { TypeFilterDevice } from "@/interfaces/filters";
import { apiRequest } from "./apiFetch";

//fetch de todos os colaboradores
export const fetchCollaborators = async (filters: TypeFilterDevice) => {
    return apiRequest<CollaboratorsProps>('/api/collaborator', { method: 'GET' }, {
        search: filters.search,
        sector: filters.sectorId,
    });
};

//fetch de um colaborador especifico
export const fetchCollaborator = async (collaboratorId: string) => {
    return apiRequest<CollaboratorProps>(`/api/collaborator/${collaboratorId}`, { method: 'GET' })
}
//criação de um usuário
export const createCollaborator = async (bodyContent: bodyPostCollaborator) => {

    const response = await fetch(`/api/collaborator`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyContent)
    });
    if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.errorFormatBody) {
            throw new Error("Erro de validação do body")
        }
        throw new Error(errorResponse.erro || "Erro desconhecido ao criar o dispositivo");
    }

    const data: Promise<CollaboratorProps> = response.json()
    return data;
};

//atualização de um colaborador
export const updateCollaborator = async (bodyContent: bodyUpdateCollaborator, collaboratorId: string) => {
    return apiRequest<CollaboratorProps>(`/api/collaborator/${collaboratorId}`, {
        method: 'PATCH',
        body: JSON.stringify(bodyContent),
    });
};


//exclusão do colaborador
export const deleteCollaborator = async (collaboratorId: string) => {
    return apiRequest(`api/collaborator/${collaboratorId}`, { method: 'DELETE' })
};
