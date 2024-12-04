import { fetchDevice, fetchDevices } from "@/api/device";
import { TypeFilter } from "@/interfaces/filters";
import { useQuery } from "@tanstack/react-query";

export const useDevices = (filters: TypeFilter) => {

    return useQuery({
        queryKey: ["devices"],
        queryFn: () => fetchDevices(filters),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

export const useDevice = (deviceId: string) => {

    return useQuery({
        queryKey: ["devices"],
        queryFn: () => fetchDevice(deviceId),
        staleTime: 1000 * 60 * 5, // Cache válido por 5 minutos

    });
};

