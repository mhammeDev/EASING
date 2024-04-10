<script>
import HouseMap from "@/components/HouseMap.vue";
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";


export default {
  components:{
    HouseMap
  },
  setup(){
    const store = useRoomsStore();
    const {currentFloor, hours, temperature} = storeToRefs(store);
    const {changeFloor} = store;


    const toggleFloor = () =>{
      changeFloor();
    }

    return{
      currentFloor,
      toggleFloor,
      hours,
      temperature
    }
  }

}
</script>

<template>
  <v-container>
    <v-sheet class="d-flex justify-start flex-column">
      <p class="text-h2 text-center mb-4">Prototype Easiling</p>
      <v-text-field
          type="number"
          label="Température"
          min="-12"
          max="50"
          :model-value="temperature"
          outlined
          class="mb-3"
      ></v-text-field>
      <v-slider
          min="0"
          max="24"
          step="1"
          :model-value="hours"
          label="Heure"
          thumb-label="always"
          class="my-3"
      ></v-slider>
    </v-sheet>

  </v-container>

  <v-container class="flex-column ml-4 mr-4">
    <v-btn variant="tonal" @click="toggleFloor" color="primary">
      Move from the {{currentFloor}} floor
    </v-btn>
    <HouseMap class="pa-lg-7"  ></HouseMap>
  </v-container>

</template>

<style scoped>
</style>