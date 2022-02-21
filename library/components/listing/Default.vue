<template>
  <div v-if="!inline">
    {{ modelValue }}
  </div>
  <span v-else>
    {{ modelValue }}
  </span>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";

const props = defineProps<{
  modelValue: any,
  inline?: boolean
}>()
</script>