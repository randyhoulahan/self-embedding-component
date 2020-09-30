<template>
  <div id="app">
    
    <h1>Self Embeding Component</h1>
    <h2><span id="num-exports">{{thelib.length}}</span> exports:</h2>
    <div v-for="(anExport, index) in thelib" v-bind:key="index" :id="`export${index}`">{{anExport}}</div>
  </div>
</template>

<script>
import * as SEC from '../src/index.mjs'

export default {
  name: 'app',
  computed: { thelib }
}

function thelib(){
  return Object.keys(SEC)
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
