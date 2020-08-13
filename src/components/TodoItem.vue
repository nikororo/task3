<template>
  <div>
    <div class="todoListItem"> 
      <div class="todoItem" v-for="task in tasks" v-bind:key="task.id">
        <div class="cont">
          <input type="checkbox" v-bind:id="task.id">
          <label v-bind:for="task.id"></label>
          <div class="important" ></div>
          {{task.name}} 
        </div>
        <div class="data"> 
          {{new Date().getDate()+'.'+ (new Date().getMonth()+1)+'.'+ new Date().getFullYear()+' '+new Date().getHours()+':'+new Date().getMinutes()}}
          <button class="close">×</button>
        </div>
      </div>
    </div>
    <div class="container__addTask">
      <div class="addCont">
        <input type="text" placeholder="Добавить задачу..." />
        <button><img src="../assets/plus.png" alt="+"></button>
      </div>
      <div class="cont quick">
        <input type="checkbox" id="quick">
        <label for="quick">Срочное</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  data: () => ({
    tasks: [
      { id: 1, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 2, name: 'Blogging with Vue' },
      { id: 3, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 4, name: 'Blogging with Vue' },
      { id: 5, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 6, name: 'Blogging with Vue' },
      { id: 7, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 8, name: 'Blogging with Vue' },
      { id: 9, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 21, name: 'Blogging with Vue' },
      { id: 11, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 22, name: 'Blogging with Vue' },
      { id: 13, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 14, name: 'Blogging with Vue' },
      { id: 15, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 16, name: 'Blogging with Vue' },
      { id: 17, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue' },
      { id: 18, name: 'Blogging with Vue' },
      { id: 19, name: 'My journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey withMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey withMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with VueMy journey with Vue with VueMy journey with Vue with VueMy journey with Vue with VueMy journey with Vue' },
      { id: 20, name: 'Blogging with Vue' },
    ],
    newTask: {
      name: ''
    }
  })
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
</style>
