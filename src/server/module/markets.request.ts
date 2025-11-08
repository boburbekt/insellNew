import util from "@/server/util";
import query from "@/server/query";
import server from "@/server/server";


export const markets = (p: any) => {
    const queryParams = [
        `page=${p.page || 1}`,
        `limit=${p.limit || 25}`,
        p.id ? `id=${p.id}` : '',
        p.name ? `name=${p.name}` : '',
        p.user_id ? `user_id=${p.user_id}` : '',
    ].filter(Boolean).join('&');
    return server(`get_markets?${queryParams}`, "get",);
}

export const create_market = (data: any) => {
    return server(`create_market`, "post", data);
}
export const update_market = (data: any) => {
    return server(`update_market`, "put", data);
}
