<template>
  <div>
    <input type="text" placeholder="What do you have to do?"
    class="todo-input" v-model="newTodo"
    @keyup.enter="addTodo" />
    <todo-items/>
    <div class="extra-container">
      <todo-check-all/>
      <todo-items-left/>
    </div>
    <div class="extra-container">
      <todo-filters/>
      <todo-clear-completed/>
    </div>
  </div>
</template>

<script>
import TodoCheckAll from './TodoCheckAll'
import TodoClearCompleted from './TodoClearCompleted'
import TodoFilters from './TodoFilters'
import TodoItems from './TodoItems'
import TodoItemsLeft from './TodoItemsLeft'

export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      editCache: '',
      idForTodo: 5
    }
  },
  components: {
    TodoCheckAll,
    TodoClearCompleted,
    TodoFilters,
    TodoItems,
    TodoItemsLeft
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim().length === 0) return
      this.$store.commit('addTodo', {
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })
      this.newTodo = ''
      this.idForTodo++
    }
  }
}
</script>

<style>
  .todo-input{
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.15rem;
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
    border-radius: .25rem;
  }
  .todo-input:focus{
    outline:none;
  }
  .todo-item{
    font-size: 1.15rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .todo-item-left{
    display: flex;
    align-items: center;
  }
  .todo-item-label{
    margin-left: .5rem;
    padding: .7rem;
  }
  .todo-item-label.completed{
    opacity: 0.6;
    text-decoration: line-through;
  }
  .todo-item-input{
    margin-left: .5rem;
    font-size: 1.15rem;
    color: #2c3e59;
    padding: .7rem;
    width: 100%;
    border:1px solid #ccc;
    border-radius: .25rem;
  }
  .todo-item-input:focus{
    outline: none;
  }
  .remove-item{
    cursor: pointer;
    margin-right: .7rem;
  }
  .remove-item:hover{
    color:black;
  }
  input[type="checkbox"]{
    height: 1rem;
    width: 1rem;
    margin-right:.5rem;
  }
  .extra-container{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1rem;
    border-top:1px solid #ccc;
    padding-top:1rem;
    margin-bottom: .8rem;
  }
  button{
    font-size: 1rem;
    color:#2c3e50;
    border: 1px solid #ccc;
    background: transparent;
    appearance:none;
    margin-right: .4rem;
    border-radius: .25rem;
    padding: .2rem .5rem;
    cursor: pointer;
  }
  @media (max-width: 575px) {
    button{
      font-size: .62rem;
    }
  }
  button:focus{
    outline: none;
  }
  button:disabled{
    pointer-events: none;
    opacity: 0.6;
  }
  button.active{
    background: rgba(0,117,255,.15);
  }
</style>
