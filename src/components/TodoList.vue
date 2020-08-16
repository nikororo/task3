<template>
  <div class="todo">
    <div>
      <button class="todoList" v-for="list in this.$store.state.lists" v-bind:key="list.listName">
        {{list.listName}}
        <button class="close">×</button>
      </button>
    </div>
    <div class="addCont">
      <input v-model="newList.name" type = "text" placeholder="Добавить список..." />
      <button @click="createTodoList()"><img src="../assets/plus.png" alt="+"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data: () => ({
    newList: {
      name: ''
    }
  }),
  created() {
    this.$store.dispatch('openTodo');
  }
}
</script>

<style>
.todo {
  position: absolute;
  overflow: auto;
  top: 57px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 250px;
  height: calc(100vh - 77px);
  border-right: 1px solid #535353;
}

.todoList {
  position: relative;
  padding: 10px;
  width: 250px;
  border: 1px solid #53535331;
  background-color: #fff;
  color: #535353;
}

.todoList:hover {
  background-color: #f2f2f2;
}

h2 {
  margin: 5px auto;
  color: #535353;
  text-align: center;
}

.addCont input {
  min-width:  calc(100% - 50px);
  margin: 0 10px;
  border: none;
  padding: 0;
}

.addCont button {
  background-color: inherit;
  border: none;
  border-left: 1px solid #535353;
  height: 30px;
  width: 30px;
  background-color: #e7ffcd;
}

.addCont img {
  height: 20px;
  vertical-align: middle;
}

.addCont {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #535353;
  height: 30px;
}

input:focus {
  outline: none;
}
button:focus {
  outline: none;
}

.close {
  position: absolute;
  top: 0;
  right: 0;
  background-color: inherit;
  border: none;
  height: 20px;
  width: 20px;
}
</style>
