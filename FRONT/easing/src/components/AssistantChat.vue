<script>
import {defineComponent, ref} from "vue";
import {useRoomsStore} from "@/store/rooms";
import {storeToRefs} from "pinia";




export default defineComponent({
  name: "AssistantChat",
  setup(){
    const store = useRoomsStore();
    const {recommendations, conversationChatBot, actionsLogs} = storeToRefs(store)
    const {sendMessageToApi} = store

    const displayChat= ref(false);
    const displayingScreen = ref(0);
    const contentChat = ref("")

    const tableSelect = [
      {name: "Chat", value: 1, iconsName: "fa-regular fa-comments"},
      {name: "Recommendations", value: 2, iconsName: "fa-regular fa-lightbulb"},
      {name: "Logs", value: 3, iconsName: "fa-solid fa-book"}

    ]

    const  updateDisplayChat = async () => {
      displayChat.value = !displayChat.value
    }

    const updateDisplayingScreen = (value) => {
      displayingScreen.value = value;
    }

    const sendMessage = () => {
     sendMessageToApi(contentChat.value)
      contentChat.value = "";

    }

    return{
      updateDisplayChat,
      displayChat,
      displayingScreen,
      tableSelect,
      updateDisplayingScreen,
      recommendations,
      conversationChatBot,
      actionsLogs,
      contentChat,
      sendMessage,
      sendMessageToApi
    }

  }
})


</script>


<template>
  <div class="container">

    <div class="chatbot">
      <Transition name="slide-fade">

      <div class="chatbot-content" v-if="displayChat === true">

        <div v-if="displayingScreen=== 0" class="select-menu">
          <div class="top-select">
            <p>Select what you're looking for</p>
            <i class="fa-solid fa-xmark cross" @click="updateDisplayChat"></i>
          </div>

          <div class="select-content" v-for="item in tableSelect" :key="item.name" @click="updateDisplayingScreen(item.value)">
            <div class="select-left" >
              <i :class="item.iconsName"></i>
              <p>{{item.name}}</p>
            </div>

            <i class="fa-solid fa-chevron-right"></i>

          </div>
        </div>

        <Transition name="slide-fade-chat">
        <div v-if="displayingScreen === 1" class="chat">
            <div  class="topChat">
              <i class="fa-solid fa-chevron-left" style="cursor: pointer" @click="updateDisplayingScreen(0)"></i>
              <p>Your assistant manager</p>
              <i class="fa-solid fa-xmark cross" @click="updateDisplayChat"></i>
            </div>
            <div class="chat-body">
              <div class="chat-content" >
                <p style="color: #000000" v-if="conversationChatBot.length === 0"> Nothing for now</p>
                <div v-for="(message, index) in conversationChatBot" :key="index">
                  <div v-if="message.from === 'assistant'">
                    <div style="display: flex; align-items: center; gap : 10px;"  v-if="message.from === 'assistant'" >
                      <div  class="photo">
                        <img style="width: 30px; height: 30px" src="@/assets/logo.png">
                      </div>
                      <p class="message-send left">{{message.content}}</p>
                    </div>
                  </div>
                  <div v-if="message.from === 'user'" >
                    <p class="message-send right">{{message.content}}</p>
                  </div>
                </div>
              </div>
              <div class="input-chat">
                <input type="text" class="stylizedInput" placeholder="Enter your text" v-model="contentChat" @keyup.enter="sendMessage()">
                <i v-if="contentChat !== ''" class="fa-solid fa-paper-plane icon-plane button" @click="sendMessage()" ></i>
              </div>
            </div>
          </div>

          <div v-else-if="displayingScreen === 2" class="chat">
            <div  class="topChat">
              <i class="fa-solid fa-chevron-left" style="cursor: pointer" @click="updateDisplayingScreen(0)"></i>
              <p>Assistant Recommendation</p>
              <i class="fa-solid fa-xmark cross" @click="updateDisplayChat"></i>
            </div>
            <div class="chat-body">
              <div class="chat-content">
                <p style="color: #000000" v-if="recommendations.length === 0"> Nothing for now</p>

                <div v-for="(r, index) in recommendations" :key="index">
                  <div style="display: flex; flex-direction: column;align-items: center;">
                    <p class="message-send">{{r}}</p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div v-else-if="displayingScreen === 3" class="chat">
            <div  class="topChat">
              <i class="fa-solid fa-chevron-left" style="cursor: pointer" @click="updateDisplayingScreen(0)"></i>
              <p>Logs</p>
              <i class="fa-solid fa-xmark cross" @click="updateDisplayChat"></i>
            </div>
            <div class="chat-body">
              <div class="chat-content">
                <p style="color: #000000" v-if="actionsLogs.length === 0"> Nothing for now</p>
                <div v-for="(action, index) in actionsLogs" :key="index">
                  <div style="display: flex; flex-direction: column;align-items: center;">
                    <p v-if="action.input" style="background-color: #105c81" class="message-send">input : {{action.input}}</p>
                    <p v-if="action.output" class="message-send">output : {{action.output}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Transition>






      </div>
    </Transition>

    <i class="fa-solid fa-comment message" @click="updateDisplayChat()"></i>

    </div>

  </div>
</template>

<style scoped>

.chatbot{
  width: 20%;
  display: flex;
  justify-content: end;
  align-items: end;
  margin-top: 2%;
  position : fixed;
  right: 30px;
  bottom : 35px;
  font-family: Syne,serif;
}

.select-menu{
  width: 340px;
  border: 3px solid #3aa9dd;
  background-color: #f9f9f9;
  border-radius: 25px;
  margin-right: -40px ;
  margin-bottom: 18% ;

}

.select-content{
  display: flex;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
  justify-content: space-between;
  padding: 0 10px;
}

.select-left{
  display: flex;
  gap: 10px;
  align-items: center;
}



.select-content:hover{
  background-color: #cdc6c6;
  overflow: hidden;
}

.top-select{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  color: white;
  padding: 2% 3%;
  text-align: center;
  background-color: #3aa9dd;
  border-radius: 20px 20px 0 0;
  font-family: Syne;
}

.chat{
  width: 340px;
  height: 600px;
  border: 3px solid #3aa9dd;
  background-color: #f9f9f9;
  border-radius: 25px;
  margin-right: -40px ;
  margin-bottom: 40px ;

}

.topChat{
  border-radius: 22px 22px 0 0;
  padding: 2% 5%;
  height: 40px;
  background-color: #3aa9dd;
  display: flex;
  align-items: center;
  color: white;
  font-family: Syne;
  font-size: 20px;
  justify-content: space-between;
}

.cross{
  cursor: pointer;
}

.chat-body{
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85%;
  justify-content: space-between;
  font-size: 18px;
  color: #FFFF;


}

.chat-content{
  overflow: auto;

}

.message-send{
  display: flex;
  background-color: #067CB3;
  padding: 3%;
  border-radius: 10px;
}

.message-send.left{
  background-color: #067CB3;
  margin-right: 40px;
}

.photo{
  width: 30px;
  height: 30px;
  border-radius: 40px;
  background-color : #3aa9dd;
  background-size: 30px 30px ;
}

.message-send.right{
  background-color: #105c81;
  margin-left: 80px;
}

.stylizedInput{
  border-radius: 20px;
  height: 25px;
  width: 250px;
  border: 1px solid #bfbfbf;
  font-size: 18px;

  padding: 2%;
}

.input-chat{
  display: flex;
  align-items: center;
  width: 100%;
}
.icon-plane{
  padding: 3% 8%;
  border-radius: 23px;
  background-color:#3aa9dd;
  margin-left: 2%;
  color: white;
}

.message{
  padding: 17px;
  font-size: 40px;
  background-color:  #3aa9dd;
  border-radius: 50px;
  color: #FFFF;
  height: 40px;
  cursor: pointer;
}

.button:hover{
  cursor: pointer;
}



.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.slide-fade-leave-to{
  opacity: 0;
  transform: translateY(50px);
}

.slide-fade-enter-from
{
  transform: translateY(50px);
  opacity: 0;
}



.slide-fade-chat-enter-active {
  transition: all 0.4s ease-out;
}

.slide-fade-chat-leave-active {
  transition: none;
}

.slide-fade-chat-enter-from,
.slide-fade-chat-leave-to {
  transform: translateY(50px);
  opacity: 0;
}

.slide-fade-chat-enter-from
{
  transform: translateY(50px);
  opacity: 0;
}

@media (max-width: 1200px){

}

@media (max-width: 700px){
  .select-menu{
    width: 280px;
  }

  .chat{
    width: 280px;
    height: 450px;
    padding-bottom: 10px;
  }

  .stylizedInput{
    width: 180px;

  }

  .input-chat{

  }

}

@media (max-width: 500px){

}
</style>