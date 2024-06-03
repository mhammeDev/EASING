<script>
import {defineComponent, ref, watch} from "vue";
import {useUserStore} from "@/store/user";
import router from "@/router";

export default defineComponent({
  name:"LoginView",
  setup(){
    const store = useUserStore();

    const {LoginFromStore} = store

    const error = ref(false)
    const errorMessage =  ref("")
    const colors = ref("#067CB3")

    watch(
        () => error.value,
        (v)=>{
          if(v === true){
            colors.value = 'red'
          } else {
            colors.value = "#067CB3"
          }
        }
    )

    const tryToLogin = async () => {
      try {
        if (username.value !== "" && username.value !== "") {
          const response = await LoginFromStore(username.value, password.value)
          if(response.response){
            router.push("/user")
          } else {
            error.value = true;
            errorMessage.value = response.error.message;
          }
        }
      } catch (e) {
        console.log(e)
      }
    }


    const username = ref("");
    const password = ref("");
    return{
      username,
      password,
      tryToLogin,
      error,
      errorMessage,
      colors
    }
  }
})

</script>

<template>
<div class="container">
  <div class="left">
    <img src="@/assets/logo_g.png" id="logo_image">
    <h1 id="title">EASING PROJECT</h1>
  </div>

  <div class="right">
    <div class="content">
      <div class="text">
        <h2>Login Account</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to
          make a type. </p>
      </div>

      <div class="input-container">
        <div class="input-group">
          <p>Username / Email</p>
          <div class="input-wrapper">
            <input :style="{backgroundColor: error === true ? 'rgba(255,0,33,0.35)' : ''}" type="text" class="personalized-input" placeholder="Enter your email" v-model="username" @keyup.enter="tryToLogin">
          </div>
        </div>

        <div class="input-group">
          <p>Password</p>
          <div class="input-wrapper">
            <input :style="{backgroundColor: error === true ? 'rgba(255,0,33,0.35)' : ''}" type="password" class="personalized-input" placeholder="Enter your password" v-model="password"  @keyup.enter="tryToLogin">
          </div>
        </div>

        <span v-if="error" style="color: red">{{errorMessage}}</span>
      </div>

    <div class="aditionnal">
      <div class="check">
        <input type="checkbox">
        <p>Keep me signed in</p>
      </div>
      <p id="forget">Forget Password ?</p>
    </div>

    <div class="button-group">
      <p class="btn blue-solid" @click="tryToLogin">Log in</p>
      <p class="btn blue-border">Inscription</p>

    </div>
  </div>


  </div>

</div>
</template>

<style scoped>
.container{
  display: flex;
  font-family: Syne,serif;
  overflow: hidden;
  overflow-y: auto;
}

.left{
  flex: 1.2;
  background-color: #067CB3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.right{
  flex: 1;
  height: 100%;
  width: 100%;
}

.content{
  margin: 0 50px;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

#title{
  color: #FFFF;
  font-family: Goldman,serif;
  font-size: 70px;
  text-align: center;
  margin-top: -6%;
  font-weight: 100;
}

#logo_image{
  width: 600px;
  height: 550px;
}

.text{
  text-align: center;
  margin: 0 50px;
  display: flex;
  flex-direction: column;
}

.text h2{
  color: #067CB3;
  font-size: 70px;
}

.text p {
  color: #B6B6B6;
  font-size: 17px;
  margin-top: -3%;
}

.input-container{
  display: flex;
  flex-direction: column;
}

.input-group{
  font-size: 18px;
}

.personalized-input{
  width: 95%;
  height: 50px;
  border-radius: 0 10px 10px 0;
  border: none;
  background-color: #EEEE;
  font-family: "Dm sans",serif;
  font-size: 20px;
  padding: 8px 20px;
}

.input-wrapper{
  position: relative;
}

.input-wrapper::before{
  content: "";
  background-color: v-bind(colors);
  width: 4px;
  height: 66px;
  display: flex;
  position: absolute;
}

.aditionnal{
  margin-top: 2%;
  margin-right: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;

}

.check{
  display: flex;
  gap: 15px;
  color: #B6B6B6;
}

.check p:hover{
  cursor: pointer;
}

input[type="checkbox"]{

}

#forget{
  color: #067CB3;
  font-weight: 600;
}

#forget:hover{
  cursor: pointer;
  opacity: 0.8;

}

.button-group{
  font-family: "Dm sans",serif;
  font-weight: 600;
  margin: 0 auto ;
}

.btn{
  font-size: 30px;
  padding: 10px 15px;
  width: 400px;
  text-align: center;
  border-radius: 30px;
}

.btn:hover{
  cursor: pointer;
}

.blue-solid{
  background-color: #067CB3;
  color: #FFFF
}

.blue-solid:hover{
  background-color: rgb(6,124,179,60%);
}

.blue-border{
  border: 3px solid #067CB3;
  color: #067CB3;
}

.blue-border:hover{
  background-color: rgb(6,124,179,30%);
  border: 3px solid #FFFF;

  color: #FFFF;
}

@media (max-width: 1200px) {

  .content{
    margin: 0 2%;
  }

  .personalized-input{
    width: 85vw;
  }
  .container{
    flex-direction: column;
  }

  .left{
    display: none;
  }


}

@media (max-width: 800px) {
  .right{
  }

  .personalized-input{
    width: 80vw;
  }

  .input-container{
  }

}

@media (max-width: 500px) {
  .container{
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .right {
    margin-left: 4%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }





  .text h2{
    font-size: 35px;
  }

  .text p {
    font-size: 15px;
  }

  .right{
  }

  .personalized-input{
    width: 76vw;
  }

  .aditionnal{
    display: flex;
    flex-direction: column;
  }

  .input-container{
  }

  .btn{
    padding: 10px 15px;
    width: 240px;

  }

}

</style>