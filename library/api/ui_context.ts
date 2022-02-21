import {computed, readonly, ref} from "vue";
import {Http} from "../services/http";
import {settings} from '../services/settings'
import {UIContext} from "../types/ui_context";

const contextId = ref<string>('default')
const currentHttp = new Http<UIContext>()


async function load(ctx_id: string) {
    contextId.value = ctx_id
    return await currentHttp.get({url: `${settings.uiContextUrl}/${ctx_id}`})
}

const context = computed<UIContext>(() => {
    return currentHttp.data.value as UIContext
})

export function useUIContext() {
    return {
        contextId: readonly(contextId),
        current: context,
        load
    }
}