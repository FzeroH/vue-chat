<template>
  <div v-if="username === 'admin'" class="admin-message">
    <p>{{ text }}</p>
    <hr/>
  </div>
  <div v-else class="wrap">
    <div class="mess" :class="{ owner }">
      <small>
        <strong>{{ username }}</strong>
      </small>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MessageComponent',
  props: {
    username: String,
    text: String,
    owner: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>

.admin-message {
  > p {
    text-align: center;
    color: #4d4b4b;
  }
  > hr {
    margin: 10px 20px;
  }
}

.wrap {
  display: flex;
  flex-direction: column;
  width: border-box;

  > .mess {
    width: 30%;
    word-wrap: break-word;
    margin-bottom: 20px;
    padding: 10px 5px 5px 10px;
    box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
    border-radius: 10px;
    background: #831be7;
    color: white;
    position: relative;
  }

  > .owner{
    background: dodgerblue;
    word-wrap: break-word;
    color: white;
    border-radius: 10px;
    width: 30%;
    align-self: flex-end;
    margin-right: 5rem;
    margin-bottom: 20px;
    padding: 10px 5px 5px 10px;
  }
}
</style>
