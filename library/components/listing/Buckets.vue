
<template>
  <div v-for="bucket in facet.buckets" class="q-ml-lg q-mr-md" :class="{'bucket-selected': bucket.is_selected}">
    <router-link :to="addToQuery(facet, bucket)" class="bucket-link">
      <span class="bucket-label">{{ bucket.label }}</span> <span class="bucket-count">({{
        bucket.doc_count
      }})</span>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";
import {useRoute} from "vue-router";
import {AggregationWithName} from "../../types/invenio";
import {updateQuery} from "../../utils/vue_utils";

const route = useRoute()

const props = defineProps<{
  facet: AggregationWithName
}>()

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