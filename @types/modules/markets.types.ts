import { RouteParamValueRaw } from "vue-router";
import { locationType } from "../global";

export interface MarketData {
  id: number,
  name: string,
  address: string,
  phones: [
    {
      id: number,
      phone: string
    }
  ]
}
export interface Supply {
  id: number,
  service_raw_material_id: number,
  market_id: number,
  quantity: number,
  price: number
}
