<template>
  <a :href="linkDestination" v-if="linkDestination" target="_blank">{{ linkText }}</a>
  <span v-else>{{ linkText }}</span>
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {useLocale} from "../../services/locale";

const props = withDefaults(defineProps<{
  modelValue: any,
  url: string
  text: string
}>(), {
  url: "url",
  text: "text"
})

const linkDestination = computed(() => {
  return props.modelValue ? props.modelValue[props.url] : undefined
})

const linkText = computed(() => {
  return props.modelValue ? (props.modelValue[props.text] || props.modelValue[props.url]) : undefined
})

</script>