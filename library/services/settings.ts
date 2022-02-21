class Settings {
    baseUrl = '/api'

    get uiContextUrl() {
        return this.baseUrl + '/oarepo:ui'
    }

    get apiUrl() {
        return this.baseUrl
    }
}

export const settings = new Settings()