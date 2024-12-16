export interface SectorProps {
    sectors: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

export interface bodySector {
    name: string,
    coordinator?: string
}