import server from "../server";
export const get_incomes = (p: any) => {
    const queryParams = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 0}`,
        p.id ? `id=${p.id}` : '',
        p.from_date ? `from_date=${p.from_date}` : '',
        p.to_date ? `to_date=${p.to_date}` : '',
        p.source ? `source=${p.source}` : '',
        p.source_id ? `source_id=${p.source_id}` : '',
        p.kassa_id ? `kassa_id=${p.kassa_id}` : '',
    ].filter(Boolean).join('&')
    return server(`get_incomes?${queryParams}`)
}
export const create_income = (data: any) => {
    return server(`create_income`, 'post', data)
}
export const update_income = (data: any) => {
    return server(`update_income`, 'put', data)
}
export const delete_income = (id: number) => {
    return server(`delete_incomem?id=${id}`, 'delete')
}