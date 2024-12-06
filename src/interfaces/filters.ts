export type TypeFilter = {
    search?: string;
    collaboratorId?: string;
    sectorId?: string;
    ownerId?: number;
    manufacturerId?: number;

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

export type ItemsFilters = keyof TypeFilter 
