import server from "../server";
export const get_languages = (p: any) => {
    const queryParams = [
        p.id ? `id=${p.id}` : '',
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
    ].filter(Boolean).join('&');
    return server(`get_languages?${queryParams}`)
}
export const create_language = (data: any) => {
    return server(`create_language`, 'post', data);
}
export const update_language = (data: any) => {
    return server(`update_language`, 'put', data);
}