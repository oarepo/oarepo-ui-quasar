import {Component} from "vue";
import {RouteRecordRaw} from 'vue-router';
import {RepositoryAppOptions} from "@oarepo/oarepo-ui-quasar";

export function createRoutes(options: RepositoryAppOptions): RouteRecordRaw[] {
    // TODO: make this dependent on ui context
    const mainLayoutChildren: RouteRecordRaw[] = [
        {
            path: ':datamodel',
            component: options.pages.default.list as Component,
            props: true
        },
        {
            path: '',
            component: options.pages.default.homepage as Component
        }
    ]

    const ret: RouteRecordRaw[] = [
        ...(options.extraRoutes || []),
        {
            path: '/',
            component: () => options.layouts.default.homepageLayout,    // TODO: other layouts
            children: mainLayoutChildren,
        }
    ];

    ret.push({
        path: '/:catchAll(.*)*',
        component: () => options.pages?.default?.error || import('../pages/Error404.vue'),
    })
    return ret
}
