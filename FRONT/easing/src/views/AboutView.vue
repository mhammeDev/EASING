<script>
import {defineComponent, watch} from "vue";
import {toast} from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import {useRoomsStore} from "@/store/rooms";




export default defineComponent({
  name: "AboutView",
  setup(){
    const store = useRoomsStore();
    const {setNotificationMessage } = store;

    watch(
        () => store.message,
        (newMessage)=>{
          if(newMessage){
            console.log("ntù")
            showToat(newMessage.icon, newMessage.message)
          }
        }
    )


    const showToat = (icon, message) => {
      toast.info(message, {
        "icon" : icon,
        "type": "default",
        "transition": "slide",
        "dangerouslyHTMLString": true
      })


    }

    return{
      setNotificationMessage
    }

  }
})


</script>


<template>
  <div class="container">
    <input type="button" @click="setNotificationMessage('💦', 'There is a water leak')">

  </div>

</template>

<style scoped>

</style>