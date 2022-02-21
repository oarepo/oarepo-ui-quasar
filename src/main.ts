// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './style.sass'

import OARepoUIQuasar from '@oarepo/oarepo-ui-quasar'

import Creator from './components/listing/Creator.vue'

OARepoUIQuasar.boot({
    pages: {
        default: {
            // homepage: () => import('./MyHomepage.vue')
        }
    },
    components: {
        default: {
            listing: {
                'creator': Creator
            }
        }
    }
})
