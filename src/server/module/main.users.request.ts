import server from "../server";

export const update_main_user = (data: any) => {
  return server("update_user", "put", data);
}
export const create_user = (data: any) => {
  return server("create_user", "post", data);
}
export const update_profile = (data: any) => {
  return server("update_user", "put", data);
}
export const get_main_users = (p: any) => {
  const queryParams = [
    `page=${p.page || 0}`,
    `limit=${p.limit || 0}`,
    p.id ? `id=${p.id}` : '',
    p.status ? `status=${p.status}` : '',
    p.branch_id ? `branch_id=${p.branch_id}` : '',
    p.name ? `name=${p.name}` : '',
    p.phone ? `phone=${p.phone}` : '',
    p.search ? `search=${p.search}` : '',
    ...(Array.isArray(p.role) ? p.role.map((r: string) => `role=${r}`) : p.role ? [`role=${p.role}`] : []),
  ]
    .filter(Boolean)
    .join('&');

  return server(`get_users?${queryParams}`, 'get');
}
export const delete_main_user = (id: string) => {
  return server(`delete_user?id=${id}`, 'delete');
}
