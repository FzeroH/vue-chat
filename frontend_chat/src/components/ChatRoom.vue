<template>
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
  <form>
    <input type="text" placeholder="Введите сообщение">
    <button type="button">Отправить</button>
  </form>
</template>

<script>
import { defineComponent } from 'vue';
import { io } from 'socket.io-client';
// eslint-disable-next-line import/extensions
import MessageComponent from './MessageComponent';

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
ul {
  position: absolute;
  margin-top: 0;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
form {
  display:flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
