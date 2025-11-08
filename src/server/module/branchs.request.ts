import server from "@/server/server";
import util from "../util";

export const get_branchs = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.id ? `id=${p.id}` : '',
        p.status ? `status=${p.status}` : '',
        p.name ? `name=${p.name}` : '',
        p.phone ? `phone=${p.phone}` : '',
        p.phone ? `phone=${p.phone}` : '',
    ].filter(Boolean).join('&');
    return server(`get_branches?${queryParams}`)
}
export const create_branch = (data: any) => {
    return server(`create_branch`, "post", util.formData(data));
}
export const update_branch = (data: any) => {
    return server(`update_branch`, "put", util.formData(data));
}
export const update_main_user_status = (data: any) => {
    return server(`update_user`, "put",data);
}