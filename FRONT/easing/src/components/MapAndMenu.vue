<script>
import {defineComponent, onMounted, ref, watch} from "vue";
import HouseMap from "@/components/HouseMap.vue";
import MenuSide from "@/components/MenuSide.vue";
import ParamCard from "@/components/ParamCard.vue";
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";

import AssistantChat from "@/components/AssistantChat.vue";
import {useUserStore} from "@/store/user";
import router from "@/router";


export default defineComponent({
  name: "MapAndMenu",
  components: {AssistantChat, ParamCard, MenuSide, HouseMap},
  setup(){
    const store = useRoomsStore();
    const{temperature, person, hours,security, external_luminosity, currentPiece, errorRequest} = storeToRefs(store)
    const {updateSecurity, updateExternalLight, initializeSocket, resetError, setNotificationMessage} = store

    const store2 = useUserStore();
    const {LogoutFromStore}= store2

    onMounted(async ()=>{
      await initializeSocket();
    })

    const displayChat = ref(false);

    watch(
        () => errorRequest.value,
        async (value) => {
          if(value === true){
            LogoutFromStore();
            resetError();
            await router.push("/")
            setNotificationMessage("❌", "Session has expired please log again", "error", "top-center")

          }
        }
    )


    const updateDisplayChat = () => {
      displayChat.value = !displayChat.value
    }


    return{
      temperature,
      person,
      hours,
      security,
      updateSecurity,
      updateExternalLight,
      external_luminosity,
      displayChat,
      updateDisplayChat,
      currentPiece
    }
  }})


</script>


<template>
  <div class="container">

      <div class="params">
        <ParamCard color="#588BEF" :size="50" title="Temperature" type_entry="number" image="fa-solid fa-temperature-low" :type_value="1" :value="temperature.toString()"></ParamCard>
        <ParamCard color="#067CB3" :size="50" title="Hours" type_entry="time" image="fa-regular fa-clock" :type_value="2" :value="hours.toString()"></ParamCard>
        <ParamCard color="#001CAD" :size="33" title="Person" type_entry="number" image="fa-solid fa-user-group" :type_value="3" :value="person.toString()"></ParamCard>
        <ParamCard v-if="currentPiece !== null" color="#0059ff" :size="33" :title="currentPiece.name" image="fa-solid fa-house-user" :objValue="currentPiece"></ParamCard>

      </div>

      <div class="icons-params unselectable">
          <i :class="security=== true ? 'fa-solid fa-lock icons param-icon sec' : 'fa-solid fa-unlock icons param-icon sec' " :style="{backgroundColor: security ? '#00C208' : 'red'}" @click="updateSecurity(!security)"></i>
        <div class="brightness-icon unselectable">
          <i :style="{opacity: external_luminosity=== 'high_luminosity' ? 1 : 0.4}" class="fa-solid fa-sun icons param-icon" @click="updateExternalLight('high_luminosity')"></i>
          <i :style="{opacity: external_luminosity=== 'medium_luminosity' ? 1 : 0.4}" class="fa-solid fa-cloud icons  param-icon " @click="updateExternalLight('medium_luminosity')"></i>
          <i :style="{opacity: external_luminosity=== 'low_luminosity' ? 1 : 0.4}" class="fa-solid fa-moon icons param-icon" @click="updateExternalLight('low_luminosity')"></i>
        </div>
      </div>

      <div class="content">
        <div class="grass" style="background-color: #12AE0F">
          <house-map></house-map>
        </div>
        <menu-side></menu-side>
      </div>

    <assistant-chat class="bot unselectable"></assistant-chat>


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
  justify-content: space-evenly;
  gap: 100px;
  width: 1500px;
}

.icons-params{
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 7%;
  margin-bottom: 2%;
}

.icons{
  height: 40px;
}


.sec:hover{
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
  background-color:#067CB3;;
  border-radius: 10px;
}

.param-icon:hover{
  cursor: pointer;
  background-color: #105c81;;
}

.icons{
  font-size: 25px;
  color: #FFFF;
}


.content{
  display: flex;
}

.bot{
  position: relative;
  z-index: 10;
}

.grass{
  border-radius: 20px 0 0 20px;
}

@media (min-width: 1920px) {
  .params{
    width: 1700px;
  }

}

@media (max-width: 1890px) {
  .params{
    width: 1400px;
  }

  .icons-params{
    margin-top: 10%;
  }

}

@media (max-width: 1200px) {

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
  }

  .brightness-icon{
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    gap: 20px;


  }
  .content{
    flex-direction: column;
  }

  .grass{
    border-radius: 20px 20px 0 0;
  }

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



}

  .brightness-icon{
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: center;
    gap: 20px;

  }

}

</style>