import {GenericParsedQuery} from "@oarepo/vue-query-synchronizer/types";

export interface HttpOptions {
    url?: string
    method?: string
    keepData?: boolean
    query?: { [key: string]: string }
}

export interface HttpGetOptions {
    url?: string,
    query?: GenericParsedQuery,
    extraOptions?: { [key: string]: string | number | boolean }
}