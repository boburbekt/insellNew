export interface Transfer {
    id: number,
    money: number,
    from_kassa_id: number,
    created_user_id: number,
    created_time: number,
    confirmed_user_id: number,
    confirmed_time: number,
    to_kassa_id: number,
    comment: string,
    type: string,
    status: boolean
}
export interface TransferRequest {
    kassa_id: number,
    type: string,
    money: number,
    comment: string
}
export interface TransferConfirum {
    transfer_id: number,
    to_kassa_id: number
}