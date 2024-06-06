<script>

import {defineComponent} from "vue";
import MapAndMenu from "@/components/MapAndMenu.vue";


export default defineComponent( {
  components:{
    MapAndMenu,
  }
})
</script>

<template>
  <div>
  <div class="container">
  <map-and-menu></map-and-menu>
  </div>
  </div>


</template>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2% ;
}




</style>