import {SchemaField} from "blitzar";
import {useUIContext} from "../api/ui_context";
import {useUI} from "../services/ui";
import {RepositoryFormComponents, Writeable} from "../types/configuration";
import {computed, markRaw} from "vue";
import {StringOrLayoutComponent, UILayoutComponent} from "../types/ui_context";

export function resolveComponent(component: StringOrLayoutComponent | undefined,
                                 components: RepositoryFormComponents): UILayoutComponent {
    if (component === undefined) {
        return {
            component: components['__default__']
        }
    }
    if (typeof component === 'string') {
        return {
            component: components[component] || components['__default__']
        }
    }
    if (typeof component.component === 'string') {
        return {
            ...component,
            component: components[component.component || '__default__'] || components['__default__']
        }
    }
    if (component.component === undefined) {
        return {
            ...component,
            component: components['__default__']
        }
    }
    return component
}

export function layout2blitzar(schema: SchemaField[], components: RepositoryFormComponents) {
    return schema.map((fld: SchemaField) => {
        const componentName = (fld.component || '__default__') as string
        const ret: Writeable<SchemaField, string> = {
            ...fld,
            component: markRaw(components[componentName] || components['__default__'])
        }
        if (!fld.id) {
            // no id => that means generated value
            ret.parseValue = (val: any, context: any) => {
                return context.formData
            }
        }
        ret['components'] = components
        if (fld.schema) {
            ret.schema = layout2blitzar(fld.schema as SchemaField[], components)
        }
        return ret
    })
}


export function loadUIBlitzarSchema(datamodel: string, layoutType: ('detail' | 'listing')) {

    const {current: uiContext} = useUIContext()
    const {currentComponents} = useUI()

    return computed(() => {
        let currentUiContext = uiContext.value;
        if (!currentUiContext || !currentComponents.value.listing) {
            return undefined
        }
        return layout2blitzar(currentUiContext[datamodel][layoutType].layout, currentComponents.value[layoutType])
    })
}