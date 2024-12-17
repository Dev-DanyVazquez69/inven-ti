import { createOwner, deleteOwner, fetchOwners, updateOwner } from "@/apiFetch/owner";
import { OwnerBody } from "@/interfaces/owner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchOwners = () => {

    return useQuery({
        queryKey: ["owners"],
        queryFn: () => fetchOwners(),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useCreateOwner = (bodyContent: OwnerBody) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["OwnerPost"],
        mutationFn: () => createOwner(bodyContent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owners'] })
        },
    });
};

export const useUpdateOwner = (bodyContent: OwnerBody, OwnerId: number) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["OwnerUpdate", OwnerId],
        mutationFn: () => updateOwner(bodyContent, OwnerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owners'] })
        },
    });
};

export const useDeleteOwner = (OwnerId: number) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["OwnerDelete"],
        mutationFn: () => deleteOwner(OwnerId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['owners'] })
        },
    });
};