import server from "@/server/server";

export const create_contract = (data: any) => {
    return server("create_contract", "post", data);
}
export const update_contract = (data: any) => {
    return server(`update_contract`, "put", data);
}
export const get_contracts = (p: any) => {
    const queryParams = [
        `page=${p.cursor || 1}`,
        `limit=${p.size || 25}`,
        p.user_id ? `user_id=${p.user_id}` : '',
        p.service_id ? `service_id=${p.service_id}` : '',
        p.id ? `id=${p.id}` : '',
    ].filter(Boolean).join('&');
    return server<any>(`get_contracts?${queryParams}`, "get",);
}