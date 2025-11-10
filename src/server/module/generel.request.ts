
import query from "@/server/query";
import server from "@/server/server";

export default {
    settings(p = query) {
        return server(`v1/country`, "get",);
    },
};