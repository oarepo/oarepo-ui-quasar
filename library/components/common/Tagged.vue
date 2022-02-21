<template>
  <q-btn-group outline size="sm" class="q-mr-md q-my-xs">
    <template v-if="position === 'left'">
      <q-btn outline color="primary" class="tagged-tag" size="sm">
        {{ tagVal }}
      </q-btn>
      <q-btn outline size="sm" class="tagged-value">
        {{ valueVal }}
      </q-btn>
    </template>
    <template v-else>
      <q-btn outline size="sm" class="tagged-value">
        {{ valueVal }}
      </q-btn>
      <q-btn outline color="primary" class="tagged-tag" size="sm">
        {{ tagVal }}
      </q-btn>
    </template>
  </q-btn-group>

</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {useLocale} from "../../services/locale";

const props = withDefaults(defineProps<{
  modelValue: any,
  position: "left" | "right"
  tag: string
  value: string
}>(), {
  position: "left",
  tag: "tag",
  value: "value"
})

const tagVal = computed(() => {
  return props.modelValue ? props.modelValue[props.tag] : undefined
})

const valueVal = computed(() => {
  return props.modelValue ? props.modelValue[props.value] : undefined
})

</script>