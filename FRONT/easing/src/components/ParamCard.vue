<script>
import {defineComponent, ref} from "vue";
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: "ParamCard",
  props:{
    color : String,
    size:Number,
    title: String,
    type_entry: String,
    image:String,
    type_value:Number,
    value: String
  },
  setup() {
    const store = useRoomsStore();
    const{temperature, person, hours} = storeToRefs(store)

    const temp_value = ref(temperature.value);
    const hours_value = ref(hours.value);
    const person_value = ref(person.value);



    const getHours= () => {
      console.log(this.hours_value)
    }

    return{
      temp_value,
      hours_value,
      person_value,
      getHours,
    }

  },
});

</script>

<template>
  <div>
  <div class="container">

    <div class="high-square">
      <i :class="image" class="logo_image" ></i>
    </div>

    <div class="card">
      <div class="card-top">
        <p class="title-card">{{ title }}</p>
        <p class="value-card">{{value}}</p>
      </div>
      <div class="card-bottom">
        <input v-if="type_value === 1" class="input" :type="type_entry" :value="temp_value" max="50" min="-20">
        <input v-if="type_value === 2" class="input" :type="type_entry" @change="getHours" v-model="hours_value" :value="hours_value">
        <select v-if="type_value === 3" v-model="person_value" :value="person_value" class="input">
          <option>Visually Imparaired</option>
          <option>Obesity</option>
          <option>Pregnant</option>
        </select>

        <div class="check">
          <i style="color: white; font-size: 20px; text-align: center;" class="fa-solid fa-check"></i>
        </div>
      </div>

    </div>
  </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Goldman&display=swap');


.container{
  margin:0;
  padding:0;
  width: 360px;
  height: 180px;
}

.high-square{
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 7%;
  width: 85px;
  height: 85px;
  background-color: v-bind(color);;
  z-index: 2;
  border-radius: 20px;
}

.logo_image{
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-size: 55px;
  color: #FFFF;
}


.card{
  display: flex;
  flex-direction: column;
  margin-top: -7%;
  width: 100%;
  height: 100%;
  z-index: 1;
  border: 7px solid v-bind(color);
  border-radius: 20px;
}

.card-top{
  flex: 2;
  text-align: end;
  margin-right: 5%;
  margin-top: 5%;
}

.title-card{
  font-family: Syne;
  font-size: 30px;
  color: #B3B3B3;
  margin: 0;

}

.value-card{
  font-family: Goldman;
  font-size: v-bind(size+"px");
  margin: 0;


}

.card-bottom{
  display: flex;
  gap: 3%;
  margin: 5%;
  height: 32px;


}

.input{
  flex:3;
  border-radius: 10px;
  border: none;
  background-color: v-bind(color);
  opacity: 0.6;
  text-align: center;
  color: #FFFF;
  font-size: 23px;
}

.check{
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50px;
  height: 100%;
  background-color: #00C208;
  border-radius: 10px;
}

.check:hover{
  cursor: pointer;
  background-color: #027d06;

}




</style>