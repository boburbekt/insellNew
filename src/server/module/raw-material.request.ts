import server from "@/server/server";

export const get_raw_materials = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.service_id ? `service_id=${p.service_id}` : '',
        p.user_id ? `user_id=${p.user_id}` : '',
        p.name ? `name=${p.name}` : '',
    ].filter(Boolean).join('&');
    return server(`get_raw_materials?${queryParams}`, 'get');
}
export const create_raw_material = (data: any) => {
    return server(`create_raw_material`, "post", data);
}
export const update_raw_material = (data: any) => {
    return server(`update_raw_material`, "put", data);
}