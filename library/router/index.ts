import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router';
import {createRoutes} from './routes';
import {RepositoryAppOptions} from "@oarepo/oarepo-ui-quasar";

import merge from 'deepmerge'

export function createAppRouter(options: RepositoryAppOptions): Router {
    const mergedRoutes = createRoutes(options)

    return createRouter({
        history: createWebHistory(),
        routes: mergedRoutes
    })
}