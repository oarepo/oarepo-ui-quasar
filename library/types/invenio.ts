export interface Bucket {
    key: string
    doc_count: number
    label: string
    is_selected: boolean
}

export interface Aggregation {
    label: string
    buckets: Bucket[]
}

export interface AggregationWithName extends Aggregation {
    name: string
}

export interface Aggregations {
    [key: string]: Aggregation
}

export interface Hits<T> {
    hits: T[],
    total: number
}

export interface SearchResult<T> {
    sortBy: string,
    aggregations: Aggregations,
    hits: Hits<T>
}


export interface ListingOptions {
    // page: number
    // size: number
    // facets: string[]
    [key: string]: string | string[]
}