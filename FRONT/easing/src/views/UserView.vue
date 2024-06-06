<script>

import {defineComponent} from "vue";
import NavBar from "@/components/NavBar.vue";
import FooTer from "@/components/FooTer.vue";


export default defineComponent( {
  components: {FooTer, NavBar}
})
</script>

<template>
  <div class="container">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <foo-ter></foo-ter>
  </div>
</template>

<style scoped>
body{
  margin: 0;
  padding: 0;
}





</style>