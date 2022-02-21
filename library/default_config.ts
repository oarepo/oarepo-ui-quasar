import {markRaw} from "vue";

import RepositoryApplication from './app/RepositoryApplication.vue'
import CommaSeparated from './components/common/CommaSeparated.vue'
import DateComponent from './components/common/Date.vue'

import MultilingualCurrrentText from './components/common/MultilingualCurrrentText.vue'
import Menu from './components/layout/Menu.vue'

import PageTitle from './components/layout/PageTitle.vue'

import Default from './components/listing/Default.vue'
import Facets from './components/listing/Facets.vue'
import MainLayout from './layouts/MainLayout.vue'
import DetailPage from './pages/DetailPage.vue'
import ErrorPage from './pages/ErrorPage.vue'
import Homepage from './pages/Homepage.vue'
import ListPage from './pages/ListPage.vue'
import {RepositoryAppOptions} from "./types/configuration"


export const defaultOptions: RepositoryAppOptions = {
    defaultLocale: 'en',
    extraRoutes: [],
    appComponent: RepositoryApplication,
    pages: {
        default: {
            homepage: Homepage,
            list: ListPage,
            detail: DetailPage,
            error: ErrorPage,
        }
    },
    layouts: {
        "default": {
            homepageLayout: MainLayout,
            listLayout: "homepage",
            detailLayout: "homepage",
        }
    },
    components: {
        default: {
            listing: {
                __default__: markRaw(Default),
                'multilingual-current': markRaw(MultilingualCurrrentText),
                'comma-separated': markRaw(CommaSeparated),
                'date': markRaw(DateComponent),
            },
            pageTitle: PageTitle,
            menu: {
                component: Menu
            },
            facets: {
                container: Facets
            }
        }
    }
}
