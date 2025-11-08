import server from "../server";
export const get_calls = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.id ? `id=${p.id}` : ''
    ].filter(Boolean).join('&')
    return server(`get_call?${queryParams}`)
}
export const create_call = (data: any) => {
    return server(`create_call`, 'post', data)
}
export const update_call = (data: any) => {
    return server(`update_call`, 'post', data)
}
export const delete_call = (id: number) => {
    return server(`delete_call?id=${id}`,)
}