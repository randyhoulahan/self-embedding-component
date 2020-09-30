import { build, opts, createAppDiv, insertElement } from './core.js'

export const loadScript = (url) => {
  const tag = document.createElement('script')

  tag.charset  = 'utf-8'
  tag.nomodule = true
  tag.src      = url

  const promiseFn = (resolve, reject) => {
    insertElement(tag)
    tag.onload  = () => resolve(true)
    tag.onerror = () => reject(false)
  }

  return new Promise(promiseFn)
}

export const buildLegacyWidget = async ( theComponent, options = {}, plugins ) => {
  const opts                     = build(options, true)
  const { dependencies:{ all } } = opts

  if(all && all.length)
    for (let i = 0; i < all.length; i++)
      await loadScript(all[i].url)
  
  loadVuePlugins(plugins)
  loadApp(theComponent)
}

function mounted (){
  const i18n                      = getI18n()
  const { propsData }             = opts
  const VueClass                  = window['Vue'].extend(this.$options.theComponent)
  const classInstanceProps        = i18n? { i18n, propsData } : { propsData }
  const vueClassInstance          = new VueClass(classInstanceProps)

  vueClassInstance.$mount()

  this.$el.appendChild(vueClassInstance.$el)
}


const loadApp =  (theComponent) => {
  createAppDiv()

  new window['Vue']({ mounted, theComponent }).$mount(`#${opts.appId}`)
}

function getI18n(){
  if(window['VueI18n'])
    return new window['VueI18n']({ locale: 'en', fallbackLocale: 'en', messages: { en: {} } })
  return undefined
}

function loadVuePlugins(plugins){ // eslint-disable-line
  const { dependencies:{ vuePlugins }, propsData: { forceEnv } } = opts
  const pluginOptionsDefault = { forceEnv }

  if(vuePlugins && vuePlugins.length) 
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

  if(plugins && plugins.length)
    for (const plugin of plugins)
      if(plugin.install)
        window.Vue.use(plugin, { ...pluginOptionsDefault })
      else if(plugin.default && plugin.default.install)
        window.Vue.use(plugin.default, { ...pluginOptionsDefault })
}