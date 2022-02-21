import {computed, ref} from "vue";
import {Http} from "../services/http";
import {settings} from "../services/settings";
import {ListingOptions, SearchResult} from "../types/invenio";
import _ from "lodash"

const currentHttp = new Http<any>({keepData: false})

const modelId = ref<string>()
const recordId = ref<string>()


function load(_modelId: string, _recordId: string) {
    modelId.value = _modelId
    recordId.value = _recordId
    currentHttp.get({
        url: `${settings.apiUrl}/${_modelId}/${_recordId}`
    })
}

const record = computed(() => {
    const httpData = currentHttp.data.value
    if (!httpData) {
        return {}
    }
    return httpData
})

export function useDetail(_options?: {
    hasMetadataSection: boolean
}) {
    const options = {
        hasMetadataSection: true,
        ...(_options || {})
    }
    return {
        modelId,
        recordId,
        load,
        record: computed(() => {
            if (options.hasMetadataSection) {
                return record.value?.metadata || undefined
            }
            return record.value
        }),
        loading: currentHttp.loading
    }
}
