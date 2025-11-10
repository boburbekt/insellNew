import server from "../server";
export const get_transfers = async (p: any) => {
    const queryParams = [
        p.id ? `id=${p.id}` : '',
        p.created_user_id ? `created_user_id=${p.created_user_id}` : '',
        p.from_kassa_id ? `from_kassa_id=${p.from_kassa_id}` : '',
        p.confirmed_user_id ? `confirmed_user_id=${p.confirmed_user_id}` : '',
        p.to_kassa_id ? `to_kassa_id=${p.to_kassa_id}` : '',
        p.type ? `type=${p.type}` : '',
        p.status ? `status=${p.status}` : '',
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
    ].filter(Boolean).join('&');
    return await server(`get_transfers?${queryParams}`,);
}
export const confirm_transfer = async (data: any) => {
    return await server(`confirm_transfer`, 'put', data);
}
export const create_transfer = async (data: any) => {
    return await server(`create_transfer`, 'post', data);
}
export const delete_transfer = async (id: number) => {
    return await server(`delete_transfer?id=${id}`, 'delete');
}
export const take_money_from_driver_kassa = async (data: any) => {
    return await server(`take_money_from_driver_kassa`, 'post', data);
}