<template>
  <div id="app">
      <nav-bar></nav-bar>
      <router-view/>
      <foo-ter></foo-ter>
  </div>
</template>

<script>
import navBar from "@/components/NavBar.vue";
import FooTer from "@/components/FooTer.vue";

export default {
  name: 'App',
  components: {
    FooTer,
    navBar

  },
  data: () => ({

  }),
}
</script>

<style>
#app{
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
