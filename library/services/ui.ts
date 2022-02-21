import {computed} from "vue";
import {useRepository} from "../api/repository";
import {useUIContext} from "../api/ui_context";
import {Components, RepositoryFormComponents} from "../types/configuration";

const {repositoryAppOptions} = useRepository()
const {contextId} = useUIContext()


const currentComponents = computed<Components>(() => {
    if (!repositoryAppOptions.value?.components) {
        throw new Error()
    }
    const contextComponents = repositoryAppOptions.value.components[contextId.value] || {}
    const defaultComponents: Components = repositoryAppOptions.value.components['default'] || {}
    return {
        pageTitle: contextComponents.pageTitle || defaultComponents.pageTitle,
        menu: {
            component: contextComponents.menu?.component || defaultComponents.menu.component
        },
        listing: {
            ...(defaultComponents.listing || {} as RepositoryFormComponents),
            ...(contextComponents.listing || {} as RepositoryFormComponents),
        },
        detail: {
            ...(defaultComponents.detail || {} as RepositoryFormComponents),
            ...(contextComponents.detail || {} as RepositoryFormComponents),
        },
        facets: {
            container: contextComponents.facets?.container || defaultComponents.facets.container,
            facet: contextComponents.facets?.facet || defaultComponents.facets.facet,
            buckets: contextComponents.facets?.buckets || defaultComponents.facets.buckets
        }
    } as Components
})

export function useUI() {

    return {
        currentComponents
    }
}