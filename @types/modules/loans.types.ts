export interface LoanRequest {
    id: number;
    incomes: Array<{
        money: number;
        kassa_id: number;
        comment: string;
    }>;
}
export interface Loan {
    comment: string | null,
    customer_id: number,
    id: number,
    money: number,
    order_id: number,
    residual: number,
    return_date: string,
    status: boolean,
    customer: {
        id: number,
        name: string
    } | null
}