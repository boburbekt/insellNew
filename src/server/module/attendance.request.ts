import server from "../server";
export const get_attendances = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.id ? `id=${p.id}` : "",
        p.user_id ? `user_id=${p.user_id}` : "",
        p.from_date ? `from_date=${p.from_date}` : "",
        p.to_date ? `to_date=${p.to_date}` : "",
    ].filter(Boolean).join("&");
    return server(`get_attendances?${queryParams}`);
}
export const create_attendance = (data: any) => {
    return server(`create_attendance`, 'post', data);
}
export const delete_attendance = (id: string) => {
    return server(`delete_attendance/${id}`, 'delete');
}
export const get_user_attendances = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.entrance_date ? `entrance_date=${p.entrance_date}` : "",
        p.user_id ? `user_id=${p.user_id}` : "",
    ].filter(Boolean).join("&");
    return server(`get_attendances?${queryParams}`);
}
export const get_attendances_info = (p: any) => {
    const queryParams = [
        p.user_id ? `user_id=${p.user_id}` : "",
        p.from_date ? `from_date=${p.from_date}` : "",
        p.to_date ? `to_date=${p.to_date}` : "",
    ].filter(Boolean).join('&');
    return server(`get_attendances_info?${queryParams}`)
}
export const get_attendances_only_added_money = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.from_date ? `from_date=${p.from_date}` : "",
        p.to_date ? `to_date=${p.to_date}` : "",
        p.added_money ? `added_money=${JSON.parse(p.added_money)}` : "",
    ].filter(Boolean).join("&");
    return server(`get_attendances_only_added_money?${queryParams}`);
}

