import query from "@/server/query";
import server from "@/server/server";
import { getFilialUsers } from "./users.request";
import { customers,  get_main_users, get_manba, get_regions, xizmatlar, get_places, get_expense_types, get_kassa, get_raw_materials, get_languages } from '@/server/module';
export default {
    async get_manba(p: any) {

        return await get_manba(p);
    },
    async get_places(p: any) {
        return await get_places(p);
    },
    get_location(p: any) {
        const queryParams = [
            `status=${p.status}`
        ].filter(Boolean).join('&');
        return server(`v1/bot-location?${queryParams}`, 'get')
    },
    async get_users(param: any) {
        return await getFilialUsers(param);
    },
    async get_customers(param: any) {
        return await customers(param);
    },
    async get_xizmat(param: any) {
        return await xizmatlar(param);
    },
    async get_regions(p: any) {
        return await get_regions(p)
    },
    async get_main_users(p: any) {
        return await get_main_users(p)
    },
    async get_expense_types(p: any) {
        return await get_expense_types(p)
    },
    async get_kassa(p: any) {
        return await get_kassa(p);
    },
    async get_raw_materials(p: any) {
        return await get_raw_materials(p);
    },
    async get_languages(p: any) {
        return await get_languages(p);
    },

};