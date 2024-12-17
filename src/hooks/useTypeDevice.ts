import { createTypeDevice, deleteTypeDevice, fetchTypeDevice, updateTypeDevice } from "@/apiFetch/typeDevices";
import { TypeDeviceBody } from "@/interfaces/typeDevice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchTypeDevice = () => {

    return useQuery({
        queryKey: ["typesDevices"],
        queryFn: () => fetchTypeDevice(),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useCreateTypeDevice = (bodyContent: TypeDeviceBody) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["TypeDevicePost"],
        mutationFn: () => createTypeDevice(bodyContent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['typesDevices'] })
        },
    });
};

export const useUpdateTypeDevice = (bodyContent: TypeDeviceBody, typeDeviceId: number) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["typeDeviceUpdate", typeDeviceId],
        mutationFn: () => updateTypeDevice(bodyContent, typeDeviceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['typesDevices'] })
        },
    });
};

export const useDeleteTypeDevice = (typeDeviceId: number) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["typeDeviceDelete"],
        mutationFn: () => deleteTypeDevice(typeDeviceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['typesDevices'] })
        },
    });
};