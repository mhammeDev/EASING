<script>
import {defineComponent, onBeforeMount, ref, watch} from "vue";
import HouseMap from "@/components/HouseMap.vue";
import MenuSide from "@/components/MenuSide.vue";
import ParamCard from "@/components/ParamCard.vue";
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";
import "vue3-toastify/dist/index.css";
import {toast} from "vue3-toastify";
import AssistantChat from "@/components/AssistantChat.vue";



export default defineComponent({
  name: "MapAndMenu",
  components: {AssistantChat, ParamCard, MenuSide, HouseMap},
  setup(){
    const store = useRoomsStore();
    const{temperature, person, hours,security, external_luminosity} = storeToRefs(store)
    const {updateSecurity, updateExternalLight, initializeSocket} = store

    onBeforeMount(async ()=>{
      await initializeSocket();
    })

    const displayChat = ref(false);


    watch(
        () => store.message,
        (newMessage)=>{
          if(newMessage){
            showToat(newMessage.icon, newMessage.message, newMessage.style)
          }
        }
    )


    const showToat = (icon, message, style) => {
      console.log(style)
      toast(message, {
        className: "adjust-box",
        "icon" : icon,
        "type": style,
        "transition": "slide",
        "dangerouslyHTMLString": true
      })

    }

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
      updateDisplayChat
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

      <div class="icons-params unselectable">
        <div :style="{backgroundColor: security ? '#00C208' : 'red'}" class="sec_icon" @click="updateSecurity(!security)">
          <i :class="security=== true ? 'fa-solid fa-lock icons' : 'fa-solid fa-unlock icons' "></i>
        </div>
        <div class="brightness-icon unselectable">
          <i :style="{opacity: external_luminosity=== 'high_luminosity' ? 1 : 0.4}" class="fa-solid fa-sun icons param-icon" @click="updateExternalLight('high_luminosity')"></i>
          <i :style="{opacity: external_luminosity=== 'medium_luminosity' ? 1 : 0.4}" class="fa-solid fa-cloud icons  param-icon " @click="updateExternalLight('medium_luminosity')"></i>
          <i :style="{opacity: external_luminosity=== 'low_luminosity' ? 1 : 0.4}" class="fa-solid fa-moon icons param-icon" @click="updateExternalLight('low_luminosity')"></i>
        </div>
      </div>

      <div class="content">
        <house-map></house-map>
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
    margin-top: 8%;
    margin-bottom: 25%;


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

  }
}

</style>