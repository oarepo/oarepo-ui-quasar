<template>
  <div>
    <div v-for="val in modelValue || []">
      <q-badge>{{val.lang}}</q-badge> {{ val.value }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {useLocale} from "../../services/locale";

const props = defineProps<{
  modelValue: any
}>()
</script>