import handleFetchErrors from "./error";

export const apiRequest = async <T>(
    endpoint: string,
    options: RequestInit = {},
    queryParams?: Record<string, string | number | null | undefined>
): Promise<T> => {

    const url = new URL(endpoint, window.location.origin);
    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            console.log(key, value)
            if (value !== undefined) url.searchParams.append(key, String(value));
        });
    }

    const response = await fetch(url.toString(), {
        headers: { 'content-type': 'application/json', ...options.headers },
        ...options,
    });

    return handleFetchErrors<T>(response);
};
