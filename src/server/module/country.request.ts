
import server from "@/server/server";
import { countryForm } from "@types";

export const update_country = (data: countryForm) => {
    return server("update_country", "put", data);
}
export const create_country = (data: countryForm) => {
    return server(`create_country`, "post", data);
}
export const get_countries = (p: any) => {
    const params = [
        `page=${p.page || 0}`,
        `limit=${p.limit || 25}`,
    ].filter(Boolean).join('&');
    return server(`get_countries?${params}`, "get",);
}
