<template>
  <q-page padding>
    <div class="record" :class="{loading: loading}">
      <BlitzForm :modelValue="record" :schema="uiSchema" v-if="uiSchema && record"/>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import {BlitzForm} from 'blitzar'

import {defineProps} from "vue";
import {useDetail} from "../api/detail";
import {loadUIBlitzarSchema} from "../utils/form_utils";
import {runAndWatch} from "../utils/watch";


const props = defineProps({
  datamodel: String,
  recordId: String
})

const {load, record, loading} = useDetail()

runAndWatch([() => props.datamodel, () => props.recordId], async () => {
  await load(props.datamodel!, props.recordId!)
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})

const uiSchema = loadUIBlitzarSchema(props.datamodel!, 'detail')
</script>