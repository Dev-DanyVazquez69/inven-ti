import { bodyPostCollaborator, bodyUpdateCollaborator, CollaboratorProps, CollaboratorsProps } from "@/interfaces/collaborator";
import { TypeFilterDevice } from "@/interfaces/filters";
import handleFetchErrors from "./error";

//fetch de todos os colaboradores
export const fetchCollaborators = async (filters: TypeFilterDevice) => {

    const patch = "/api/collaborator"
    const url = new URL(patch, window.location.origin)

    if (filters.search)
        url.searchParams.append("search", filters.search)
    if (filters.sectorId)
        url.searchParams.append("sector", filters.sectorId)

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });

    return handleFetchErrors<CollaboratorsProps>(response)
};

//fetch de um colaborador especifico
export const fetchCollaborator = async (collaboratorId: string) => {

    const response = await fetch(`/api/collaborator/${collaboratorId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });

    return handleFetchErrors<CollaboratorProps>(response)
};
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
export const UpdateCollaborator = async (bodyContent: bodyUpdateCollaborator, collaboratorId: string) => {

    const response = await fetch(`/api/collaborator/${collaboratorId}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyContent)
    });

    return handleFetchErrors<CollaboratorProps>(response)
};
//exclusão do colaborador
export const deleteCollaborator = async (collaboratorId: string) => {

    const response = await fetch(`/api/collaborator/${collaboratorId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    });

    return handleFetchErrors(response)
};
