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
  id: string
}>()

const {currentComponents} = useUI()

const component = computed(() => {
  let c = currentComponents.value
  for (const n of props.id.split('.')) {
    c = c[n]
    if (c === undefined) {
      return undefined
    }
  }
  return c
})
</script>