import server from "../server";
export const get_recalls = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.id ? `id=${p.id}` : '',
        p.status ? `status=${p.status}` : '',
        p.customer_id ? `customer_id=${p.customer_id}` : '',
        p.order_id ? `order_id=${p.order_id}` : '',
        p.user_id ? `user_id=${p.user_id}` : '',
        p.from_date ? `from_date=${p.from_date}` : "",
        p.to_date ? `to_date=${p.to_date}` : "",
    ].filter(Boolean).join('&');
    return server(`get_recalls?${queryParams}`)
}
export const create_recall = (data: any) => {
    return server(`create_recall`, 'post', data)
}
export const update_recall = (data: any) => {
    return server(`update_recall`, 'put', data)
}