<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  name:"LoginView",
  setup(){
    const login = ref("");
    const password = ref("");

    return{
      login,
      password
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
          <p>Email</p>
          <div class="input-wrapper">
            <input type="text" class="personalized-input" placeholder="Enter your email" v-model="login">
          </div>
        </div>

        <div class="input-group">
          <p>Password</p>
          <div class="input-wrapper">
            <input type="password" class="personalized-input" placeholder="Enter your password" v-model="password">
          </div>
        </div>
      </div>

    <div class="aditionnal">
      <div class="check">
        <input type="checkbox">
        <p>Keep me signed in</p>
      </div>
      <p id="forget">Forget Password ?</p>
    </div>

    <div class="button-group">
      <p class="btn blue-solid">Log in</p>
      <p class="btn blue-border">Inscription</p>

    </div>
  </div>


  </div>

</div>
</template>

<style scoped>
.container{
  display: flex;
  height: 100vh;
  font-family: Syne,serif;
}

.left{
  flex: 1.2;
  background-color: #067CB3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5%;
}

.right{
  flex: 1;
  height: 100%;
  margin: 3% 5%;
  width: 100%;
}

.content{
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
  gap: 30px;
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

.input-wrapper::before{
  content: "";
  background-color: #067CB3;
  width: 4px;
  height: 66px;
  display: flex;
  position: absolute;
}

.aditionnal{
  margin-top: 2%;
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
  margin-top: 5%;
  font-family: "Dm sans",serif;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.btn{
  font-size: 30px;
  padding: 1.6% 10%;
  width: 40%;
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
</style>