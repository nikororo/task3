<template>
  <div>
    <header>
      <h1>To Do</h1>
      <div v-if="this.$store.state.user">
        {{this.$store.state.user}}
        <button @click="logOut()" class="logout">Выйти</button>
      </div>
      <div v-else class="message notLog">Вы не вошли в приложение <a href="/">Авторизация</a></div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logOut() {
      this.$store.commit('logOut');
    }
  }
}
</script>

<style>
header {
  background-color: #e7ffcd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #535353;
  border-bottom: 1px solid #535353;
  min-width: 100vw;
}

h1 {
  padding: 10px 10px 10px 30px;
}

.logout {
  outline: 0;
  background-color: #4CAF50;
  border: none;
  padding: 5px 15px;
  color: #fff;
  margin: 0 15px;
}

.notLog {
  color: #df0000;
  margin: 0 15px;
  font-size: 16px;
}

.notLog a {
  color: #df0000;
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
}
</style>