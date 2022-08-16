import { createI18n } from 'vue-i18n'
import { useCookies } from 'vue3-cookies'
import locales from '@/locales'

const { cookies } = useCookies()
const locale      = cookies.get('locale') ?? import.meta.env.VITE_I18N_LOCALE
const i18n        = createI18n({
  legacy          : false,
  globalInjection : true,
  locale          : locale,
  fallbackLocale  : import.meta.env.VITE_I18N_FALLBACK_LOCALE,
  messages        : { ...locales }
})

export default i18n