import { camelCase, pascalCase } from 'change-case'
import   getDefaultOptions       from './default-options'

const parentNode  = ''
const selfElement = ''

export let opts = {}

export const createAppDiv = () => {
  const divTag = document.createElement('div')

  divTag.id = opts.appId

  insertElement(divTag)
}

export const  insertElement = (el) => {
  opts.parentNode.insertBefore(el, opts.selfElement)
}

export const build = (options, legacy=false) => {
  if(!options.name) throw new Error('EmbedComponent requires name to be set in options')

  const regX = new RegExp('(@.+/)', 'ig')

  opts = { ...getDefaultOptions(options), parentNode, selfElement,
           get selfId(){ return this.id? this.id : this.name.replace(regX, '') },
           set selfId(id){ this.id = id },
           get appId(){ return `appId-${this.selfId}` },
           get compName(){ return pascalCase((this.selfId)) },
           get cdnUrl(){ return this.version? `${this.cdn}/${this.name}@${this.version}` : `${this.cdn}/${this.name}` } }

  normalizeVuePlugins()
  initElements(legacy)
  loadCss()

  return opts
}

export const initElements = (legacy) => {
  const elementId = legacy? `${opts.selfId}-legacy` : opts.selfId

  opts.selfElement = document.getElementById(elementId)

  if(!opts.selfElement) throw new Error(`Id on script tag not found: id="${elementId}"`)

  opts.propsData.options = attrsAsOptions()
  opts.parentNode        = opts.selfElement.parentNode
}

function attrsAsOptions(){
  const   self         = opts.selfElement
  const { options }    = opts.propsData
  const   attrs        = self.attributes
  const   newOptions   = {}

  if (!self.hasAttributes()) return options

  for (const { name, value } of attrs){
    if([ 'id', 'src', 'type' ].includes(name)) continue

    newOptions[camelCase(name)]=value
  }
  
  return Object.assign(options, newOptions)
}

function loadCss(){
  const { dependencies: { css } } = opts

  if(css && css.length)
    css.forEach(cssUrl => loadLink(cssUrl))
}

function loadLink (url){
  const tag = document.createElement('link')

  tag.rel     = 'stylesheet'
  tag.charset = 'utf-8'
  tag.href    = url

  insertElement(tag)
}

function normalizeVuePlugins(){
  const { dependencies      :{ all, vuePlugins } } = opts

  if(!vuePlugins || !vuePlugins.length) return

  const allNames = all.map(mapByName)

  for (const plugin of vuePlugins)
    if(!allNames.includes(plugin.name))
      all.push(plugin)
}

function mapByName({ name }){
  return name
}