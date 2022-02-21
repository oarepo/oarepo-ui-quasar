import {Notify} from 'quasar'

export function notify(opts: {
    timeout?: number,
    message: string,
    color?: string,
    actions?: Array<{
        retval: string,
        label: string,
        color?: string
    }>
}) {
    opts = {
        ...{
            timeout: 5000,
            actions: []
        },
        ...opts
    }
    return new Promise<string | undefined>(resolve => {
        Notify.create({
            progress: true,
            message: opts.message,
            timeout: opts.timeout,
            color: opts.color,
            onDismiss: () => resolve(undefined),
            actions: (opts.actions || []).map(x => ({
                label: x.label,
                color: x.color || 'secondary',
                handler: () => resolve(x.retval)
            }))
        })
    })
}
