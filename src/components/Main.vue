<template>
  <div>
    <Header />
    <TodoList v-if="this.$store.state.user" />
    <TodoItem v-if="this.$store.state.user" />
  </div>
</template>

<script>
import TodoList from './TodoList'
import TodoItem from './TodoItem'
import Header from './Header'

export default {
  name: 'Main',
  components: {
    Header,
    TodoList,
    TodoItem
  },
  mounted() {
    if (localStorage.user) {
      this.$store.commit('getUser');
    }
  },
}
</script>