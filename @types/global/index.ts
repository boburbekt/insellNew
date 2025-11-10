
declare global {
    interface ApiResponse<T> {
        error?: any
        result?: T
        statusCode: number
    }

    type Nullable<T> = T | null;

    interface WithPagination<T> {
        data: T[];
    }
}
export interface locationType {
    latitude: number | null,
    longitude: number | null
}
export { };