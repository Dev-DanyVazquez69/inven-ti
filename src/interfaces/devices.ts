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