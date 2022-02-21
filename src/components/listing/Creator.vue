<template>
  <span>
  {{ modelValue.fullName }}
    <q-tooltip v-if="hasTooltip">
      <template v-if="modelValue.affiliations?.length">
      <template v-for="(aff, idx) in modelValue.affiliations">
        <span v-if="idx>0">, </span>
        <span>{{ aff }}</span>
      </template>
      </template>
      <table v-if="modelValue.authorityIdentifiers?.length">
        <tr v-for="ai in modelValue.authorityIdentifiers">
          <td class="authority-scheme">{{ ai.scheme }}</td>
          <td class="authority-identifier">{{ ai.identifier }}</td>
        </tr>
      </table>
    </q-tooltip>
  </span>
</template>
<script lang="ts" setup>

import {computed} from "vue";

interface Authority {
  fullName: string
  nameType: "Personal" | "Organizational"
  affiliations?: string[]
  authorityIdentifiers?: Array<{
    scheme: string
    identifier: string
  }>
}

const props = defineProps<{
  modelValue: Authority
}>()

const hasTooltip = computed(() =>
    props.modelValue.affiliations?.length || props.modelValue.authorityIdentifiers?.length
)
</script>