import { type I18nOptions, createI18n } from 'vue-i18n'

export const SUPPORTED_LOCALES: Record<string, string> = {
  en: 'English',
  fr: 'French',
  nl: 'Nederlands',
}

export const DEFAULT_LOCALE = 'en'

export const i18Options: I18nOptions = {
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'nl',
  legacy: false,
}

export const i18n = createI18n(i18Options)
