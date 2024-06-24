<script>
import {defineComponent, ref} from "vue";
// import {useUserStore} from "@/store/user";
//import router from "@/router";


export default defineComponent({
  name: "NavBar",
  setup(){
   // const store = useUserStore();
   // const {LogoutFromStore} = store;
    const display = ref(false);
    const scroll = ref(0);
    const slide = ref(false);

    const showtext = ref(false);

    const logout = async () => {
      try{
        console.log("To logout active service in the code !");
        //await  LogoutFromStore();
        //await router.push('/')
      } catch (e){
        console.log(e)
      }
    }

    addEventListener("scroll", () =>{
      console.log(scroll.value - window.scrollY  < 150)
      if(scroll.value - window.scrollY  < 0){
        slide.value = true
      } else {
        slide.value = false;
      }
      scroll.value = window.scrollY;

    })

    return {
      logout,
      display,
      slide,
      showtext
    }
  }
})


</script>

<template>
  <div class="container unselectable">
    <div class="navbar" :class="slide === true ? 'active' : ''">
      <div style="display:flex;flex-direction:column; align-items: center">
        <div class="navbar-content">
          <div class="left">
            <img id="logo" src="@/assets/logo.png"/>
            <div class="text">
              <p>Home</p>
              <p style="font-weight: 900">Interactive Map</p>
              <p>About the project</p>
            </div>
          </div>

          <div class="burger" @click="showtext = !showtext">
            <i class="fa-solid fa-bars"></i>
          </div>
          <div class="right">
            <i class="fa-solid fa-power-off logout" @click="logout"></i>
          </div>

      </div>


        <Transition name="slide-fade">
          <div class="respo-text" v-if="showtext">
            <p>Home</p>
            <p>Interactive Map</p>
            <p>About the project</p>
          </div>


        </Transition>

      </div>







    </div>
  </div>
</template>

<style scoped>
.container{
  position: relative;
  font-family: "Dm sans",serif;
  border-radius: 20px;
  height: 95px;
  z-index: 100;
  margin-top: 2%;
  margin-left: 5%;
  margin-right: 3%;
}


.navbar{

  position: fixed;
  border-radius: 20px;
  height: 95px;
  background-color: #067CB3;
  width: 85%;
  padding: 0 50px;
  transition: all 0.4s ease-out;
  backdrop-filter: blur(300px);
  opacity: 0.75;
}

.navbar-content{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

}

.left{
  font-size: 20px;
  color: white;
  display: flex;
  align-items: center;
  gap:50px;
}

#logo{
  width: 100px;
  height: 100%;
}

.text{
  display: flex;
  gap: 40px;
}

.logout{
  color: white;
  font-size: 40px;
}
.logout:hover{
  cursor: pointer;
  opacity: 0.7;
}

.active{
  transform: translateY(-500px);
  transition: all 0.4s ease-out;
}

.burger{
  display: none;
}

.respo-text{
  display: none;
}


@media (max-width: 1200px) {

}

@media (max-width: 800px) {
  .navbar{
    justify-content: center;
  }

  .text{
    display: none;
  }

  .container{
    margin: 20px 30px;
  }

  .navbar{
    justify-content: space-between;
    align-items: center;
    width: 75%;
  }

  .burger{
    display: block;
    font-size: 60px;
    color: white;
  }

  .burger:hover{
    cursor: pointer;
  }

  .respo-text{
    display: flex;
    font-size: 20px;
    background-color: #067CB3;
    text-align: center;
    flex-direction: column;
    width: 110%;
    margin-top: -10px;
    border-radius: 0 0 10px 10px;
    color: white;
  }

}

@media (max-width: 500px) {
  .navbar{
    width: 65%;
  }
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
}

.slide-fade-leave-to{
  transform: translateY(-20px);
}

.slide-fade-enter-from
{
  transform: translateY(-20px);
}



</style>