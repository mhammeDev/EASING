<script>
import {defineComponent} from "vue";



export default defineComponent({
  name: "FooTer",

})


</script>


<template>
  <div class="container">
    <img style="width: 200px; height: 100%;" src="@/assets/logo.png">
    <p>Easing Project</p>
  </div>
</template>

<style scoped>
.container{
  bottom: 0;

  display: flex;
  margin-top: 5%;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: #067CB3;
}

.container p{
  font-size: 80px;
  color:#FFFF;
  font-family: Goldman;
}

@media (max-width: 700px) {
  .container p{
    display: none;
  }
}

</style>