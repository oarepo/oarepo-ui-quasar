import {RouteRecordRaw} from "vue-router";
import {Component} from "vue";


export declare type Lazy<T> = () => Promise<T>;

export interface Layouts {
    // does not work yet, possible notation
    homepageLayout: Component | Lazy<Component>,
    listLayout: "homepage" | Component | Lazy<Component>,
    detailLayout: "homepage" | "list" | Component | Lazy<Component>,
}

export interface Pages {
    homepage: Component | Lazy<Component>,
    list: Component | Lazy<Component>,
    detail: Component | Lazy<Component>,
    error: Component | Lazy<Component>,
}

export interface RepositoryFormComponents {
    [componentName: string]: Component | Lazy<Component>
}

export interface Components {
    pageTitle: Component | Lazy<Component>,
    menu: {
        component: Component | Lazy<Component>
        // menu components here
    },
    listing: RepositoryFormComponents,
    facets: {
        container: Component | Lazy<Component>
    }
}

export interface RepositoryAppOptions {
    defaultLocale: string
    extraRoutes: RouteRecordRaw[]
    appComponent: Component | Lazy<Component>,
    pages: {
        [uicontext: string]: Pages,
    },
    layouts: {
        [uicontext: string]: Layouts,
    },
    components: {
        [uicontext: string]: Components
    }
}


export type Writeable<T extends { [x: string]: any }, K extends string> = {
    [P in K]: T[P];
}