import server from "@/server/server";
export const get_ready = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.driver_id ? `driver_id=${p.driver_id}` : '',
        p.own ? `own=${p.own}` : '',
        p.tartib ? `tartib=${p.tartib}` : '',
    ].filter(Boolean).join('&');
    return server(`get_ready_orders?${queryParams}`, 'get')
}
export const reclean_order = (id: number) => {
    return server(`reclean_order?id=${id}`, 'put')
}