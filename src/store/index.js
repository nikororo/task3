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
    tasks: [],
    maxID: ''
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
    },

    newActiveList: (state, newListName) => {
      state.activeList = newListName;
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

    createList: ({state, dispatch}, newListName) => {
      let db = firebase.database();

      db.ref(`/${state.userID}/` + newListName).set({}[`${newListName}`] = '', (err) => 
      {
        if (!err) {
          dispatch('openTodo');
        } else {
          console.log(err.message);
        }
      })
    },

    deleteList: async ({state, dispatch}, listName) => {
      let db = firebase.database();

      await db.ref(`/${state.userID}/` + listName).set(null, async (err) => {
        if (!err) {
          await dispatch('openTodo')
        } else {
          console.log(err.message);
        }
      })
    },

    getTasks: async ({state, commit}, newListName) => {
      let db = firebase.database();
      state.maxID = '';

      if (newListName) {
        commit('newActiveList', newListName)
      }

      await db.ref(`/${state.userID}/${state.activeList}`).on('value', async (snap) => {
          let value = snap.val();
          let result = [];
          for (let taskName in value) {
            let task = {};
            task.taskName = taskName;

            await db.ref(`/${state.userID}/${state.activeList}/${taskName}`).once('value')
              .then((snap) => {
                let value = snap.val();
                for (let attr in value) {
                  task[`${attr}`] = value[attr];
                  if (attr === 'id' && value[attr] > state.maxID) {
                    state.maxID = value[attr];
                  }
                }
              });
            result.push(task);
          }
          state.tasks = result;
        })
    },

    createTask: ({state}, {dtCreated, important, newTaskName}) => {
      let {maxID, activeList, userID} = state;
      let db = firebase.database();

      db.ref(`/${userID}/${activeList}/` + newTaskName).set({}[`${newTaskName}`] = '', (err) => 
      {
        if (!err) {
          if (maxID) {
            maxID = maxID + 1;
          } else {
            maxID = 0;
          }

          if (important) {
            db.ref(`/${userID}/${activeList}/${newTaskName}`).set({'important': true, 'id': maxID, 'dataCreated': dtCreated}, (err) => 
            { if (err) return console.log(err.message); });
          } else {
            db.ref(`/${userID}/${activeList}/${newTaskName}`).set({'id': maxID, 'dataCreated': dtCreated}, (err) => 
            { if (err) return console.log(err.message); });
          }
        } else {
          console.log(err.message);
        }
      })
    },

    makeDone: ({state}, taskDoneName) => {
      const {tasks, activeList, userID} = state;
      let db = firebase.database();

      let taskDone = tasks.filter((task) => task.taskName == taskDoneName)[0]

      if (taskDone.done) {
        taskDone.done = false;
      } else {
        taskDone.done = true;
      }

      db.ref(`/${userID}/${activeList}/` + taskDoneName).set(taskDone, (err) => 
      { if (err) console.log(err.message); });
    },

    deleteTask: async ({state}, taskName) => {
      let db = firebase.database();

      await db.ref(`/${state.userID}/${state.activeList}/` + taskName).set(null, (err) =>
      { if (err) console.log(err.message); });
    },

    openTodo: async ({dispatch}) => {
      await dispatch('getLists').then(() => {
        dispatch('getTasks');
      })
    }
  }
})

export default store
