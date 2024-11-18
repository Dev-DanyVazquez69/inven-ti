export interface deviceProps {
    id: number;
    name: string;
    description?: string;
    sector: {
        id: number;
        name: string;
    };
    owner: string;
    registerNumber?: number;
    manufacturer: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface deviceRequestApi {
    name: string;
    description?: string | undefined | null,
    sectorId: string;
    collaboratorId: string;
    clientId: string,
    image: string | undefined | null,
    registerNumber: number | undefined | null,
    manufacturer: string | undefined | null,
}