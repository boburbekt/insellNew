import server from "@/server/server";

export const get_services = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.status ? `status=${p.status}` : 'status=true',
        p.search ? `search=${p.search}` : '',
    ].filter(Boolean).join('&');
    return server(`get_services?${queryParams}`, 'get');
}
export const create_service = (data: any) => {
    return server(`create_service`, "post", data);
}
export const update_service = (data: any) => {
    return server(`update_service`, "put", data);
}
// raw_material
export const get_service_raw_materials = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.service_id ? `service_id=${p.service_id}` : '',
        p.user_id ? `user_id=${p.user_id}` : '',
        p.raw_material_id ? `raw_material_id=${p.raw_material_id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_service_raw_materials?${queryParams}`, 'get');
}
export const get_spented_materials = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.raw_material_id ? `raw_material_id=${p.raw_material_id}` : '',
        p.order_id ? `order_id=${p.order_id}` : '',
        p.id ? `id=${p.id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_spented_materials?${queryParams}`, 'get');
}
export const create_service_raw_material = (data: any) => {
    return server(`create_service_raw_material`, "post", data);
}
export const update_service_raw_material = (data: any) => {
    return server(`update_service_raw_material`, "put", data);
}