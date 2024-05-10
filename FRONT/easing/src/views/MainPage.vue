<script>

import {defineComponent} from "vue";
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";
import MapAndMenu from "@/components/MapAndMenu.vue";


export default defineComponent( {
  components:{
    MapAndMenu,

  },
  setup(){
    const store = useRoomsStore();
    const {currentFloor, hours, temperature, person} = storeToRefs(store);
    const {changeFloor} = store;


    const toggleFloor = () =>{
      changeFloor();
    }

    return{
      currentFloor,
      toggleFloor,
      hours,
      temperature,
      person
    }
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