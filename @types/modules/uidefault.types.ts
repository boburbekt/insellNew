export interface PaginationData<T> {
    current_page: number | string,
    limit: number | string,
    pages: number | string,
    data: T[];
    total_count?: number | string,
}