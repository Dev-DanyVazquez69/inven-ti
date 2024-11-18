export interface deviceProps {
    id: number;
    name: string;
    description?: string;
    sector: {
        id: number;
        name: string;
    };
    ownerId: number;
    registerNumber?: number;
    manufacturerId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface devicePostRequestApi {
    name: string;
    description?: string | undefined | null,
    sectorId: string;
    collaboratorId: string;
    clientId: string,
    image: string | undefined | null,
    registerNumber: number | undefined | null,
    manufacturerId: number | undefined | null,
    ownerId: number | undefined | null,
}