import server from "@/server/server";
export const operator_create_order = (data: any) => {
    return server(`order_create`, 'post', data)
}