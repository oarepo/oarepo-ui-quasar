<template>
  <span>{{ formattedValue }}</span>
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";

const props = defineProps<{
  modelValue?: string,
  format?: string
}>()

const formattedValue = computed(() => {
  if (!props.modelValue) {
    return
  }
  switch (props.format) {
    case 'year':
      return props.modelValue.toString().substring(0, 4)
    default:
      return props.modelValue
  }
})
</script>