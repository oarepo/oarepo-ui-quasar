import merge from "deepmerge";
import {RouteLocationMatched, RouteLocationNormalizedLoaded, RouteMeta} from "vue-router";


export function isVueComponent(comp: any) {
    return comp && typeof comp.render === 'function'
}

function vueMergeInternal(x: any, y: any, options: any) {
    if (isVueComponent(x) || isVueComponent(y)) {
        return y || x
    }
    return merge(x, y, options)
}

function customMerge(key: string, options: merge.Options) {
    return (x: any, y: any) => {
        return vueMergeInternal(x, y, options)
    }
}

export function vueMerge<T>(x: T, y: T, options?: any): T {
    return vueMergeInternal(x, y, {
        customMerge,
        ...(options || {}),
    })
}


export function updateQuery(route: RouteLocationNormalizedLoaded,
                            params: Array<{ paramName: string, paramValue: string }>,
                            removedParams: string[],
                            toggle = false) {
    const query = {...route.query}
    params.forEach(p => {
        if (query[p.paramName] === undefined) {
            query[p.paramName] = p.paramValue
        } else {
            if (toggle) {
                delete query[p.paramName]
            } else {
                query[p.paramName] = p.paramValue
            }
        }
    })
    removedParams.forEach(p => {
        if (query[p] !== undefined) {
            delete query[p]
        }
    })
    return {
        query: query
    }
}