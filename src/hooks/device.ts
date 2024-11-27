import { fetchPets } from "@/api/device";
import { TypeFilter } from "@/interfaces/filters";
import { useQuery } from "@tanstack/react-query";

export const usePets = (filters: TypeFilter) => {

    return useQuery({
        queryKey: ["devices"],
        queryFn: () => fetchPets(filters),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};
