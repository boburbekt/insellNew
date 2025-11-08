// src/i18n.ts
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    legacy: false,
    locale: 'uz',
    fallbackLocale: 'en',
    messages: {
        uz: {
            hello: 'Salom'
        },
        en: {
            hello: 'Hello'
        }
    }
})

export default i18n
