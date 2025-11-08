import { LoanRequest } from "@types";
import server from "../server";
export const loans_for_group = (source: string) => {
    return server(`loans_for_group?source=${source}`, 'get')
}
export const get_loans = (p: any) => {
    const queryParams = [
        p.id ? `id=${p.id}` : "",
        p.order_id ? `order_id=${p.order_id}` : "",
        p.user_id ? `user_id=${p.user_id}` : "",
        p.customer_id ? `customer_id=${p.customer_id}` : "",
        p.status ? `status=${JSON.parse(p.status)}` : "",
        p.closed ? `closed=${JSON.parse(p.closed)}` : "",
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
    ].filter(Boolean).join("&");
    return server(`get_loans?${queryParams}`, "get");
}
export const pay_loan = (data: LoanRequest) => {
    return server(`pay_loan`, "put", data);
}
export const delete_income_for_loan = (id: number) => {
    return server(`delete_income_for_loan?income_id=${id}`, "delete",);
}
export const close_loan = (data: any) => {
    return server(`close_loan`, "put", data);
}