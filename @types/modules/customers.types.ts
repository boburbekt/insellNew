import { RouteParamValueRaw } from "vue-router";
import { locationType } from "../global";

export interface CustomerParams {
  id: number;
  title: string;
  status: string;
  filial_id: number;
  name: string;
  phone: string;
  phone_1: number;
  manba_id: number;
  turi: string;
  izoh: string;
  from_date: string;
  to_date: string;
}
export interface CustomerData {
  name: string,
  phone: [
    {
      id?: number,
      phone: string
    }
  ],
  address: string,
  type: string,
  region_id: number,
  comment: string,
  id: string | number
}
export interface OneCustomerData {
  id: string | number;
  costumer_name: string;
  costumer_phone_1: number | string;
  costumer_phone_2: number | string | null;
  costumer_phone_3?: number | string | null;
  costumer_addres: string;
  costumer_source: number | null;
  costumer_turi: string;
  costumer_date?: string;
  izoh?: string;
  orders: CustomerDataOrder[]
}

export interface CustomerDataOrder {
  order_id: string | number,
  nomer: number,
  called: boolean,
  order_date: string,
  order_status: string,
  olibk_sana: string,
  geoplugin_longitude: number,
  geoplugin_latitude: number,
  driver: CustomerDataDriver,
  operator: CustomerDataOperator,
  buyurtmalar: [CustomerDataBuyurtma]
}

export interface CustomerDataOperator {
  id: string | number;
  fullname: string;
}
export interface CustomerDataDriver {
  id: string | number;
  fullname: string;
}

export interface CustomerDataBuyurtma {
  id: string | number,
  x_id: number | string,
  value: number,
  order_id: string | number,
  order: CustomerDataBuyurtmaOrder,
  xizmat: CustomerDataXizmat
}

export interface CustomerDataBuyurtmaOrder {
  order_id: string | number,
  nomer: number,
  called: boolean,
  order_date: string,
  order_status: string,
  geoplugin_longitude: number,
  geoplugin_latitude: number,
}
export interface CustomerDataXizmat {
  xizmat_id: string | number;
  xizmat_turi: string,
  narx: number,
  min_narx: number,
  max_narx: number,
  saygak_narx: number,
  olchov: string
}

export interface CustomerRecall {
  recall_date: string,
  recall_time: string,
  izoh: string
}


export interface CustomerOrder {
  order_date: string,
  order_time: string,
  izoh: string,
  order_driver: string,
  order_skidka_foiz: number,
}
export interface CustomerProduct {
  id: number,
  old_summa: number,
  new_summa: number
}
export interface CustomerPost {
  customer: CustomerData,
  recall: CustomerRecall,
  order: CustomerOrder,
  location: locationType,
  products: CustomerProduct[]
}
export interface CustomerTypes {
  name: string,
  slug: string
}