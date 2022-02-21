<template>
  <div class="row">
    <template v-for="(val, idx) in valuesAndComponents">
      <span v-if="idx>0">,&nbsp; </span>
      <component :is="val.component" :modelValue="val.modelValue"
                 v-bind="val.props"
                 :components="components"
                 :context="{values: modelValue, index: idx}"></component>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {RepositoryFormComponents} from "@oarepo/oarepo-ui-quasar";
import {computed, defineProps} from "vue";
import {StringOrLayoutComponent, UILayout, UILayoutComponent} from "../../types/ui_context";
import {resolveComponent} from "../../utils/form_utils";

const props = defineProps<{
  modelValue: Array<any> | { [k: string]: any },
  item?: StringOrLayoutComponent,
  schema?: UILayout,
  components: RepositoryFormComponents
  flat?: boolean
}>()

function fromSchema(modelValue: { [p: string]: any }, schema: UILayout, flat?: boolean) {
  const ret = []
  schema.forEach(x => {
    let value = x.id ? modelValue[x.id] : modelValue
    if (value === undefined) {
      return
    }
    x = resolveComponent(x, props.components)
    console.log(x)
    if (Array.isArray(value) && flat) {
      value.forEach(val => {
        ret.push({
          component: x.component,
          modelValue: val,
          props: x
        })
      })
    } else {
      ret.push({
        component: x.component,
        modelValue: value,
        props: x
      })
    }
  })
  return ret
}

function fromArray(modelValue: Array<any>, item?: StringOrLayoutComponent, flat?: boolean) {
  const ret = []
  if (!modelValue) {
    return []
  }
  const resolvedItem: UILayoutComponent = resolveComponent(item, props.components)
  modelValue.forEach(value => {
    if (value === undefined) {
      return
    }
    if (Array.isArray(value) && flat) {
      value.forEach(val => {
        ret.push({
          'component': resolvedItem.component,
          'modelValue': val,
          'props': resolvedItem
        })
      })
    } else {
      ret.push({
        'component': resolvedItem.component,
        'modelValue': value,
        'props': resolvedItem
      })
    }
  })
  return ret
}

const valuesAndComponents = computed(() => {
  if (props.modelValue === undefined) {
    return []
  }
  if (props.schema) {
    return fromSchema(props.modelValue, props.schema, props.flat)
  }
  return fromArray(props.modelValue as any[], props.item, props.flat)
})
</script>