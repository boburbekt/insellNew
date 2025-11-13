export interface users {
    page: number,
    page_size: number,
    total_count: number,
    total_pages: number,
    data: [data]
}

export interface userForm {
    id: number,
    name: string,
    username: string,
    password: string,
    role: string,
    phone: number | string,
    branch_id: number,
    status: true,
    kelish_vaqti: string,
    ketish_vaqti: string,
    maosh: number,
    telegram_id: number

}

export interface adminCreate {
    name: string,
    username: string | number,
    password: string,
    phone: number | string,
}

export interface jarimaBonusAdd {
    money: number,
    comment: string,
    worker_id: number | string,
    type: string
}

export interface data {
    id: number,
    username: string,
    fullname: string,
    phone: number,
    filial_id: number,
    created_at: string
}

export interface editRes {
    detail?: string
}

export interface userData {
    id: number,
    name: string,
    phone: number,
    username: string,
    role: string,
    status: boolean | string,
    branch_id: number,
    balance_for_transfer: number,
    salary: number,
    balance: number,
    permission_customer_olib_kelish_ketish_status: boolean
}