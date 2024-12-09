import { devicePostBody, deviceProps, devicesProps } from "@/interfaces/devices";
import { TypeFilter } from "@/interfaces/filters";

export const fetchDevices = async (filters: TypeFilter) => {

    const patch = "/api/device"
    const url = new URL(patch, window.location.origin)

    if (filters.collaboratorId)
        url.searchParams.append("collaborator", filters.collaboratorId)
    if (filters.manufacturerId)
        url.searchParams.append("manufacturer", String(filters.manufacturerId))
    if (filters.ownerId)
        url.searchParams.append("owner", String(filters.ownerId))
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
    if (!response.ok) {
        throw new Error(`Failed to fetch devices: ${response.status}`);
    }

    const data: Promise<devicesProps> = response.json()
    return data;
};


export const fetchDevice = async (deviceId: string) => {

    const response = await fetch(`/api/device/${deviceId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch devices: ${response.status}`);
    }

    const data: Promise<deviceProps> = response.json()
    return data;
};

export const createDevice = async (bodyContent: devicePostBody) => {

    const response = await fetch(`/api/device`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyContent)
    });
    if (!response.ok) {
        throw new Error(`Failed to create device: ${response.status}`);
    }

    const data: Promise<deviceProps> = response.json()
    return data;
};
