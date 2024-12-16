import { fetchcountItems } from "@/apiFetch/countItems";
import { useQuery } from "@tanstack/react-query";

export const useFetchcountItems = () => {

    return useQuery({
        queryKey: ["countItems"],
        queryFn: () => fetchcountItems(),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};