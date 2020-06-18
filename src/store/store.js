import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
      { id: 1, title: 'Take a nap', completed: true, editing: false },
      { id: 2, title: 'Walk the dog', completed: false, editing: false },
      { id: 3, title: 'Be cool', completed: true, editing: false },
      { id: 4, title: 'Go out and enjoy my life', completed: false, editing: false }]
  },
  getters: {
    anyCompleted (state) {
      return state.todos.filter(item => item.completed).length > 0
    },
    anyRemaining (state) {
      return state.todos.filter(item => !item.completed).length > 0
    },
    todosRemaining (state) {
      return state.todos.filter(item => !item.completed).length
    },
    todosFiltered (state) {
      if (state.filter === 'all') {
        return state.todos
      } else if (state.filter === 'active') {
        return state.todos.filter(item => !item.completed)
      } else if (state.filter === 'completed') {
        return state.todos.filter(item => item.completed)
      } else {
        return []
      }
    }
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    },
    updateTodo (state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: false
      })
    },
    removeTodo (state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },
    updateFilter (state, filter) {
      state.filter = filter
    },
    checkAll (state, checked) {
      state.todos.forEach((todo) => { todo.completed = checked })
    },
    clearCompleted (state) {
      state.todos = state.todos.filter(item => !item.completed)
    }
  }
})
