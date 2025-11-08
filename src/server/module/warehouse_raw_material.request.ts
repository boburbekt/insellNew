import server from "../server";
export const group_warehouse_materials = (p:any) => {
    const alert_quantity = p.alert_quantity ? `alert_quantity=${p.alert_quantity}` : '';
    return server(`group_warehouse_materials?${alert_quantity}`)
}
export const get_warehouse_materials = (p: any) => {
    const queryParams = [
        p?.id ? `id=${p.id}` : '',
        p?.raw_material_id ? `raw_material_id=${p.raw_material_id}` : '',
        p?.search ? `search=${p.search}` : '',
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
    ].filter(Boolean).join('&');
    return server(`get_warehouse_materials?${queryParams}`)
}