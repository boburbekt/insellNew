import server from "@/server/server";

export const get_packaged = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.id ? `id=${p.id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_packaged?${queryParams}`, "get",);
}
export const package_confirm = (data: any) => {
    return server(`package/confirm`, 'put', data)
}

export const get_packaged_cleans = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.order_id ? `order_id=${p.order_id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_packaged/cleans?${queryParams}`, "get",);
}
export const packing_rewash = (id: number) => {
    server(`packing_rewash?id=${id}`, 'put')
}