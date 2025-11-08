import server from "../server";
export const get_daily_statistics = (p: any) => {
    const queryParams = [
        p.from_date ? `from_date=${p.from_date}` : "",
        p.to_date ? `to_date=${p.to_date}` : "",
    ].filter(Boolean).join('&');
    return server(`get_daily_statistics?${queryParams}`)
}