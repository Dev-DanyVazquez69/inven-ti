import { createCollaborator, deleteCollaborator, fetchCollaborator, fetchCollaborators, updateCollaborator } from "@/apiFetch/collaborator";
import { bodyPostCollaborator } from "@/interfaces/collaborator";
import { TypeFilterCollaborator } from "@/interfaces/filters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCollaborators = (filters: TypeFilterCollaborator) => {

    return useQuery({
        queryKey: ["collaborators"],
        queryFn: () => fetchCollaborators(filters),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useCollaborator = (collaboratorId: string) => {

    return useQuery({
        queryKey: ["collaborator", collaboratorId],
        queryFn: () => fetchCollaborator(collaboratorId),
    });
};

export const useCreateCollaborator = (bodyContent: bodyPostCollaborator) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["collaboratorsPost"],
        mutationFn: () => createCollaborator(bodyContent),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborators'] })
        },
    });
};

export const useUpdateCollaborator = (bodyContent: bodyPostCollaborator, collaboratorId: string) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["collaboratorsUpdate", collaboratorId],
        mutationFn: () => updateCollaborator(bodyContent, collaboratorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborator', collaboratorId] })
        },
    });
};

export const useDeleteCollaborator = (collaboratorId: string) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["collaboratorsDelete"],
        mutationFn: () => deleteCollaborator(collaboratorId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['collaborators'] })
        },
    });
};