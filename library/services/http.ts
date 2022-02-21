/*
 * Simple HTTP primitives
 */

import {Ref, ref} from 'vue'
import {GenericParsedQuery} from "@oarepo/vue-query-synchronizer/types";
import {notify} from "./ui_notification"
import {HttpGetOptions, HttpOptions} from "../types/http";

export class Http<T> {
    options: Ref<HttpOptions>
    data: Ref<T | undefined>
    loading: Ref<boolean>
    loaded: Ref<boolean>
    stale: Ref<boolean>
    controller?: AbortController

    constructor(
        options: HttpOptions = {},
        runImmediatelly: boolean = true
    ) {
        this.options = ref({
            ...{
                method: 'get',
                keepData: false,
                query: {}
            },
            ...options
        })
        this.data = ref<T>()
        this.loading = ref(false)
        this.loaded = ref(false)
        this.stale = ref(false)
        if (runImmediatelly && this.options.value.url) {
            this.run()
        }
    }

    async get(options?: HttpGetOptions) {
        this.dispose()
        this.options.value = {
            ...this.options.value,
            url: options?.url || this.options.value.url,
            query: mergeQuery(this.options.value.query, options?.query, options?.extraOptions)
        }
        return this.run()
    }

    async run() {
        if (!this.options.value.url) {
            throw new Error('URL not set')
        }
        const objUrl = new URL(this.options.value.url, window.location.href)
        if (this.options.value.query) {
            Object.entries(this.options.value.query).forEach(([k, v]) => {
                objUrl.searchParams.set(k, v)
            })
        }
        this.loading.value = true
        if (!this.options.value.keepData) {
            this.data.value = undefined
        } else {
            this.stale.value = true
        }
        this.controller = new AbortController();
        const {signal} = this.controller;
        let retryInterval = 4000
        while (true) {
            try {
                const response = await fetch(objUrl.toString(), {
                    method: this.options.value.method,
                    signal
                })
                if (Math.floor(response.status / 100) != 2) {
                    let err: string
                    try {
                        err = (await response.json()).message
                    } catch {
                        err = await response.text()
                    }
                    throw new Error(err)
                }
                const json_data = await response.json()
                this.data.value = json_data as T
                this.loading.value = false
                this.stale.value = false
                this.loaded.value = true
                return this.data.value
            } catch (e: any) {
                const errorMessage = e.message
                await notify({
                    message: "Server/Network error, will try again: " + errorMessage,
                    timeout: retryInterval,
                    color: 'negative',
                    actions: [
                        {
                            label: 'retry now',
                            color: 'white',
                            retval: 'retry'
                        },
                        {
                            label: 'report bug',
                            color: 'white',
                            retval: 'report'
                        }
                    ]
                })
                retryInterval *= 2
            }
        }
    }

    dispose() {
        if (this.loading.value) {
            this.controller?.abort()
        }
    }
}


function mergeQuery(
    currentQuery?: { [key: string]: string },
    query?: GenericParsedQuery,
    extraOptions?: { [key: string]: string }) {
    if (extraOptions === undefined && query === undefined) {
        return currentQuery
    }
    const opts: { [key: string]: string } = {}
    if (extraOptions !== undefined) {
        Object.entries(extraOptions).forEach(([k, v]) => {
            opts[k] = v
        })
    }
    if (query !== undefined) {
        Object.entries(query).forEach(([k, v]) => {
            opts[k] = v
        })
    }
    return opts
}
