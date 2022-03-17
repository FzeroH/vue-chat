<template>
  <div class="chat-container">
    <div class="users-list">
      <h3>Список пользователей</h3>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
      <h5>Человек</h5>
    </div>
    <ul>
      <MessageComponent :name="'Misha'" :text="'Hello'" :owner="true"/>
      <MessageComponent :name="'Masha'" :text="'Hello'" :owner="false"/>
      <MessageComponent :name="'Misha'" :text="'Как дела?'" :owner="true"/>
      <MessageComponent :name="'Masha'" :text="'Полнейший ад'" :owner="false"/>
      <MessageComponent :name="'Masha'" :text="'Анна'" :owner="false"/>
      <MessageComponent :name="'Masha'" :text="'Полнейший ***'" :owner="false"/>
      <MessageComponent :name="'Misha'" :text="'Согласен'" :owner="true"/>
      <MessageComponent :name="'Misha'" :text="'Да'" :owner="true"/>
      <MessageComponent :name="'Игорь'" :text="'Тест'" :owner="false"/>
    </ul>
  </div>
  <form>
    <input type="text" placeholder="Введите сообщение">
    <button type="button">Отправить</button>
  </form>
</template>

<script>
import { defineComponent } from 'vue';
import { io } from 'socket.io-client';
import MessageComponent from './MessageComponent.vue';

export default defineComponent({
  name: 'ChatRoom',
  components: { MessageComponent },

  setup() {
    const url = 'http://localhost:8080';
    const test = () => {
      const socket = io(url, {
        reconnectionDelay: 5000,
      });
      socket.on('test', (data) => {
        // eslint-disable-next-line
        console.log(`Я вошёл!!!! ${data}`);
      });
    };
    return { test };
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

    > h3 {
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
  > input {
    width: 80%;
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
