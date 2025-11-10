import type { userForm, editRes, userData } from '@types';
import server from "@/server/server";

export const user_add = (data: userForm) => {
    return server("create_filial_user", "post", data);
};

export const user_edit = (data: userForm) => {
    return server(`update_filial_user`, "put", data);
};
export const user_delete = (id: number) => {
    return server(`delete_filial_user?id=${id}`, "delete");
};

export const getUsers = (p: any) => {
    const queryParams = [
        `status=${p.status}`,
        `page=${p.page}`,
        `limit=${p.limit}`,
        p.phone ? `phone=${p.phone}` : '',
        p.search ? `search=${p.search}` : '',
    ]
        .filter(Boolean)
        .join('&');
    return server(`get_filial_users?${queryParams}`, "get");
};
export const gerDrivers = () => {
    return server<any>(`v1/drivers`, "get");
}
