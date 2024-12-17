import { createManufacturer, deleteManufacturer, fetchManufacturers, updateManufacturer } from "@/apiFetch/manufacturer";
import { ManufacturerBody } from "@/interfaces/manufacturer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchManufacturers = () => {

    return useQuery({
        queryKey: ["manufacturers"],
        queryFn: () => fetchManufacturers(),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useCreateManufacturer = (bodyContent: ManufacturerBody) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["ManufacturerPost"],
        mutationFn: () => createManufacturer(bodyContent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['manufactures'] })
        },
    });
};

export const useUpdateManufacturer = (bodyContent: ManufacturerBody, manufacturerId: number) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["ManufacturerUpdate", manufacturerId],
        mutationFn: () => updateManufacturer(bodyContent, manufacturerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['manufacturers'] })
        },
    });
};

export const useDeleteManufacturer = (manufacturerId: number) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["manufacturerDelete"],
        mutationFn: () => deleteManufacturer(manufacturerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['manufacturers'] })
        },
    });
};