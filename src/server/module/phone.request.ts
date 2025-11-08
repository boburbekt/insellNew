import server from "../server";
export const get_phones = (p: any) => {
    const queryParams = [
        p.phone ? `phone=${p.phone}` : '',
        p.source ? `source=${p.source}` : '',
        p.source_id ? `source_id=${p.source_id}` : '',
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
    ].filter(Boolean).join('&');
    return server(`get_phones?${queryParams}`)
}
export const create_phone = (data: any) => {
    return server(`create_phone`, 'post', data);
}
export const update_phone = (data: any) => {
    return server(`update_phone`, 'put', data);
}
export const delete_phone = (id: number) => {
    return server(`delete_phone?id=${id}`, 'delete')
}