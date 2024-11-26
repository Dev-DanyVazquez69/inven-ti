import { deviceProps } from "@/interfaces/devices";
import { useQuery } from "@tanstack/react-query";

const fetchPets = async () => {
    const response = await fetch("/api/device");
    if (!response.ok) {
        throw new Error("Failed to fetch devices");
    }

    const data: Promise<deviceProps> = response.json()
    return data;
};

export const usePets = () => {
    return useQuery({
        queryKey: ["devices"],
        queryFn: fetchPets,
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos
        
    });
};
