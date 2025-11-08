import server from "../server";
export const xizmatlar = (p: any): Promise<any> => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.status ? `status=${p.status}` : 'status=true',
    ]
        .filter(Boolean)
        .join('&');
    return server<any>(`get_services?${queryParams}`, "get",);
}