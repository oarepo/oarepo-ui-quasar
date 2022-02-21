<template>
  <div>
    {{ currentLocaleString }}
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {useLocale} from "../../services/locale";

const props = defineProps<{
  modelValue: any
}>()

const {currentLocale, defaultLocale} = useLocale()

function findLang(values: Array<{
                    lang: string,
                    value: string
                  }>,
                  locales: string[]) {
  for (const locale of locales) {
    const filtered = values.find(x => x.lang === locale)
    if (filtered) {
      return filtered.value
    }
  }
}

const currentLocaleString = computed(() => {
  if (!props.modelValue || !props.modelValue.length) {
    return undefined
  }

  return findLang(props.modelValue, [currentLocale.value, defaultLocale]) || props.modelValue[0]?.value
})
</script>