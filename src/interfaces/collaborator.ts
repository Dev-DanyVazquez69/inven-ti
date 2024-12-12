//interface do body de criação do colaborador
export interface bodyPostCollaborator {
    name: string,
    imageProfile?: string | null
    sectorId?: string

}
//interface do body de atualização do colaborador
export interface bodyUpdateCollaborator {
    name: string | null,
    imageProfile?: string | null
    sectorId?: string | null

}

export interface collaboratorPostRequestApi {
    name: string;
    imageProfile?: string | null;
    sectorId: string;
    clientId: string,
}

//objeto retornado no fetch de todos os colaboradores 
export interface CollaboratorsProps {
    collaborators: {
        id: string,
        name: string,
        imageProfile: string | null,
        Device: {
            id: string,
            name: string
        }[] | [],
        sector: {
            id: string,
            name: string
        }
    }[]
}
//objeto retornado no fetch de um colaborador
export interface CollaboratorProps {
    collaborator: {
        id: string,
        name: string,
        imageProfile: string | null,
        Device: {
            id: string,
            name: string
        } [] | [],
        sector: {
            id: string,
            name: string
        }
    }
}

//chaves do objeto body de criação de um colaborador
export type ItemsCollaboratorPostRequest = keyof collaboratorPostRequestApi

export type ItemsCollaboratorPostBody = keyof bodyPostCollaborator