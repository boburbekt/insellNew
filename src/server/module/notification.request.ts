import server from "../server";
export const get_notifications = (p: any) => {
    const queryParams = [
        p.id ? `id=${p.id}` : '',
        p.user_id ? `user_id=${p.user_id}` : '',
        p.title ? `title=${p.title}` : '',
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
    ].filter(Boolean).join('&');
    return server(`get_notifications?${queryParams}`,)
}
export const update_notification = (p: any) => {
    return server(`update_notification?id=${p.id || 0}&all=${p.all || 'false'}`, 'put')
}