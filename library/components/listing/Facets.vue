<template>
  <q-list dense>
    <q-expansion-item v-for="facet in facets_as_list" :label="facet.label" :key="facet.name">
      <div v-for="bucket in facet.buckets" class="q-ml-lg q-mr-md" :class="{'bucket-selected': bucket.is_selected}">
        <router-link :to="addToQuery(facet, bucket)" class="bucket-link">
          <span class="bucket-label">{{ bucket.label }}</span> <span class="bucket-count">({{
            bucket.doc_count
          }})</span>
        </router-link>
      </div>
    </q-expansion-item>
  </q-list>
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {useRoute} from "vue-router";
import {Aggregations} from "../../types/invenio";
import {updateQuery} from "../../utils/vue_utils";

const route = useRoute()

const props = defineProps<{
  facets: Aggregations
}>()

const facets_as_list = computed(() => {
  return Object.entries(props.facets || {}).map(([name, facet]) => {
    return {
      name: name,
      buckets: facet.buckets,
      label: facet.label || name
    }
  })
})

function addToQuery(facet, bucket) {
  return updateQuery(
      route,
      [
        {paramName: facet.name, paramValue: bucket.key},
      ],
      ['page'],
      true)
}
</script>