import server from "../server";
export const get_expense_types = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.id ? `id=${p.id}` : "",
        p.search ? `search=${p.search}` : "",
        p.status ? `status=${p.status}` : "",
    ].filter(Boolean).join("&");
    return server(`get_expense_types?${queryParams}`);
}

export const create_expense_type = (data: any) => {
    return server(`create_expense_type`, 'post', data);
}
export const update_expense_type = ( data: any) => {
    return server(`update_expense_type`, 'put', data);
}
