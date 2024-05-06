<script>
import {defineComponent} from "vue";
import HouseMap from "@/components/HouseMap.vue";
import MenuSide from "@/components/MenuSide.vue";
import ParamCard from "@/components/ParamCard.vue";
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";



export default defineComponent({
  name: "MapAndMenu",
  components: {ParamCard, MenuSide, HouseMap},
  setup(){
    const store = useRoomsStore();
    const{temperature, person, hours} = storeToRefs(store)

    return{
      temperature,
      person,
      hours
    }
  }})


</script>


<template>
  <div class="container">

      <div class="params">
        <ParamCard color="#588BEF" :size="50" title="Temperature" type_entry="number" image="fa-solid fa-temperature-low" :type_value="1" :value="temperature.toString()"></ParamCard>
        <ParamCard color="#067CB3" :size="50" title="Hours" type_entry="time" image="fa-regular fa-clock" :type_value="2" :value="hours.toString()"></ParamCard>
        <ParamCard color="#001CAD" :size="33" title="Person" type_entry="number" image="fa-solid fa-user-group" :type_value="3" :value="person.toString()"></ParamCard>
      </div>

      <div class="icons-params">
        <div class="sec_icon">
          <i class="fa-solid fa-lock icons"></i>
        </div>
        <div class="brightness-icon">
          <i class="fa-solid fa-sun icons param-icon"></i>
          <i class="fa-solid fa-cloud icons  param-icon"></i>
          <i class="fa-solid fa-moon icons param-icon"></i>
        </div>
      </div>

      <div class="content">
        <house-map></house-map>
        <menu-side></menu-side>
      </div>

  </div>
</template>

<style scoped>

.container{
  display: flex;
  flex-direction: column;
}

.params{
  display: flex;
  flex-wrap: wrap;
  gap: 100px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10%;
  width: 100%;
}

.icons-params{

  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin: 2% 0;
}

.sec_icon{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 100%;
  background-color:red;
  border-radius: 10px;
}

.sec_icon:hover{
  cursor: pointer;
  opacity: 0.7;
}

.brightness-icon{
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.param-icon{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80px;
  height: 100%;
  background-color:#067CB3;;
  border-radius: 10px;
}

.icons{
  font-size: 25px;
  color: #FFFF;
}


.content{

  display: flex;
  flex-wrap: wrap;
}

@media (max-width: 700px) {

  .container{
    display: flex;
  }
  .params{
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
  }

.icons-params{
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 8%;
  margin-bottom: 25%;


}

  .brightness-icon{
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    flex-direction: column;


  }
  
}

</style>