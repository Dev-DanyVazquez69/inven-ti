import { createDevice, fetchDevice, fetchDevices } from "@/api/device";
import { devicePostBody } from "@/interfaces/devices";
import { TypeFilter } from "@/interfaces/filters";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useDevices = (filters: TypeFilter) => {

    return useQuery({
        queryKey: ["devices"],
        queryFn: () => fetchDevices(filters),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useDevice = (deviceId: string) => {

    return useQuery({
        queryKey: ["device"],
        queryFn: () => fetchDevice(deviceId),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};


export const useCreateDevice = (bodyContent: devicePostBody) => {

    return useMutation({
        mutationKey: ["devices"],
        mutationFn: () => createDevice(bodyContent),
    });
};
