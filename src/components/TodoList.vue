<template>
  <div>
    <input type="text" placeholder="What do you have to do?"
    class="todo-input" v-model="newTodo"
    @keyup.enter="addTodo" />
    <div v-for="todo in todosFiltered" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed">
        <input
        v-if="todo.editing"
        type="text"
        class="todo-item-input"
        v-model="todo.title"
        @blur="doneEdit(todo)"
        @keyup.esc="cancelEdit(todo)"
        v-focus/>
        <div v-else
        class="todo-item-label"
        :class="{'completed':todo.completed}"
        @dblclick="editTodo(todo)">{{todo.title}}</div>
      </div>
      <div class="remove-item"
      @click="removeTodo(todo)">&times;</div>
    </div>
    <div class="extra-container">
      <div><label><input type="checkbox"
        @input="checkAllTodos" :checked="!anyRemaining">Check all</label></div>
      <div>{{ remaining }} item(s) left</div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{active: filter == 'all'}"
        @click="filter='all'">All</button>
        <button :class="{active: filter == 'active'}"
        :disabled="!anyRemaining"
        @click="filter='active'">Active</button>
        <button :class="{active: filter == 'completed'}"
        :disabled="!anyCompleted"
        @click="filter='completed'">Completed</button>
      </div>
      <div>
        <button v-if="anyCompleted"
        @click="clearCompleted">Clear completed</button>
      </div>
    </div>
  </div>
</template>

<script>
import { todos } from '../Todos'
export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      editCache: '',
      idForTodo: 5,
      filter: 'all',
      todos
    }
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  computed: {
    remaining () {
      return this.todos.filter(item => !item.completed).length
    },
    anyRemaining () {
      return this.remaining !== 0
    },
    todosFiltered () {
      if (this.filter === 'all') {
        return this.todos
      } else if (this.filter === 'active') {
        return this.todos.filter(item => !item.completed)
      } else if (this.filter === 'completed') {
        return this.todos.filter(item => item.completed)
      } else {
        return []
      }
    },
    anyCompleted () {
      return this.todos.filter(item => item.completed).length > 0
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim().length === 0) return
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      })
      this.newTodo = ''
      this.idForTodo++
    },
    editTodo (todo) {
      this.editCache = todo.title
      todo.editing = true
    },
    cancelEdit (todo) {
      todo.title = this.editCache
      todo.editing = false
    },
    doneEdit (todo) {
      if (this.newTodo.trim().length === 0) {
        todo.title = this.editCache
      }
      todo.editing = false
    },
    removeTodo (todo) {
      this.todos = this.todos.filter(item => item.id !== todo.id)
    },
    checkAllTodos () {
      this.todos.forEach((todo) => { todo.completed = event.target.checked })
      if (this.filter === 'active') this.filter = 'all'
    },
    clearCompleted () {
      this.todos = this.todos.filter(item => !item.completed)
      if (this.todos.length === 0) {

      }
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
  button.active{
    background: rgba(0,117,255,.15);
  }
  button:disabled{
    pointer-events: none;
    opacity: 60%;
  }
</style>
