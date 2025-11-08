import util from "@/server/util";
import query from "@/server/query";
import server from "@/server/server";


export const get_supplies = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.id ? `id=${p.id}` : '',
        p.raw_material_id ? `raw_material_id=${p.raw_material_id}` : '',
        p.user_id ? `user_id=${p.user_id}` : '',
        p.market_id ? `market_id=${p.market_id}` : '',
        p.from_date ? `from_date=${p.from_date}` : "",
        p.to_date ? `to_date=${p.to_date}` : "",
    ].filter(Boolean).join('&');
    return server(`get_supplies?${queryParams}`, "get",);
}

export const create_supply = (data: any) => {
    return server(`create_supply`, "post", data);
}
export const return_supply = (data: any) => {
    return server(`return_supply`, "put", data);
}
