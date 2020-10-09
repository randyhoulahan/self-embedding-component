import { setDefaultOptions, getDefaultOptionsFunction } from '@houlagins/default-options'
import { name                                         } from '../package.json'

const cdn = 'https://unpkg.com'

export default getDefaultOptionsFunction(name)

export const dependencyRef = {
  VUE     : { url: `${cdn}/vue@2.6.11/dist/vue.esm.browser.min.js`, name: 'Vue' },
  VUE_I18N: { url: `${cdn}/vue-i18n@8.21.1/dist/vue-i18n.esm.browser.min.js`, name: 'VueI18n' },
  legacy  : {
    VUE     : { url: `${cdn}/vue@2.6.11`, name: 'Vue' },
    VUE_I18N: { url: `${cdn}/vue-i18n@8.21.1`, name: 'VueI18n' }
  }
}

const validationMap = {
  id           : String,
  appId        : String,
  name         : String,
  selfId       : String,
  compName     : String,
  version      : String,
  propsData    : Object,
  cdnUrl       : String,
  cdn          : String,
  dependencies : Object,
  dependencyRef: Object,
  selfUrl      : String
}

const dependencies = { all: [],  css: [], vuePlugins: [], legacy: [] }

const dev     = { dependencyRef, cdn, dependencies  }
const stg     = { ...dev }
const prod    = { ...stg }

const environments  = { prod, stg, dev }

setDefaultOptions({ environments, validationMap, name })