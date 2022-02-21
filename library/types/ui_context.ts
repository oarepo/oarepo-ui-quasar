export interface UIContextItem {
    listing: {
        layout: any
    }
}

export interface UIContext {
    [modelType: string]: UIContextItem
}