export type TypeFilterDevice = {
    search?: string;
    collaboratorId?: string;
    sectorId?: string;
    ownerId?: number;
    manufacturerId?: number;
    typeDeviceId?: number

}

export type TypeFilterCollaborator = {
    search?: string;
    sectorId?: string;
}

export interface PropGetFilters {
    filters: {
        collaborators:
        {
            id: string,
            name: string
        }[] | [],
        sectors:
        {
            id: string,
            name: string
        }[] | [],
        owners: {
            id: number,
            name: string
        }[] | [],
        manufactures: {
            id: number,
            name: string
        }[] | [],
        typeDevices: {
            id: number,
            name: string
        }[] | []

    }
}

export type ItemsFiltersDevice = keyof TypeFilterDevice
export type ItemsFiltersCollaborator = keyof TypeFilterCollaborator