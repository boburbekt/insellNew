export interface users {
    page: number,
    page_size: number,
    total_count: number,
    total_pages: number,
    data: [data]
}

export interface userForm {
    id?: number;
    name: string;
    phone: string;
    phone_2?: string;
    username: string;
    password: string;
    role?: string;
    user_image?: File | null;
    created_at?: Date | string;
    salary: number;
    permission_customer_olib_kelish_ketish_status?: boolean;
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