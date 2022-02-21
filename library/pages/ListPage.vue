<template>
  <q-page padding>
    <div class="records-list" v-if="records.length" :class="{loading: loading}">
      <q-list separator>
        <q-item v-for="record in records" :key="record.id">
          <q-item-section>
            <BlitzForm :modelValue="record.metadata" :schema="uiSchema" v-if="uiSchema"/>
          </q-item-section>
        </q-item>
      </q-list>
      <q-pagination :max="pages" :max-pages="10" :modelValue="currentPage" class="q-mt-lg q-ml-md" v-if="pages>1"
                    @update:model-value="pageChanged"></q-pagination>
    </div>
    <div v-else-if="!loading">
      Nothing found ...
    </div>
    <teleport to="#sidebar" v-if="sidebarVisible">
      <repository-component id="facets.container" :facets="facets"/>
    </teleport>
  </q-page>
</template>
<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import RepositoryComponent from "../components/RepositoryComponent.vue";
import {useSidebar} from "../services/sidebar";
import {useListing} from "../api/listing";
import {useUI} from "../services/ui";
import {ListingOptions} from "../types/invenio";
import {updateQuery} from "../utils/vue_utils";
import {runAndWatch} from "../utils/watch";
import {useUIContext} from "../api/ui_context";

import {computed, defineProps} from "vue";
import {BlitzForm} from 'blitzar'
import {layout2blitzar} from "../utils/form_utils";

import {scroll} from 'quasar'

const {getScrollTarget, setVerticalScrollPosition} = scroll


const props = defineProps({
  datamodel: String
})

const route = useRoute()
const router = useRouter()

const {current: uiContext} = useUIContext()

const {sidebarVisible} = useSidebar()
const {load, records, pages, facets, loading} = useListing()
const {currentComponents} = useUI()

runAndWatch([() => props.datamodel, () => route.query], async () => {
  await load(props.datamodel!, route.query as ListingOptions)
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})

const currentPage = computed(() => {
  return parseInt(route.query.page as string || '1')
})


const uiSchema = computed(() => {
  let currentUiContext = uiContext.value;
  if (!currentUiContext || !currentComponents.value.listing) {
    return undefined
  }
  return layout2blitzar(currentUiContext[props.datamodel].listing.layout, currentComponents.value.listing)
})

function pageChanged(pageNo: number) {
  router.push(updateQuery(route, [{paramName: 'page', paramValue: pageNo.toString()}], []))
}

</script>
