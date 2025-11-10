
import util from "@/server/util";
import query from "@/server/query";
import server from "@/server/server";

export const customer_create = (data: any) => {
    return server("create_customer", "post", data);
}

export const customers = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.search ? `search=${p.search}` : '',
        p.type ? `type=${p.type}` : '',
        p.phone ? `phone=${p.phone}` : '',
        p.name ? `name=${p.name}` : '',
        p.id ? `id=${p.id}` : '',
        p.from_date ? `from_date=${p.from_date}` : "",
        p.to_date ? `to_date=${p.to_date}` : "",
    ].filter(Boolean).join('&');
    return server<any>(`get_customers?${queryParams}`, "get",);
}

export const get_customer_type = () => {
    return server<any>(`customer_types`, "get",);
}
export const update_customer = (data: any) => {
    return server(`update_customer`, "put", data);
}
