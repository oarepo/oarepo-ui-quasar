<template>
  <component :is="component" v-bind="$attrs" v-if="component">
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>
  </component>
</template>

<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {useUI} from "../services/ui";

const props = defineProps<{
  cid: string
}>()

const {currentComponents} = useUI()

const component = computed(() => {
  let c = currentComponents.value
  for (const n of props.cid.split('.')) {
    c = c[n]
    if (c === undefined) {
      console.log(`Warning: component ${props.cid} not found in`, currentComponents.value)
      return undefined
    }
  }
  return c
})
</script>