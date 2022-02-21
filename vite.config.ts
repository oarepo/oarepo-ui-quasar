import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import path from "path"
import fs from "fs"
import os from 'os'

const homedir = os.homedir()

function rfs(p: string) {
    try {
        return fs.readFileSync(`${homedir}/.ssh/dev/{p}`)
    } catch {
        return undefined
    }
}


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {transformAssetUrls}
        }),

        quasar({
            sassVariables: 'src/quasar-variables.sass'
        })
    ],
    resolve: {
        alias: {
            '@oarepo/oarepo-ui-quasar': path.resolve(__dirname, 'library')
        }
    },
    server: {
        host: 'localhost',
        port: 5000,
        https: true,
        proxy: {
            "/api": {
                target: "https://127.0.0.1:8080/",
                changeOrigin: false,
                secure: false
            },
        }
    }
})