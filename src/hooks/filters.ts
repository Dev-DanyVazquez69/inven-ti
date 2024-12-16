import { fetchFilters } from "@/apiFetch/filters";
import { useQuery } from "@tanstack/react-query";

export const useFilters = () => {

    return useQuery({
        queryKey: ["filters"],
        queryFn: () => fetchFilters(),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};
