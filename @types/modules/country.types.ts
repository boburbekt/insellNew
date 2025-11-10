export interface country {
    page: number,
    page_size: number,
    total_count: number,
    total_pages: number,
    data: [dataCountry]
}

export interface countryForm {
    name: string,
    tel_code: number,
    tel_length: number,
    language: string
}

export interface dataCountry {
    id: number,
    name: string,
    tel_code: number,
    tel_length: number,
    mintaqa_list: [
        {
            id: number,
            name: string
        }
    ]
}

export interface subReq {
    detail?: string
}


