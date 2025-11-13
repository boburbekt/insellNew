import type { userForm, editRes, userData, adminCreate, jarimaBonusAdd } from '@types';
import server from "@/server/server";

export const create_user = (data: userForm) => {
    return server("create_user", "post", data);
};
export const create_admin = (data: adminCreate) => {
    return server("create_admin", "post", data);
};
export const retry_sms = (data: any) => {
    return server("retry_sms", "post", data);
};
export const retry_sms_for_password = (data: any) => {
    return server("retry_sms_for_password", "post", data);
};
export const create_jarima_bonus = (data: jarimaBonusAdd) => {
    return server("create_jarima_bonus", "post", data);
};

export const update_user = (data: userForm) => {
    return server(`update_user`, "put", data);
};
export const confirm_user = (data: any) => {
    return server(`confirm_user`, "put", data);
};
export const update_password = (data: any) => {
    return server(`update_password`, "put", data);
};
export const confirm_sms_for_password = (data: any) => {
    return server(`confirm_sms_for_password`, "put", data);
};
export const delete_jarima_bonus = (id: number) => {
    return server(`delete_jarima_bonus?id=${id}`, "delete");
};
export const confirm_j_b = (id: any) => {
    return server(`confirm_j_b/${id}`, "put",);
}
export const get_users = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.branch_id ? `branch_id=${p.branch_id}` : '',
        p.search ? `search=${p.search}` : '',
        p.id ? `id=${p.id}` : '',
        p.role ? `role=${p.role}` : '',
    ]
        .filter(Boolean)
        .join('&');
    return server(`get_users?${queryParams}`, "get");
};
export const get_users_for_telegram = () => {
    return server(`get_users_for_telegram`, "get");
}
export const get_jarima_bonus = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
    ]
        .filter(Boolean)
        .join('&');
    return server(`get_jarima_bonus/${p.id}?${queryParams}`, "get");
}
export const this_user = (id: number) => {
    return server(`this_user/${id}`, "get");
}
