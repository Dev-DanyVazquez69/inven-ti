import { PropGetFilters } from "@/interfaces/filters";
import handleFetchErrors from "./error";

export const fetchFilters = async () => {

    const response = await fetch('/api/filters', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });
 
    return handleFetchErrors<PropGetFilters>(response)
};