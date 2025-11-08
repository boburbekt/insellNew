import server from "../server";

export const create_source = (data: any) => {
    return server("create_source", "post", data);
}
export const get_manba = (p: any) => {
    const queryParams = [
        `page=${p.page}`,
        `limit=${p.limit}`,
        p.status ? `status=${p.status}` : 'status=1',
    ].filter(Boolean).join('&');
    return server(`get_sources?${queryParams}`, "get",);
}
export const update_source = (data: any) => {
    return server(`update_source`, "put", data);
}