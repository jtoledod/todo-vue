<template>
  <div>
  <div v-for="todo in todosFiltered" :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed">
        <input
        v-if="todo.editing"
        type="text"
        class="todo-item-input"
        v-model="todo.title"
        @blur="doneEdit(todo)"
        @keyup.enter="doneEdit(todo)"
        @keyup.esc="cancelEdit(todo)"
        v-focus/>
        <div v-else
        class="todo-item-label"
        :class="{'completed':todo.completed}"
        @click="editTodo(todo)">{{todo.title}}</div>
      </div>
      <div class="remove-item"
      @click="removeTodo(todo.id)">&times;</div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItems',
  data () {
    return {
      editCache: ''
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
    todosFiltered () {
      return this.$store.getters.todosFiltered
    }
  },
  methods: {
    editTodo (todo) {
      this.editCache = todo.title
      todo.editing = true
    },
    cancelEdit (todo) {
      todo.title = this.editCache
      todo.editing = false
    },
    doneEdit (todo) {
      if (todo.title.trim().length === 0) {
        todo.title = this.editCache
      }
      this.$store.commit('updateTodo', todo)
    },
    removeTodo (id) {
      this.$store.commit('removeTodo', id)
    }
  }
}
</script>
