import {SchemaField} from "blitzar";
import {RepositoryFormComponents, Writeable} from "../types/configuration";
import {markRaw} from "vue";

export function layout2blitzar(schema: SchemaField[], components: RepositoryFormComponents) {
    return schema.map((fld: SchemaField) => {
        const componentName = (fld.component || '__default__') as string
        const ret: Writeable<SchemaField, string> = {
            ...fld,
            component: markRaw(components[componentName] || components['__default__'])
        }
        if (fld.itemComponent) {
            ret.itemComponent = markRaw(components[fld.itemComponent as string] || components['__default__'])
        }
        if (!fld.id) {
            // no id => that means generated value
            ret.parseValue = (val: any, context: any) => {
                return context.formData
            }
        }
        if (fld.schema) {
            ret.schema = layout2blitzar(fld.schema as SchemaField[], components)
        }
        return ret
    })
}
