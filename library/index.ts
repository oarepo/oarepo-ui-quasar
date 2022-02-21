import QuerySynchronizer from '@oarepo/vue-query-synchronizer'
import {Notify, Quasar, LoadingBar} from "quasar";
import {App, createApp} from "vue";
import {initializeRepository} from "./api/repository";

import {defaultOptions} from "./default_config";
import {createAppRouter} from "./router";
import {RepositoryAppOptions} from "./types/configuration";
import {vueMerge} from "./utils/vue_utils";

import RepositoryComponent from './components/RepositoryComponent.vue'

export * from "./types/configuration"

const OARepoUIQuasar = {
    install: (app: App, options: RepositoryAppOptions) => {
        initializeRepository(options)
        app.component('repository-component', RepositoryComponent)
        app.use(Quasar, {
            plugins: {
                Notify,
                LoadingBar
            }, // import Quasar plugins and add here
        })

        LoadingBar.setDefaults({
            color: 'purple',
            size: '15px',
            position: 'bottom'
        })

        const router = createAppRouter(options)
        app.use(router)

        app.use(QuerySynchronizer, {
            router: router
        })
    },
    boot(options?: Partial<RepositoryAppOptions>) {
        if (options === undefined) {
            options = defaultOptions
        } else {
            options = vueMerge(defaultOptions, options)
        }

        const myApp = createApp(options.appComponent!)
        myApp.use(OARepoUIQuasar, options)
        myApp.mount('#app')
        return myApp
    }
}

export default OARepoUIQuasar