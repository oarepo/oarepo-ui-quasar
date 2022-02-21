<template>
  <q-expansion-item :label="facet.label">
    <repository-component cid="facets.buckets" :facet="facet"/>
  </q-expansion-item>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";
import {AggregationWithName} from "../../types/invenio";

const props = defineProps<{
  facet: AggregationWithName
}>()
</script>
