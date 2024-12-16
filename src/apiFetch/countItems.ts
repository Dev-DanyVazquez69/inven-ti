import { countItemsProps } from "@/interfaces/countItems";
import { apiRequest } from "./apiFetch";

export const fetchcountItems = async () => {
    return apiRequest<countItemsProps>('/api/countItems', {
        method: 'GET'
    })
};