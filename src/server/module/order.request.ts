
import server from "@/server/server";
import { orders } from "@types";
export const get_orders = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.id ? `id=${p.id}` : '',
        p.number ? `number=${p.number}` : '',
        p.customer_id ? `customer_id=${p.customer_id}` : '',
        p.user_id ? `user_id=${p.user_id}` : '',
        p.driver_id ? `driver_id=${p.driver_id}` : '',
        p.place_id ? `place_id=${p.place_id}` : '',
        p.confirm_driver_id ? `confirm_driver_id=${p.confirm_driver_id}` : '',
        p.warehouse_place_id ? `warehouse_place_id=${p.warehouse_place_id}` : '',
        ...(Array.isArray(p.status) ? p.status.map((r: string) => `status=${r}`) : p.status ? [`status=${p.status}`] : []),
        p.slide_status ? `slide_status=${p.slide_status}` : '',
        p.warehouse_place ? `warehouse_place=${p.warehouse_place}` : '',
        p.for_driver ? `for_driver=${p.for_driver}` : '',
        p.for_confirm_driver ? `for_confirm_driver=${p.for_confirm_driver}` : '',
        p.year ? `year=${p.year}` : '',
        p.search_customer ? `search_customer=${p.search_customer}` : '',
        p.without_operator ? `without_operator=${JSON.parse(p.without_operator)}` : "",
        p.customer_olib_ketish ? `customer_olib_ketish=${JSON.parse(p.customer_olib_ketish)}` : "",
        p.from_date ? `from_created_date=${p.from_date}` : "",
        p.to_date ? `to_created_date=${p.to_date}` : "",
        p.from_finish_date ? `from_finish_date=${p.from_finish_date}` : "",
        p.to_finish_date ? `to_finish_date=${p.to_finish_date}` : "",
    ].filter(Boolean).join('&');
    return server(`get_orders?${queryParams}`, "get",);
}

// Old API
export const get_order_accepts = (p: any) => {
    const queryParams = [
        `cursor=${p.cursor}`,
        `size=${p.size}`,
        p.process ? `process=${p.process}` : '',
        p.driver_id ? `driver_id=${p.driver_id}` : '',
    ].filter(Boolean).join('&');
    return server(`v1/order-acceptance?${queryParams}`, "get",);
}


export const order_to_bring = (p: any) => {
    const queryParams = [
        `process=${p.process}`,
        `driver_id=${p.driver_id}`,
        `cursor=${p.cursor}`,
        `size=${p.size}`,
    ].filter(Boolean).join('&');
    return server(`v1/order-to-bring?${queryParams}`, "get",);
}
export const order_create = (data: any) => {
    return server(`create_order`, "post", data);
}
export const order_clean_add = (data: any) => {
    return server(`create_order_service`, "post", data);
}
export const update_order = (data: any) => {
    return server(`update_order?id=${data.id}`, "put", data);
}
export const share_order_to_warehouse = (data: any) => {
    return server(`share_order_to_warehouse`, "put", data);
}
export const cancel_order = (id: number) => {
    return server(`delete_order?order_id=${id}`, "put");
}
export const order_balance = (p: any) => {
    const queryParams = [
        `order_id=${p.order_id}`,
    ].filter(Boolean).join('&');
    return server(`calculate_total_price?${queryParams}`, "get",);
}
export const confirm_order = (data: any) => {
    return server(`confirm_order`, "put", data);
}
export const get_orders_count = (p: any) => {
    const queryParams = [
        `status=${p.status}`,
    ].filter(Boolean).join('&');
    return server(`get_orders_count?${queryParams}`, "get",);
}
export const calculate_order_profit = (p: any) => {
    const queryParams = [
        `order_id=${p.order_id}`,
    ].filter(Boolean).join('&');
    return server(`calculate_order_profit?${queryParams}`, "get",);
}
export const calculate_orders_profit = (p: any) => {
    const queryParams = [
        `customer_id=${p.customer_id}`,
    ].filter(Boolean).join('&');
    return server(`calculate_orders_profit?${queryParams}`, "get",);
}
// history
export const get_histories = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.order_id ? `order_id=${p.order_id}` : '',
        p.user_id ? `user_id=${p.user_id}` : '',
        p.status ? `status=${p.status}` : '',
        p.from_date ? `from_date=${p.from_date}` : "",
        p.to_date ? `to_date=${p.to_date}` : "",
        p.group_by_order ? `group_by_order=${JSON.parse(p.group_by_order)}` : "",
    ].filter(Boolean).join('&');
    return server(`get_histories?${queryParams}`, "get",);
}
export const check_order_for_qayta_topshiruv = (p: any) => {

    return server(`check_order_for_qayta_topshiruv/${p.order_id}`, "get",);
}

// services
export const get_order_services = (p: any) => {
    const queryParams = [
        `id=${p.id || 0}`,
        `order_id=${p.order_id}`,
        `page=${p.page}`,
        `limit=${p.limit}`,
    ].filter(Boolean).join('&');
    return server(`get_order_services?${queryParams}`, "get",);
}
export const create_order_service = (data: any) => {
    return server(`create_order_service`, "post", data);
}
export const delete_order_service = (id: any) => {
    return server(`delete_order_service?id=${id}`, "delete",);
}
export const update_order_service_items_size = (data: any) => {
    return server(`update_order_service_items_size`, "put", data);
}
export const update_order_service = (data: any) => {
    return server(`update_order_service`, "put", data);
}
export const bring_order = (id: any) => {
    return server(`bring_order_for_driver?order_id=${id}`, "put");
}
// service item
export const return_item = (id: any) => {
    return server(`return_broken_order_service_item?order_service_item_id=${id}`, "put");
}
export const rewash_item = (item: any) => {
    return server(`rewash_order_service_item?order_service_item_id=${item?.order_service_item_id}`, "put");
}

