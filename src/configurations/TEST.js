import { LANGUAGE } from '@statisticsnorway/dapla-js-utilities'

export const TEST_CONFIGURATIONS = {
  apiContext: fn => ({
    api: window.__ENV.REACT_APP_API,
    setApi: fn
  }),
  language: LANGUAGE.LANGUAGES.NORWEGIAN.languageCode
}
