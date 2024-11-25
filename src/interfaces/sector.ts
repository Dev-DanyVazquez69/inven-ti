export interface sector {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface bodyPostSector {
    name: string,
    coordinator?: string 
}