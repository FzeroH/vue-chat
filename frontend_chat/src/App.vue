<template>
  <router-view/>
</template>

<script>

import { defineComponent } from 'vue';
import ChatRoom from './components/ChatRoom.vue';
import AuthorizationComponent from './components/AuthorizationComponent.vue';

export default defineComponent({
  name: 'App',
  // eslint-disable-next-line vue/no-unused-components
  components: { ChatRoom, AuthorizationComponent },
});
</script>

<style lang="scss">

body{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
