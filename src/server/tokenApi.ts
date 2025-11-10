import { util } from "@/server/util";
import query from "@/server/query";
import server from "@/server/server";

// token data
interface TokenData {
    username: string;
    password: string;
}
// refresh token data
interface rfData {
    token: string;
}
// all posts response
interface TokenRes {
    user: {
        id: number;
        username: string;
        fullname: string;
        phone: number;
        filial_id: number;
        created_at: string;
    };
    role: string;
    token_type: string;
    access_token: string;
    refresh_token: string;
    detail?: string;
}
// me response
interface meRes {
    id: number;
    username: string;
    fullname: string;
    phone: number;
    filial_id: number;
    created_at: string;
    detail?: string;
}


export default {
    token(data: TokenData) {
        return server("token", "post", util.formData(data));
    },
    refresh_token(data: rfData) {
        return server("refresh_token", "post", data);
    },
};