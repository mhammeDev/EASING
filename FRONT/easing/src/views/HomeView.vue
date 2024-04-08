<template>
  <HouseMap />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import HouseMap from "@/components/HouseMap.vue";

export default defineComponent({
  name: 'HomeView',

  components: {
    HouseMap,
  },
});
</script>
