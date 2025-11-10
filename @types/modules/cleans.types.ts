import { CustomerData } from './customers.types';
export interface cleansData {
    order_id: number,
    nomer: number,
    day: number,
    izoh: string,
    izoh2: string,
    izoh3: string,
    order_date: string,
    topshir_sana: string,
    order_status: string,
    customer: CustomerData
}
export interface cleanXizmatData {
    gilam_eni: number,
    gilam_boyi: number,
    clean_hajm: number,
    clean_status: string
}
export interface Xizmat {
    xizmat_id: number,
    xizmat_turi: string,
    min_narx: number,
    olchov: string,
    narx: number,
    max_narx: number,
    saygak_narx: number
}
export interface orderCleansData {
    id: number,
    gilam_eni: number,
    gilam_boyi: number,
    clean_hajm: number,
    narx: number,
    clean_narx: number,
    chegirma_summa: number,
    sana: string,
    xizmat: Xizmat,
    chegirma: {
        summa: number
    }
}
export interface orderCleanPut {
    clean_id: number,
    gilam_eni: number,
    gilam_boyi: number,
    clean_hajm: number,
    narx: number
}
export interface orderCleanPost {
    id: number | null,
    gilam_eni: number | null,
    gilam_boyi: number | null,
    clean_hajm: number | null,
    narx: number | null
}