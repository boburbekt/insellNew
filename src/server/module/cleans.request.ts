import util from "@/server/util";
import query from "@/server/query";
import server from "@/server/server";
import { cleansData, orderCleanPost, xizmatType } from "@types";


export const get_cleans = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.status ? `status=${p.status}` : '',
        p.id ? `id=${p.id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_cleans?${queryParams}`, "get",);
}
export const get_order_cleans = (p: any): Promise<any> => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        `order_id=${p.order_id}`,
        p.status ? `status=${p.status}` : ``
    ].filter(Boolean).join('&');
    return server<any>(`get_order_cleans?${queryParams}`, "get",);
}
export const get_clean_xizmat = (p: { buyurtma_id: number }) => {
    const queryParams = [
        `buyurtma_id=${p.buyurtma_id}`,
    ].filter(Boolean).join('&');
    return server<any>(`v1/clean-xizmat?${queryParams}`, "get",);
}
export const order_clean = (data: any) => {
    return server<any>(`wash_order_service_item`, "post", data);
}
export const order_packing = (data: any) => {
    return server<any>(`package_order_service_item`, "post", data);
}

export const cleans_order = (p: any) => {
    const queryParams = [
        `order_id=${p.order_id}`,
        `page=${0}`,
        `limit=${0}`,
        `cleans=${p.cleans || 'false'}`,
        p.status ? `status=${p.status}` : '',
        p.clean_status ? `clean_status=${p.clean_status}` : '',
    ].filter(Boolean).join('&');
    return server<any>(`get_cleans/buyurtma?${queryParams}`, "get",);
}
export const buyurtma_cleans = (p: any) => {
    const queryParams = [
        `buyurtma_id=${p.buyurtma_id}`,
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.status ? `status=${p.status}` : '',
    ].filter(Boolean).join('&');
    return server<any>(`get_buyurtma/cleans?${queryParams}`, "get",);
}
export const get_order_info = (p: any) => {
    const queryParams = [
        `order_id=${p.order_id}`,
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.status ? `status=${p.status}` : '',

    ].filter(Boolean).join('&');
    return server(`get_order_info?${queryParams}`,)
}
export const update_clean_size = (data: any) => {
    return server(`update_clean_size`, "put", data);
}
