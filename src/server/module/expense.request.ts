import server from "../server";
export const get_expenses = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.id ? `id=${p.id}` : '',
        p.from_date ? `from_date=${p.from_date}` : '',
        p.to_date ? `to_date=${p.to_date}` : '',
        p.kassa_id ? `kassa_id=${p.kassa_id}` : '',
        p.source_id ? `source_id=${p.source_id}` : '',
        p.source ? `source=${p.source}` : '',
    ].filter(Boolean).join('&')
    return server(`get_expenses?${queryParams}`)
}
export const create_expense = (data: any) => {
    return server(`create_expense`, 'post', data)
}
export const update_chiqim = (data: any) => {
    return server(`update_chiqim`, 'put', data)
}
export const delete_expense = (id: number) => {
    return server(`delete_expense?id=${id}`, 'delete')
}
export const group_expenses = (p: any) => {
    const queryParams = [
        p.from_date ? `from_date=${p.from_date}` : '',
        p.to_date ? `to_date=${p.to_date}` : '',
        p.source ? `source=${p.source}` : '',
        p.source_id ? `source_id=${p.source_id}` : '',
        p.kassa_id ? `kassa_id=${p.kassa_id}` : '',
    ].filter(Boolean).join('&')
    return server(`group_expenses?${queryParams}`);
}
export const create_expense_market = (data: any) => {
    return server(`create_expense_market`, 'post', data)
}
export const delete_expense_market = (id: number) => {
    return server(`delete_expense_market?id=${id}`, 'delete')
}
export const create_expense_user = (data: any) => {
    return server(`create_expense_user`, 'post', data)
}
export const delete_expense_user = (id: number) => {
    return server(`delete_expense_user?id=${id}`, 'delete')
}