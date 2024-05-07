<script>
import {defineComponent} from "vue";
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";





export default defineComponent({
  name: "MenuSide",
  setup(){
    const store = useRoomsStore();
    const {captorActionneur, currentFloor} = storeToRefs(store);
    const {changeFloor} = store;


    const toggleFloor = () =>{
      changeFloor();
    }

    const getPhoto = (img) =>{
      console.log('@/assets/icons/' + img)
      return `@/assets/icons/' + ${img}`;
    }

    return{
      toggleFloor,
      captorActionneur,
      currentFloor,
      getPhoto
    }

  }
})


</script>


<template>
  <div class="container">
    <div class="floor">
<!--      <p>Current floor : {{currentFloor}}</p>-->
      <p class="btn" @click="toggleFloor">Change floor</p>
    </div>
    <div class="list-icons">
      <div class="group-devices" v-for="item in captorActionneur.filter(e => e.show === true)" :key="item.name">
        <img style="margin-right: 10%; width: 30px" :src="require('@/assets/icons/'+item.img)">
        <p class="text">{{item.name}}</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.container{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 645px;
  padding: 2% 0;
  background-color: #067CB3;
  border-radius: 0  20px 20px 0 ;
}

.floor{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1.2;
  width: 100%;
}

.btn{
  margin: auto;
  color: #FFFF;
  font-family: Syne;
  font-size: 20px;
  text-align: center;
  padding: 2% 20%;
  border-radius: 10px;
  background-color: rgb(250,250,250,20%);
}

.btn:hover{
  cursor: pointer;
  background-color: rgb(250,250,250,60%);

}

.list-icons{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 3;
  width: 100%;
  overflow-y: scroll;


}

.group-devices{
  font-family: Syne;
  font-size: 23px;
  width: 80%;
  display: flex;
  align-items: center;
  color: #FFFF;
}

.group-devices::after{
  content:"";
  display: block;
  position: absolute;
  height: 0.1px;
  background-color: #FFFF;
  margin-top: 15%;
  width: 70%;
}
.text{
  text-align: left;
}



::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: #f1f1f1;
  width: 5px;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #eae7e7;;
}

.group-devices:hover{
  border-radius: 10px;
  cursor: default;
  background: #3aa9dd;


}

@media (min-width: 1920px) {
.container{
  height: 823px;

}
}


</style>