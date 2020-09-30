---
sidebarDepth: 2
---
# Self Embedding Component

## Description
A service to build self installing components in html documents with a single script tag.  Or 2 script tags if supporting legacy browsers.

```html
<script nomodule="" id="view-legacy" src="https://cdn.cbd.int/@action-agenda/view@0.0.12/dist/widget/index.umd.min.js"></script>
<script  type="module" id="view" src="https://cdn.cbd.int/@action-agenda/view@0.0.12/dist/widget/index.min.js"></script> 
```

## Install

```bash
yarn add @houlagins/self-embedding-component

#OR 

npm install @houlagins/self-embedding-component
```

## API

### buildLegacyWidget

```js
import { buildLegacyWidget, dependencyRef } from '@houlagins/self-embedding-component'
import { name, version       } from '../package.json'

const options   = buildOptions()
const propsData = { options }

const { VUE }           = dependencyRef.legacy
const dependencies      = { all: [ VUE ],
                            css: [ 'https://cdn.cbd.int/@scbd/www-css' ] }

const config            = { version, name, propsData, dependencies }

buildLegacyWidget(config)

function buildOptions(){
  const basePath              = '/countries'
  const countryParamName      = 'country'
  const euIdentifier          = 'eur'
  const initEu                = false // false means manually init eu with custom functionality

  return { countryParamName, euIdentifier, initEu, basePath }
}

```
### buildWidget

```js
import { buildWidget, dependencyRef } from '@houlagins/self-embedding-component'
import { name, version              } from '../package.json'

const options   = buildOptions()
const propsData = { options }

const { VUE } = dependencyRef
const dependencies      = { all: [ VUE ],
                            css: [ 'https://cdn.cbd.int/@scbd/www-css' ] }

const config            = { version, name, propsData, dependencies }

buildWidget(config)

function buildOptions(){
  const basePath              = '/countries'
  const countryParamName      = 'country'
  const euIdentifier          = 'eur'
  const initEu                = false // false means manually init eu with custom functionality

  return { countryParamName, euIdentifier, initEu, basePath }
}
```
### dependencyRef
commonly used references to dependencies

```js
{
  VUE          : { url: `${cdn}/vue@~2.6/dist/vue.esm.browser.min.js`, name: 'Vue' },
  VUE_I18N     : { url: `${cdn}/vue-i18n@~8.21/dist/vue-i18n.esm.browser.min.js`, name: 'VueI18n' }
  legacy       : {
    VUE          : { url: `${cdn}/vue@~2.6/`, name: 'Vue' },
    VUE_I18N     : { url: `${cdn}/vue-i18n@~8.21`, name: 'VueI18n' }
  }
}
```