import {watch} from "vue";

export function runAndWatch(watches: any, emit: any) {
    watch(watches, emit)
    emit()
}