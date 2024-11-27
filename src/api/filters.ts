import { PropGetFilters } from "@/interfaces/filters";

export const fetchFilters = async () => {

    const response = await fetch('/api/filters', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch devices: ${response.status}`);
    }

    const data: Promise<PropGetFilters> = response.json()
    return data;
};