import server from "../server";
export const get_kassa = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.id ? `id=${p.id}` : '',
        p.connected_user_id ? `connected_user_id=${p.connected_user_id}` : '',
        p.from_drivers ? `from_drivers=${p.from_drivers}` : '',
    ].filter(Boolean).join('&');
    return server(`get_kassa?${queryParams}`);
}
export const get_drivers_kassa = () => {

    return server(`get_drivers_kassa`);
}
export const create_kassa = (data: any) => {
    return server(`create_kassa`, "post", data);
}
export const update_kassa = (data: any) => {
    return server(`update_kassa`, "put", data);
}