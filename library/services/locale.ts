import {ref} from "vue";
import {useRepository} from "../api/repository";

export function useLocale() {
    const { repositoryAppOptions } = useRepository()
    return {
        currentLocale: ref('cs'),
        defaultLocale: repositoryAppOptions.defaultLocale || 'en'
    }
}