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


::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(0,0,0,0%);
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: #939393;
  width: 5px;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #4d4d4d;;
}

.group-devices:hover{
  border-radius: 10px;
  cursor: default;
  background: #3aa9dd;


}
</style>
