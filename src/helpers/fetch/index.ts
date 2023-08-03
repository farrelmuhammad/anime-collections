export default function fetchData({
    url,
    method = "GET",
    host = process.env.REACT_APP_API_HOST,
    body,
}: {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE"; // Define the valid HTTP methods here
    host?: string;
    body?: BodyInit | null; // Define the type for the request body
}): Promise<any> {
    return fetch(`${host}${url}`, {
        method,
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body,
    }).then(async (response) => {
        const jsonResponse =
            response.status === 200 ? await response.json() : response;
        if (response.ok) return jsonResponse;

        throw new Error(JSON.stringify(jsonResponse));
    });
}
