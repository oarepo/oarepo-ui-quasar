<template>
  <q-btn-group outline size="sm" class="q-mr-md q-my-xs">
    <q-btn outline color="primary" class="bg-primary text-white persistent-identifier-left" size="sm">
      {{ modelValue?.scheme }}
    </q-btn>
    <q-btn outline size="sm" class="persistent-identifier-right">
      {{ modelValue?.identifier }}
    </q-btn>
  </q-btn-group>

</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {useLocale} from "../../services/locale";

const props = defineProps<{
  modelValue: any
}>()
</script>