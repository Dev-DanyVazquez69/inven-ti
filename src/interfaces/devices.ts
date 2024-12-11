export interface devicesProps {
    devices: {
        id: string,
        name: string,
        description: string,
        image: string,
        Collaborator: {
            name: string
        },
        Client: {
            name: string
        },
        Manufacturer: {
            name: string
        },
        Owner: {
            name: string
        },
        Sector: {
            name: string
        },
        TypeDevice: {
            name: string
        },
        registerNumber: number,
        createdAt: Date,
        updatedAt: Date
    }[]
}

export interface deviceProps {
    device: {
        id: string,
        name: string,
        description: string,
        image: string,
        Collaborator: {
            name: string
        },
        Client: {
            name: string
        },
        Manufacturer: {
            name: string
        },
        Owner: {
            name: string
        },
        Sector: {
            name: string
        },
        TypeDevice: {
            name: string
        },
        registerNumber: number,
        createdAt: Date,
        updatedAt: Date
    }
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
    typeDeviceId: number
}

export interface devicePostBody {
    name: string;
    description?: string | undefined | null,
    sectorId: string;
    collaboratorId: string | undefined;
    image: string | undefined | null,
    registerNumber: number | undefined | null,
    manufacturerId: number | undefined | null,
    ownerId: number | undefined | null,
    typeDeviceId: number
}

export type ItemsDevicePostRequest = keyof devicePostRequestApi

export type ItemsDevicePostBody = keyof devicePostBody
