

export interface orders {
    cursor?: string | number,
    next_cursor?: string | number,
    size: number,
    count: number,
    data: [orderAcceptData]
}

export interface orderAcceptData {
    order_id: number,
    nomer: number,
    called: boolean,
    order_date: string,
    order_status: string,
    geoplugin_longitude?: string,
    geoplugin_latitude?: string,
    customer: orderCustomer,
    driver?: orderDriver,
    operator: orderOperator
}

export interface orderDriver {
    id: string,
    fullname: string
}

export interface orderOperator {
    id: string,
    fullname: string
}

export interface orderCustomer {
    id: number,
    costumer_name: string,
    costumer_phone_1: number | string,
    costumer_phone_2?: number | string,
    costumer_phone_3?: number | string,
    costumer_source?: number | string,
    izoh?: string,
    costumer_addres: string,
    costumer_turi: string,
    costumer_date: string,
}

// Order Info Types
export interface orderType {
    id: number,
    x_id: number,
    value: number,
    xizmat: {
        xizmat_id: number,
        xizmat_turi: string
    }
}

export interface xizmatType {
    gilam_eni: number,
    gilam_boyi: number,
    clean_hajm: number,
    clean_status: string
}
export interface orderCreate {
    discount_percent: number | null,
    discount_price: number | null,
    map_long: string | number,
    map_lat: string | number,
    comment: string,
    finish_date: string,
    driver_id: number | null,
    recall: Recall,
    service: OrderProduct[],
    customer_olib_ketish: boolean,
    customer_olib_kelish: boolean

}
export interface Recall {
    recall_time: string,
    comment: string
}
export interface Order {
    izoh: string,
    order_driver: string,
    order_skidka_foiz: number | null,
    order_skidka_sum: number | null,
    topshir_sana: string
}
export interface OrderProduct {
    id: number,
    service_id: number | null,
    quantity: number | null,
    price: number | null
}
export interface OrderProductXizmat {
    order_id: number | null,
    service_id: number | null,
    quantity: number | null,
    price: number,
    discount: number
}
export interface OrderConfirm {
    id: number;
    incomes: Array<{
        money: any;
        kassa_id: number;
        comment: string;
    }>;
    loan_return_date: null | string;
    discount_price_for_ozi_olib_kelish_ketish: number
}
