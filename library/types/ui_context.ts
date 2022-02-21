import {SchemaField} from "blitzar";
import {Component} from "vue";

export interface UIContextItem {
    listing: {
        layout: UILayout
    },
    detail: {
        layout: UILayout
    }
}

export interface UIContext {
    [modelType: string]: UIContextItem
}

export interface UILayoutComponent extends SchemaField {
    id?: string
    array?: boolean
    inline?: boolean
    component?: string | Component
    componentClasses?: string | string[]
}

export type StringOrLayoutComponent = string | UILayoutComponent

export interface UITableLayoutComponent extends UILayoutComponent {
    pull: {
        key: string
        value: string
        component: StringOrLayoutComponent
    }
}

export interface UITableFieldComponents {
    [key: string]: string | UITableLayoutComponent
}

export interface UITable extends UILayoutComponent {
    component: 'table'
    fields: string[]
    excluded: string[]
    fieldComponents: UITableFieldComponents
}

export type UILayout = Array<UILayoutComponent>
