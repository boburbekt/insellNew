import server from "../server";
export const create_sms_template = (data: any) => {
    return server(`create_sms_template`, 'post', data);
}
export const get_sms_templates = (p: any) => {
    const queryParams = [
        p.id ? `id=${p.id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_sms_templates?${queryParams}`);
}
export const update_sms_template = (data: any) => {
    return server(`update_sms_template`, 'put', data);
}
export const delete_sms_template = (id: number) => {
    return server(`delete_sms_template?id=${id}`, 'delete');
}