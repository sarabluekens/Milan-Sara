import { type I18nOptions, createI18n } from 'vue-i18n'

export const SUPPORTED_LOCALES: Record<string, string> = {
  en: 'English',
  zh: '中國人',
  nl: 'Nederlands',
  es: 'Español',
}

export const DEFAULT_LOCALE = 'nl'

export const i18Options: I18nOptions = {
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
  legacy: false,
}

export const i18n = createI18n(i18Options)
