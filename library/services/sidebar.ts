import {ref, watch} from "vue";

const sidebarVisible = ref(false)
const sidebarVisibleInternal = ref(false)

watch(sidebarVisibleInternal, () => {
    setTimeout(() => {
        sidebarVisible.value = sidebarVisibleInternal.value
    }, 10)
})

export function useSidebar() {
    return {
        sidebarVisible,
        sidebarVisibleInternal,
        show() {
            sidebarVisibleInternal.value = true
        },
        hide() {
            sidebarVisibleInternal.value = false
        },
        toggle() {
            sidebarVisibleInternal.value = !sidebarVisibleInternal.value
        }
    }
}