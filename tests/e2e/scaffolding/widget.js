import { buildWidget, dependencyRef } from '../../../src/index.mjs'

const name      = '@action-agenda/search'
const version   = '0.0.11'
const options   = {}
const propsData = { options, forceEnv:'dev' }

const selfUrl = 'http://localhost:8089/dist/browser/index.js'
const { VUE, VUE_I18N} = dependencyRef

const dependencies      = { all: [VUE, VUE_I18N], 
                            vuePlugins:[VUE_I18N], 
                            css: ['https://cdn.cbd.int/@scbd/www-css']
                          }

const config            = { version, name, propsData, dependencies, selfUrl }

buildWidget(config)


