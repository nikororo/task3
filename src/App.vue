<template>
  <div id="app">
		<router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  color: #929292;
  height: 100vh;
  position: relative;
}

button {
  font-family: Arial, Helvetica, sans-serif;
  color: #929292;
  font-size: 16px;
}

input {
  font-family: Arial, Helvetica, sans-serif;
  color: #929292;
}
</style>