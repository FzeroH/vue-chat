<template>
  <div class="chat-container">
    <div class="users-list">
      <h2>Комната {{ room }}</h2>
      <h3>Список пользователей</h3>
      <h5 v-for="user in users" :key="user">{{user}}</h5>
    </div>
    <ul>
      <MessageComponent v-for="message in messages" :key="message.username"
                        :username="message.username"
                        :text="message.text"
                        :owner="true"/> <!--message.id === user.id -->
    </ul>
  </div>
  <form @keydown.enter.prevent="createNewMessage">
    <textarea placeholder="Введите сообщение" v-model="newMessage"/>
    <button type="button" @click="createNewMessage">Отправить</button>
  </form>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import MessageComponent from './MessageComponent.vue';
import { connectToChat, createMessage, getUserData } from '../../socket';

export default defineComponent({
  name: 'ChatRoom',
  components: { MessageComponent },

  setup() {
    const messages = ref([]);
    const users = ref([]);
    const room = ref('test');
    const newMessage = ref('');
    const userData = {};

    const createNewMessage = () => {
      createMessage(newMessage.value, messages.value);
      newMessage.value = '';
    };

    onMounted(() => {
      connectToChat(messages.value);
      getUserData();
    });

    return {
      messages, users, room, newMessage, userData, createNewMessage,
    };
  },
});
</script>

<style scoped lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > .users-list {
    position: absolute;
    width: 20%;
    height: 100%;
    overflow-y: auto;
    top: 0;
    border-right: 1px solid #918c8c;

    &::-webkit-scrollbar-track { border-radius: 4px; }
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-thumb { border-radius: 4px;background: #f0f2f5; }
    &::-webkit-scrollbar-thumb { background: #6a7d9b; }

    > h2, h3 {
      margin: 20px;
    }
    > h5 {
      margin: 15px 20px;
    }
  }
  > ul {
    position: absolute;
    margin-top: 0;
    margin-left: 20%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;

    &::-webkit-scrollbar-track { border-radius: 4px; }
    &::-webkit-scrollbar { width: 6px; }
    &::-webkit-scrollbar-thumb { border-radius: 4px;background: #f0f2f5; }
    &::-webkit-scrollbar-thumb { background: #6a7d9b; }
  }
}

form {
  display:flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  margin-left: 20%;
  margin-bottom: 30px;
  > textarea {
    width: 80%;
    height: 20px;
    overflow:hidden;
    resize: none;
    word-wrap: break-word;
    margin-left: 5px;
    padding: 4px 8px;
    font-size: 18px;
    outline: none;
    border: 1px solid gray;
    border-radius: 10px;
  }
  > button {
    margin-left: 20px;
    font-size: 18px;
    border-radius: 10px;
    background: white;
    color: deepskyblue;
    padding: 3px 10px 3px 10px;
    border: 1px solid deepskyblue;
    outline: none;
    transition: ease 0.3s;

    &:hover{
      cursor: pointer;
    }

    &:active{
      border-color: white;
      background: deepskyblue;
      color: white;
      transition: ease 0.3s;
    }
  }
}
</style>
