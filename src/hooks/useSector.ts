import { createSector, deleteSector, fetchSectors, updateSector } from "@/apiFetch/sector";
import { bodySector } from "@/interfaces/sector";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchSectors = () => {

    return useQuery({
        queryKey: ["sectors"],
        queryFn: () => fetchSectors(),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useCreateSector = (bodyContent: bodySector) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["SectorPost"],
        mutationFn: () => createSector(bodyContent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sectors'] })
        },
    });
};

export const useUpdateSector = (bodyContent: bodySector, SectorId: string) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["SectorUpdate", SectorId],
        mutationFn: () => updateSector(bodyContent, SectorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sectors'] })
        },
    });
};

export const useDeleteSector = (SectorId: string) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["SectorDelete"],
        mutationFn: () => deleteSector(SectorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sectors'] })
        },
    });
};