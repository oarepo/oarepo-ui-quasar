<template>
  <q-list dense>
    <repository-component cid="facets.facet" :facet="facet" v-for="facet in facets_as_list" :key="facet.name"/>
  </q-list>
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {Aggregations, AggregationWithName} from "../../types/invenio";

const props = defineProps<{
  facets: Aggregations
}>()

const facets_as_list = computed<AggregationWithName[]>(() => {
  return Object.entries(props.facets || {}).map(([name, facet]) => {
    return {
      name: name,
      buckets: facet.buckets,
      label: facet.label || name
    }
  })
})
</script>