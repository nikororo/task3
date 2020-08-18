<template>
  <div>
    <div class="todoListItem"> 
      <div class="todoItem" v-for="task in this.$store.state.tasks" v-bind:key="task.id">
        <div class="cont">
          <input type="checkbox" v-bind:id="task.id" v-bind="{checked: task.done}" v-on:click="makeDone(task.taskName)">
          <label v-bind:for="task.id"></label>
          <div class="important" v-if="task.important"></div>
          <div v-bind:class="{done: task.done}">{{task.taskName}}</div>
        </div>
        <div class="data"> 
          {{task.dataCreated}}
          <button class="delete" v-on:click="deleteTask(task.taskName)">×</button>
        </div>
      </div>
    </div>
    <div class="container__addTask">
      <div class="addCont">
        <input v-model="newTask.name" type="text" placeholder="Добавить задачу..." />
        <button v-on:click="createTask(newTask.name, newTask.important)"><img src="../assets/plus.png" alt="+"></button>
      </div>
      <div class="cont quick">
        <input v-model="newTask.important" type="checkbox" id="quick">
        <label for="quick">Срочное</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  data: () => ({
    newTask: {
      name: '',
      important: ''
    }
  }),

  methods: {
    createTask(newTaskName, important) {
      let dtCreated = new Date().getDate()+'.'+ (new Date().getMonth()+1)+'.'+ new Date().getFullYear()+' '+new Date().getHours()+':'+new Date().getMinutes();
      let payload = {
        newTaskName,
        important,
        dtCreated
      }
      this.$store.dispatch('createTask', payload);
    },

    makeDone(taskDoneName) {
      this.$store.dispatch('makeDone', taskDoneName);
    },

    deleteTask(taskName) {
      if (confirm(`Удалить задачу ${taskName}?`)) {
        this.$store.dispatch('deleteTask', taskName);
      } 
    },
  }
}

</script>

<style scoped>
.todoListItem {
  position: absolute;
  left: 330px;
  bottom: 60px;
  padding: 10px;
  width: calc(100vw - 351px);
  height: calc(100vh - 138px);
  overflow: auto;
  border-left: 1px solid #535353;
  border-bottom: 1px solid #535353;
}

.todoItem {
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #53535331;
}

.addCont {
  width: calc(100vw - 460px);
}

.container__addTask {
  width: calc(100vw - 360px);
  max-width: 800px;
  position: absolute;
  left: 330px;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

label {
  color: #535353;
}

.cont {
  display: flex;
  align-items: center;
}

.cont input {
  position: absolute;
	z-index: -1;
  opacity: 0;
  margin: 0;
  width: 18px;
  height: 18px;
}

.cont input+label {
  display: inline-flex;
  user-select: none;
}

.cont input+label::before {
  margin-right: 10px;
  content: '';
  width: 1em;
  height: 1em;
  border: 1px solid #535353;
  border-radius: 0.25em;
}

.cont input:checked+label::before {
  background-color: #e7ffcd;
}

.quick {
  margin: 0 10px;
}

.data {
  padding-left: 15px;
  min-width: 120px;
  display: flex;
}

.important {
  margin: 0 10px 0 0;
  min-width: 1em;
  min-height: 1em;
  border: 1px solid #535353;
  background-color: lightcoral;
  border-radius: 50%;
}

.done {
  text-decoration: line-through;
  font-style: italic;
}
</style>