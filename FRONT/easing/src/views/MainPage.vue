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
  <v-alert class="mx-10"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
      title="Alert title"
      type="info"
      density="compact"
  ></v-alert>
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

  <div class="ml-15">
    <v-btn variant="tonal" @click="toggleFloor" color="primary">
      Move from the {{currentFloor}} floor
    </v-btn>
    <HouseMap></HouseMap>
  </div>


</template>

<style scoped>
</style>