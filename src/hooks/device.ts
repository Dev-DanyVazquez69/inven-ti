import { createDevice, DeleteDevice, fetchDevice, fetchDevices, updateDevice } from "@/api/device";
import { bodyDevicePost, bodyDeviceUpdate } from "@/interfaces/devices";
import { TypeFilterDevice } from "@/interfaces/filters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useDevices = (filters: TypeFilterDevice) => {

    return useQuery({
        queryKey: ["devices"],
        queryFn: () => fetchDevices(filters),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useDevice = (deviceId: string) => {

    return useQuery({
        queryKey: ["device", deviceId],
        queryFn: () => fetchDevice(deviceId),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useCreateDevice = (bodyContent: bodyDevicePost) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["createDevice"],
        mutationFn: () => createDevice(bodyContent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devices'] })
        },
    });
};

export const useUpdateDevice = (bodyContent: bodyDeviceUpdate, deviceId: string) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["UpdateDevice"],
        mutationFn: () => updateDevice(bodyContent, deviceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['device', deviceId] })
        },
    });
};

export const useDeleteDevice = (deviceId: string) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["deletedevice"],
        mutationFn: () => DeleteDevice(deviceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['devices'] })
        },
    });
};
