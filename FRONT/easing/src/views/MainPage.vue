<script>
import HouseMap from "@/components/HouseMap.vue";
export default {
  components:{
    HouseMap
  }

}
</script>

<template>
  <v-container class="d-flex justify-start flex-column">
    <v-sheet class="ma-4 pa-4">
      <p class="text-h2 text-center mb-4">Prototype Easiling</p>
      <v-text-field
          type="number"
          label="Température"
          outlined
          class="mb-3"
      ></v-text-field>
      <v-slider
          min="0"
          max="24"
          step="1"
          label="Heure"
          thumb-label="always"
          class="my-3"
      ></v-slider>
    </v-sheet>
  </v-container>
  <v-container class="d-flex">
    <HouseMap class="pa-lg-7"></HouseMap>
  </v-container>

</template>

<style scoped>
</style>