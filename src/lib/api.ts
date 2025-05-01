
export interface ApiResponse {
    success: boolean;
    message: string;
    data: any;
}

export async function apiGet(url: string): Promise<ApiResponse> {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return await res.json();
}

export async function apiPost(url: string, data: Record<string, unknown>): Promise<ApiResponse> {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error('Failed to post data');
    }

    return await res.json();
}
