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
import {defineComponent, onBeforeMount} from "vue";
import {useRoomsStore} from "@/store/rooms";


export default defineComponent({
  name: 'App',
  components: {
    FooTer,
    navBar
  },
  setup(){
    const store = useRoomsStore();
    const {initializeSocket} = store
    onBeforeMount(async ()=>{
      await initializeSocket();

    })
  }

})
</script>

<style>
body{
  margin: 0;
  padding: 0;
}

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

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


</style>
