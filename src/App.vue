<template>
  <div id="app" class="container">
    <logo-container title="Todo List"/>
    <todo-list/>
  </div>
</template>

<script>
import LogoContainer from './components/LogoContainer.vue'
import TodoList from './components/TodoList.vue'
export default {
  name: 'App',
  components: {
    TodoList,
    LogoContainer
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container{
  margin:3% auto;
  max-width: 50vw;
}
@media (max-width: 767px) {
  .container{
    max-width: 65vw;
  }
}
@media (max-width: 575px) {
  .container{
    max-width: 75vw;
  }
}
</style>
