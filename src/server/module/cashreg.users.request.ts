import { KassaUserRequest } from "@types";
import server from "../server";
export const get_kassa_users = async (p:any) => {
    const queryParams = [
         p.user_id ? `?user_id=${p.user_id}` : '',
         p.kassa_id ? `?kassa_id=${p.kassa_id}` : '',
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`
    ].filter(Boolean).join('&');
    return await server(`get_kassa_users${queryParams}`, 'get')
}
export const create_kassa_user = async (data: KassaUserRequest) => {
    return await server(`create_kassa_user`,'post', data)
}
export const delete_kassa_user = async (id:number) => {
    return await server(`delete_kassa_user?id=${id}`, 'delete')
}