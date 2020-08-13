<template>
  <div class="authorization">
		<form v-on:submit.prevent="onReg" v-if="!show" class="register-form">
			<h2 class="welcome">Впервые в Todo?</h2>
      <input v-model="login" v-bind:class="{error: this.$store.state.logHasError}" type="email" placeholder="Введите свой email" required/>
      <input v-model="password" v-bind:class="{error: this.$store.state.logHasError}" type="password" placeholder="Придумайте пароль" required/>
      <div class="errorMsg" v-if="this.$store.state.logHasError">{{this.$store.state.errMsg}}</div>
      <button>Создать аккаунт</button>
      <div class="message">Уже зарегистрированы? <a v-on:click="show = !show" href="#">Войти</a></div>
    </form>

    <form v-on:submit.prevent="onAuth" v-if="show" class="login-form">
			<h2 class="welcome">Вход</h2>
      <input v-model="login" v-bind:class="{error: this.$store.state.logHasError}" type="email" placeholder="Email" required/>
      <input v-model="password" v-bind:class="{error: this.$store.state.logHasError}" type="password" placeholder="Пароль" required/>
      <div class="errorMsg" v-if="this.$store.state.logHasError">Неверный логин или пароль</div>
      <button class="submit">Войти</button>
      <div class="message">Еще не зарегистрированы? <a v-on:click="show = !show" href="#">Создать аккаунт</a></div>
    </form>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import "firebase/auth";

export default {
	name: 'Authorization',
	data: () => ({
    show: true,
    login: '',
    password: ''
  }),
  methods: {
    onAuth() {
      firebase.auth().signInWithEmailAndPassword(this.login, this.password)
        .then(() => {
          this.authIsCorr();
        })
        .catch(() => {
            this.$store.commit('authErr');
        });
    },

    onReg() {
      firebase.auth().createUserWithEmailAndPassword(this.login, this.password)
        .then(() => {
          this.authIsCorr();
        })
        .catch((err) => {
          this.$store.commit('authErr', err);
        });
    },

    authIsCorr() {
      this.$store.commit('authCorr');
      this.$store.commit('actUser');
      this.$router.push('todo');
    }
  }
}
</script>

<style scoped>
.authorization {
	height: 100vh;
	background-color: #e7ffcd;
	display: flex;
	align-items: center;
	justify-content: center;
}

.register-form, .login-form {
  border-radius: 5px;
  background-color: #fff;
  max-width: 360px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.25);
}

.welcome {
  margin-bottom: 20px;
  color: #535353;
}

input {
  background-color: #f2f2f2;
  width: 100%;
  height: 46px;
  border: none;
  margin-bottom: 15px;
  padding: 15px;
  box-sizing: border-box;
}

input:active, input:focus  {
  outline: none;
}

.error {
  outline: 2px solid #ff0000;
}

.error:focus  {
  outline: 2px solid #c50000;
}

.errorMsg {
  color: #ff0000;
  text-align: left;
  margin-bottom: 15px;
  font-size: 14px;
}

button {
  outline: 0;
  background-color: #4CAF50;
  width: 100%;
  border: none;
  padding: 15px;
  color: #fff;
}

button:hover {
  background-color: #43A047;
}

.message {
  margin-top: 15px;
  font-size: 14px;
}

.message a {
  color: #4CAF50;
  text-decoration: none;
}
</style>
