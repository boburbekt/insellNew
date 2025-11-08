
import query from "@/server/query";
import server from "@/server/server";
import { settings } from "@types";

export default {
    settings(p = query) {
        return server<settings>(`v1/country`, "get",);
    },
};