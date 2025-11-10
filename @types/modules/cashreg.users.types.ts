export interface KassaUser {
    id: number,
    kassa_id: number,
    user_id: number,
    user: {
        id: number,
        name: string,
        phone: number,
        username: string,
        salary: number,
        balance_for_transfer: number,
        role: string,
        status: boolean
    }
}   
export interface KassaUserRequest {
    kassa_id: number,
    user_id: number
}