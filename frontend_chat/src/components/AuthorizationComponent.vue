<template>
  <form>
    <label for="user-name">Имя пользователя</label>
    <input type="text" id="user-name" v-model="username">
    <label for="room-id">Номер комнаты</label>
    <input type="text" id="room-id" v-model="roomId">
    <button type="button" @click="login(username,roomId)">Войти</button>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import io from 'socket.io-client';
import { useRouter } from '../router';

export default defineComponent({
  name: 'AuthorizationComponent',
  setup() {
    const username = ref('');
    const roomId = ref('');
    const url = 'http://localhost:8080';
    const router = useRouter();
    const socket = io(url, {
      reconnectionDelay: 5000,
    });
    // eslint-disable-next-line no-shadow
    const login = (username, roomId) => {
      const userData = {
        username,
        roomId,
      };
      socket.emit('login', userData, (data) => {
        if (typeof data === 'string') {
          // eslint-disable-next-line no-console
          console.log(data);
        } else {
          // eslint-disable-next-line no-console
          console.log(`Пользователь ${data.userId} вошёл в чат`);
          router.path('/chat');
        }
      });
    };
    return {
      username, roomId, login,
    };
  },
});
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  margin: 40px auto 0 auto;
  width: 20%;

  > label {
    font-size: 16px;
    margin-bottom: 5px;
  }
  > input {
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid gray;
    outline: none;
    color: black;
    font-size: 18px;
    transition: ease 0.4s;

    &:focus {
      padding-bottom: 5px;
      border-bottom: 1px solid deepskyblue;
      transition: ease 0.4s;
    }
  }

  > button {
    width: 30%;
    background: deepskyblue;
    color: white;
    border: 1px solid white;
    font-size: 18px;
    transition: ease 0.4s;

    &:active {
      background: white;
      color: deepskyblue;
      transition: ease 0.4s;
    }
  }
}
</style>
