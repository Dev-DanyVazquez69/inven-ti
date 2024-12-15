import { devicePostBody, deviceProps, devicesProps } from "@/interfaces/devices";
import { TypeFilterDevice } from "@/interfaces/filters";
import handleFetchErrors from "./error";

export const fetchDevices = async (filters: TypeFilterDevice) => {

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
    if (filters.typeDeviceId)
        url.searchParams.append("typeDevice", String(filters.typeDeviceId))

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });

    return handleFetchErrors<devicesProps>(response)
};

export const fetchDevice = async (deviceId: string) => {

    const response = await fetch(`/api/device/${deviceId}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });

    return handleFetchErrors<deviceProps>(response)
};

export const createDevice = async (bodyContent: devicePostBody) => {

    const response = await fetch(`/api/device`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bodyContent)
    });

    return handleFetchErrors<deviceProps>(response)
};
