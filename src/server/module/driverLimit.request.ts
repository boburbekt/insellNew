import server from "@/server/server";


export const get_driver_limits = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.id ? `id=${p.id}` : '',
        p.driver_id ? `driver_id=${p.driver_id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_driver_limits?${queryParams}`, "get",);
}

export const create_driver_limit = (data: any) => {
    return server(`create_driver_limit`, "post", data);
}
export const update_driver_limit = (data: any) => {
    return server(`update_driver_limit`, "put", data);
}
