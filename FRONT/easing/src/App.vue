<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import {defineComponent} from "vue";


export default defineComponent({
  name: 'App',
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Syne:wght@400..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Goldman&display=swap');

body{
  margin: 0;
  padding: 0;
}

#app{
  margin: 0;
  padding: 0;
  overflow: hidden;
}


::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(0,0,0,0%);
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: #939393;
  width: 5px;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #4d4d4d;;
}

.group-devices:hover{
  border-radius: 10px;
  cursor: default;
  background: #3aa9dd;
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}


</style>
