<template>
  <div>{{ todosRemaining | itemsLeft }}</div>
</template>

<script>
export default {
  name: 'TodoItemsLeft',
  filters: {
    itemsLeft (n) {
      return n === 1 ? `${n} item left` : `${n} items left`
    }
  },
  computed: {
    todosRemaining () {
      return this.$store.getters.todosRemaining
    }
  }
}
</script>
