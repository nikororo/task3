import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/database';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    logHasError: false,
    login: false,
    errMsg: '',
    user: '',
    userID: '',
    lists: [],
    activeList: null,
    tasks: []
  },

  mutations: {
    authErr: (state, error) => {
      state.logHasError = true;
      state.errMsg = error;
    },
    authCorr: (state) => {
      state.logHasError = false;
      state.login = true;
      firebase.auth().onAuthStateChanged((user) => { 
        state.user = user.email; 
        state.userID = user.uid;
        localStorage.user = state.user;
        localStorage.userID = state.userID;
      })
    },

    getUser: (state) => {
      if (localStorage.user) {
        state.user = localStorage.user; 
        state.userID = localStorage.userID;
      }
    },

    logOut: (state) => {
      localStorage.clear();
      state.user = ''; 
      state.userID = '';
    }
  }, 

  actions: {
    getLists: async ({state}) => {
      let db = firebase.database();

      await db.ref(`/${state.userID}`).once('value')
        .then((snap) => {
          let value = snap.val();
          let result = [];
          for (let listName in value) {
            result.push({'listName': listName});
          }
          state.lists = result;
          state.activeList = result[0].listName;
        })
        .catch((err) => {
          console.log(err.message);
        })
    },

    getTasks: async ({state}) => {
      let db = firebase.database();

      await db.ref(`/${state.userID}/${state.activeList}`).once('value')
        .then(async (snap) => {
          let value = snap.val();
          let result = [];
          for (let taskName in value) {
            let task = {};
            task.taskName = taskName;

            await db.ref(`/${state.userID}/${state.activeList}/${taskName}`).once('value')
              .then((snap) => {
                let value = snap.val();
                for (let attr in value) {
                  task[`${attr}`] = true;
                }
              });
            result.push(task);
          }
          state.tasks = result;
        })
        .catch((err) => {
          console.log(err.message);
        }) 
    },

    openTodo ({dispatch}) {
      dispatch('getLists').then(() => {
        dispatch('getTasks');
      })
    }
  }
})

export default store
