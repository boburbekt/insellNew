import server from "../server";
export const get_settings = () => {
    return server(`get_settings`,)
}
export const update_settings = (data: any) => {
    return server(`update_settings`, 'put', data)
}