import type { CustomerData } from '@types';

import util from "@/server/util";
import query from "@/server/query";
import server from "@/server/server";

export const customer_add = (data: CustomerData) => {
    return server("create_customer", "post", data);
}
export const customer_create = (data: CustomerData) => {
    return server("create_customer", "post", data);
}
export const customer_one = (id: number) => {
    return server(`v1/customer-one?${id}`, "delete");
}
export const get_customer_one = (id: number) => {
    return server(`v1/customer-one?id=${id}`, "get");
}
export const customers = (p: any) => {
    const queryParams = [
        `page=${p.cursor || 1}`,
        `limit=${p.size || 25}`,
        p.search ? `search=${p.search}` : '',
        p.status ? `status=${p.status}` : '',
        p.phone ? `phone_1=${p.phone}` : '',
        p.manba_id ? `manba_id=${p.manba_id}` : '',
        p.turi ? `turi=${p.turi}` : '',
        p.izoh ? `izoh=${p.izoh}` : '',
        p.from_date ? `from_date=${p.from_date}` : '',
        p.to_date ? `to_date=${p.to_date}` : '',
    ].filter(Boolean).join('&');
    return server<any>(`get_customers?${queryParams}`, "get",);
}

export const get_customer_type = () => {
    return server<any>(`v1/utiles/customer-types`, "get",);
}
