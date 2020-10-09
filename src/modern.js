import { build, createAppDiv } from './core.js'

const getMounted = (opts) => function mounted (){
  const i18n                      = getI18n(opts.propsData.options)
  const { compName, propsData }   = opts
  const VueClass                  = window['Vue'].extend(window[compName])

  const classInstanceProps        = i18n? { i18n, propsData } : { propsData }
  const vueClassInstance          = new VueClass(classInstanceProps)

  vueClassInstance.$mount()
  
  this.$el.appendChild(vueClassInstance.$el)
}

const loadSelf =  (opts) => {
  const { cdnUrl, compName, selfUrl } = opts

  return loadScript({ url: selfUrl || cdnUrl, name: compName })
}


const loadApp =  (opts) => {
  createAppDiv(opts)

  new window['Vue']({ mounted: getMounted(opts) }).$mount(`#${opts.appId}`)
}

const loadScript = (dep) => {
  const { name, url } = dep

  if(!window[name])
    return import(url).then((resolvedDep) => window[name]=resolvedDep.default? resolvedDep.default : resolvedDep)
  return window[name]
}

export const buildWidget = async (options = {}) => {
  const opts = build(options)

  const { dependencies:{ all } } = opts
  const   dependencyPromises     = []

  if(all)
    for (let i = 0; i < all.length; i++)
      dependencyPromises.push(loadScript(all[i]))

  await Promise.all(dependencyPromises)

  loadVuePlugins(opts)
  await loadSelf(opts)
  loadApp(opts)
}

function loadVuePlugins(opts){
  const { dependencies:{ vuePlugins }, propsData: { forceEnv } } = opts
  const pluginOptionsDefault = { forceEnv }

  if(!vuePlugins) return
  for (let i = 0; i < vuePlugins.length; i++)
    if(!window[vuePlugins[i].name]){ throw new Error(`${vuePlugins[i].name} not found on global object`) }
    else{
      const plugin = window[vuePlugins[i].name]

      if(plugin.install)
        window.Vue.use(plugin, { ...vuePlugins[i].options||{}, ...pluginOptionsDefault })
      else
      if(plugin.default && plugin.default.install)
        window.Vue.use(plugin.default, { ...vuePlugins[i].options||{}, ...pluginOptionsDefault })
    }
}

function getI18n({ i18n, locale='en' }){
  const messages = i18n? i18n.messages : { en: {} }

  if(window['VueI18n'])
    return new window['VueI18n']({ locale, fallbackLocale: 'en', messages })

  return undefined
}