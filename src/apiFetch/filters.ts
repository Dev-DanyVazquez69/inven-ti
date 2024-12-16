import { PropGetFilters } from "@/interfaces/filters";
import { apiRequest } from "./apiFetch";

export const fetchFilters = async () => {
    return apiRequest<PropGetFilters>('/api/filters', {
        method: 'GET'
    })
};