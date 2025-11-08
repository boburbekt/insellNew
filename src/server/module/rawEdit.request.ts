import server from "../server";

export const get_edited_warehouse_raw_material_quantity = (p: any) => {
    const queryParams = [
        p?.id ? `id=${p.id}` : '',
        p?.warehouse_raw_material_id ? `warehouse_raw_material_id=${p.warehouse_raw_material_id}` : '',
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
    ].filter(Boolean).join('&');
    return server(`get_edited_warehouse_raw_material_quantity?${queryParams}`)
}
export const create_edited_warehouse_raw_material_quantity = (data: any) => {
    return server(`create_edited_warehouse_raw_material_quantity`, "post", data);
}