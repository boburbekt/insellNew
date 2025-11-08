import server from "../server";
export const get_regions = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.country_id ? `country_id=${p.country_id}` : '',
        p.id ? `id=${p.id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_regions?${queryParams}`, 'get')
}
export const create_region = (data: any) => {
    return server(`create_region`, 'post', data)
}
export const update_region = (data: any) => {
    return server(`update_region`, 'put', data)
}