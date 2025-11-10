import type { userForm, editRes, userData } from '@types';
import server from "@/server/server";

export const user_add = (data: userForm) => {
    return server("create_branch_user", "post", data);
};

export const user_edit = (data: userForm) => {
    return server(`update_branch_user`, "put", data);
};
export const user_delete = (id: number) => {
    return server(`delete_filial_user?id=${id}`, "delete");
};
export const update_user_status = (data: any) => {
    return server(`update_user_status?id=${data.id}&status=${data.status}`, "put",);
}
export const getFilialUsers = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.status ? `status=${p.status}` : '',
        p.phone ? `phone=${p.phone}` : '',
        p.id ? `id=${p.id}` : '',
        p.search ? `search=${p.search}` : '',
        p.branch_id ? `branch_id=${p.branch_id}` : '',
        p.role ? `role=${p.role}` : '',
    ]
        .filter(Boolean)
        .join('&');
    return server(`get_branch_users?${queryParams}`, "get");
};
export const get_current_user = () => {
    return server(`profile`, "get");
}
