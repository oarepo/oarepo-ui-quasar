import {ref, shallowRef} from "vue";
import {RepositoryAppOptions} from "../types/configuration";

export const repositoryAppOptions = shallowRef<RepositoryAppOptions>()

export function initializeRepository(options: RepositoryAppOptions) {
    repositoryAppOptions.value = options
}

export function useRepository() {
    return {
        repositoryAppOptions
    }
}