<template>
  <div>
    <q-markup-table class="static-table" flat wrap-cells>
      <tbody>
      <tr v-for="fld in fieldsToShow" :key="fld.key">
        <th style="width: 10%">{{ fld.label }}</th>
        <td>
          <div v-if="fld.inline" class="row">
            <template v-for="val in fld.value || []">
              <component :is="fld.component" v-bind="fld.componentContext" v-if="fld.component"
                         :modelValue="val" :components="components"/>
              <template v-else>
                {{ val }}
              </template>
            </template>
          </div>
          <component :is="fld.component" v-bind="fld.componentContext" v-else-if="fld.component"
                     :modelValue="fld.value" :components="components"/>
          <template v-else>
            {{ fld.value }}
          </template>
        </td>
      </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script lang="ts" setup>
import {RepositoryFormComponents} from "@oarepo/oarepo-ui-quasar";
import {computed} from "vue";
import {UILayoutComponent, UITableFieldComponents} from "../../types/ui_context";
import {resolveComponent} from "../../utils/form_utils";

const props = defineProps<{
  modelValue: any
  fields?: string[],
  fieldComponents?: UITableFieldComponents
  excluded?: string[],
  components: RepositoryFormComponents
}>()


const fieldIds = computed(() => {
  if (props.fields?.length) {
    return props.fields
  }
  const ret = Object.keys(props.modelValue || {})
  ret.sort((a, b) => {
    return a.localeCompare(b)
  })
  return ret
})

function getTableComponent(key, fieldId, fieldComponentDef, value) {
  if  (fieldComponentDef.pull) {
    const pull = fieldComponentDef.pull
    const pullComponent = resolveComponent(pull.component, props.components)
    return {
      key: key,
      label: value[pull.key],   // TODO: i18n
      inline: fieldComponentDef.inline,
      componentContext: pullComponent,
      component: pullComponent.component,
      value: value[pull.value]
    }
  }
  return {
    key: key,
    label: fieldId,   // TODO: i18n
    inline: fieldComponentDef.inline,
    componentContext: fieldComponentDef,
    component: fieldComponentDef.component,
    value: value
  }
}

const fieldsToShow = computed(() => {
  const ret = []
  fieldIds.value.forEach(fieldId => {
    if ((props.excluded || []).includes(fieldId)) {
      return
    }
    let value = props.modelValue[fieldId]
    if (value !== undefined) {
      let fieldComponentDef: UILayoutComponent = resolveComponent(
          props.fieldComponents ? props.fieldComponents[fieldId] : undefined,
          props.components);

      if (Array.isArray(value) && fieldComponentDef.array && !fieldComponentDef.inline) {
        value.forEach((val, idx) => {
          ret.push(getTableComponent(`${fieldId}.${idx}`, fieldId, fieldComponentDef, val))
        })
      } else {
        ret.push(getTableComponent(fieldId, fieldId, fieldComponentDef, value))
      }
    }
  })
  return ret
})
</script>