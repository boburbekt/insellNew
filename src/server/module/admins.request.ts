import server from "@/server/server";

export const create_admin = (data: any) => {
    return server("create_admin", "post", data);
};

export const update_admin = (data: any) => {
    return server(`update_admin`, "put", data);
};
export const get_users_for_crud_admin = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.status ? `status=${p.status}` : '',
        p.name ? `name=${p.name}` : '',
        p.id ? `id=${p.id}` : '',
        p.search ? `search=${p.search}` : '',
    ]
        .filter(Boolean)
        .join('&');
    return server(`get_users_for_crud_admin?${queryParams}`, "get");
};
