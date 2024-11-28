import { fetchDevices } from "@/api/device";
import { TypeFilter } from "@/interfaces/filters";
import { useQuery } from "@tanstack/react-query";

export const useDevices = (filters?: TypeFilter, deviceId?: string) => {

    return useQuery({
        queryKey: ["devices"],
        queryFn: () => fetchDevices(filters, deviceId),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};
