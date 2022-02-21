import {computed, ref} from "vue";
import {Http} from "../services/http";
import {settings} from "../services/settings";
import {ListingOptions, SearchResult} from "../types/invenio";
import _ from "lodash"

const currentHttp = new Http<SearchResult<any>>({keepData: true})

const modelId = ref<string>()

const defaultOptions = ref<ListingOptions>({
    page: '1',
    size: '10',     // TODO: add the default page size to configuration (or ui context or user prefs)
    facets: []      // TODO: take the default facets from the ui context
})


const options = ref<ListingOptions>(defaultOptions.value)

function load(_modelId: string, _options?: ListingOptions) {
    modelId.value = _modelId
    options.value = {
        ...defaultOptions.value,
        page: '1',                // if page is not passed, reset it to the first one
        ...(_options || {})
    }
    currentHttp.get({
        url: `${settings.apiUrl}/${_modelId}/`,
        extraOptions: options.value as any
    })
}

const records = computed(() => {
    const httpData = currentHttp.data.value
    if (!httpData) {
        return []
    }
    return httpData.hits.hits || []
})

const facets = computed(() => {
    const httpData = currentHttp.data.value
    if (!httpData) {
        return {}
    }
    return _.pickBy(httpData.aggregations || {}, (agg: any) => {
        return !!(agg.buckets?.length)
    })
})

export function useListing() {
    return {
        modelId,
        load,
        records,
        facets,
        pages: computed(() => Math.ceil(
            (currentHttp.data.value?.hits.total || 0) / parseInt(options.value.size as string))
        ),
        recordsCount: computed(() => currentHttp.data.value?.hits.total),
        page: computed(() => parseInt(options.value.page as string)),
        pageSize: computed(() => parseInt(options.value.size as string)),
        loading: currentHttp.loading
    }
}
