import server from "../server";
export const create_place = (data: any) => {
    return server(`create_place`, 'post', data);
}
export const get_places = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.id ? `id=${p.id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_places?${queryParams}`);
}
export const update_place = (data: any) => {
    return server(`update_place`, 'put', data);
}
export const delete_tokcha = (id: number) => {
    return server(`delete_tokcha?id=${id}`, 'delete');
}
export const get_tokcha_orders = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.order_id ? `order_id=${p.order_id}` : '',
        p.tokcha_name ? `tokcha_name=${p.tokcha_name}` : '',
    ].filter(Boolean).join('&');
    return server(`get_tokcha_orders?${queryParams}`);
}