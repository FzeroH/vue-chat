<template>
  <form>
    <label for="user-name">Имя пользователя</label>
    <input type="text" id="user-name" v-model="authState.username">
    <label for="room-id">Номер комнаты</label>
    <input type="text" id="room-id" v-model="authState.roomId">
    <button type="button" @click="auth">Войти</button>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../socket';

export default defineComponent({
  name: 'AuthorizationComponent',
  setup() {
    const authState = ref({
      username: '',
      roomId: '',
    });
    const router = useRouter();
    const auth = () => {
      login(authState.value);
      router.push({ path: '/chat', query: { room: authState.value.roomId } });
    };
    return {
      authState,
      auth,
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
