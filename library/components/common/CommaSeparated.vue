<template>
  <div>
    <template v-for="(val, idx) in valuesAndComponents">
      <span v-if="idx>0">, </span>
      <component :is="val.component" :modelValue="val.modelValue"
                 v-bind="val.props"
                 :context="{values: modelValue, index: idx}"></component>
    </template>
  </div>
</template>
<script lang="ts" setup>
import {computed, defineProps} from "vue";
import {SchemaField} from "blitzar";

const props = defineProps<{
  modelValue: Array<any> | { [k: string]: any },
  itemComponent?: any,
  itemProperties?: any,
  schema?: Array<SchemaField>,
  flat?: boolean
}>()

function fromSchema(modelValue: { [p: string]: any }, schema: Array<SchemaField>, flat?: boolean) {
  const ret = []
  schema.forEach(x => {
    let value = x.id ? modelValue[x.id] : modelValue
    if (value === undefined) {
      return
    }
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
        'component': x.component,
        'modelValue': value,
        props: x
      })
    }
  })
  return ret
}

function fromArray(modelValue: Array<any>, itemComponent: any, itemProps: any, flat?: boolean) {
  const ret = []
  if (!modelValue) {
    return []
  }
  modelValue.forEach(x => {
    let value = x
    if (value === undefined) {
      return
    }
    if (Array.isArray(value) && flat) {
      value.forEach(val => {
        ret.push({
          'component': itemComponent,
          'modelValue': val,
          'props': itemProps
        })
      })
    } else {
      ret.push({
        'component': itemComponent,
        'modelValue': value,
        'props': itemProps
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
  return fromArray(props.modelValue as any[], props.itemComponent, props.itemProperties, props.flat)
})
</script>