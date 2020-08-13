import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import "firebase/auth";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logHasError: false,
    login: false,
    errMsg: '',
    user: ''
  },
  mutations: {
    authErr: (state, error) => {
      state.logHasError = true;
      state.errMsg = error;
    },
    authCorr: (state, user) => {
      state.logHasError = false;
      state.login = true;
      state.user = user;
    },
    actUser: (state) => {
      firebase.auth().onAuthStateChanged((user) => { state.user = user.email })
    }
  }
})

export default store

// import { createStore } from 'vuex'

// export default createStore({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
